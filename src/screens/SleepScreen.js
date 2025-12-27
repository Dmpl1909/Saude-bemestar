import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getData, saveData, getTodayDate } from '../utils/storage';
import MoonPhase from '../components/MoonPhase';
import styles from '../styles/SleepScreenStyles';

export default function SleepScreen({ navigation }) {
  const [sleepHours, setSleepHours] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [goal, setGoal] = useState(8);
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState('8');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = getTodayDate();
    const data = await getData(today);
    setSleepHours(data.sleep);
    setInputValue(data.sleep.toString());
    if (data.sleepGoal) {
      setGoal(data.sleepGoal);
      setGoalInputValue(data.sleepGoal.toString());
    }
  };

  const saveSleepData = async (hours, newGoal = goal) => {
    const today = getTodayDate();
    const data = await getData(today);
    data.sleep = hours;
    data.sleepGoal = newGoal;
    await saveData(today, data);
  };

  const updateGoal = () => {
    const newGoal = parseInt(goalInputValue);
    if (newGoal && newGoal > 0 && newGoal <= 16) {
      setGoal(newGoal);
      saveSleepData(sleepHours, newGoal);
      setShowGoalInput(false);
      Alert.alert('Sucesso', `Meta actualizada para ${newGoal} horas!`);
    } else {
      Alert.alert('Erro', 'Introduza um número válido entre 1 e 16');
    }
  };

  const updateSleep = () => {
    const hours = parseFloat(inputValue);
    if (isNaN(hours) || hours < 0 || hours > 24) {
      Alert.alert('Valor Inválido', 'Por favor, introduz um valor entre 0 e 24 horas.');
      return;
    }

    setSleepHours(hours);
    saveSleepData(hours);

    if (hours >= goal) {
      Alert.alert('Ótimo!', 'Dormiste o suficiente! 😴');
    }
  };

  const addHour = () => {
    const newHours = Math.min(sleepHours + 0.5, 24);
    setSleepHours(newHours);
    setInputValue(newHours.toString());
    saveSleepData(newHours);
  };

  const removeHour = () => {
    const newHours = Math.max(sleepHours - 0.5, 0);
    setSleepHours(newHours);
    setInputValue(newHours.toString());
    saveSleepData(newHours);
  };

  const resetSleep = () => {
    Alert.alert(
      'Reiniciar Horas',
      'Desejas reiniciar as horas de sono para hoje?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: () => {
            setSleepHours(0);
            setInputValue('0');
            saveSleepData(0);
          },
        },
      ]
    );
  };

  const getSleepQuality = () => {
    if (sleepHours >= 8) return { text: 'Excelente', color: '#27AE60' };
    if (sleepHours >= 7) return { text: 'Bom', color: '#F39C12' };
    if (sleepHours >= 6) return { text: 'Razoável', color: '#E67E22' };
    return { text: 'Insuficiente', color: '#E74C3C' };
  };

  const quality = getSleepQuality();
  const progress = Math.min((sleepHours / goal) * 100, 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="moon" size={32} color="#9C27B0" />
        <Text style={styles.headerTitle}>Sono</Text>
        <TouchableOpacity onPress={resetSleep}>
          <Ionicons name="refresh" size={28} color="#9C27B0" />
        </TouchableOpacity>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.iconContainer}>
          <MoonPhase width={200} height={200} progress={sleepHours / goal} />
        </View>

        <Text style={styles.countText}>{sleepHours.toFixed(1)}</Text>
        <Text style={styles.labelText}>horas de sono</Text>

        <View style={[styles.qualityBadge, { backgroundColor: quality.color }]}>
          <Text style={styles.qualityText}>{quality.text}</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <TouchableOpacity onPress={() => setShowGoalInput(!showGoalInput)}>
            <Text style={styles.progressText}>
              Meta: {sleepHours.toFixed(1)}/{goal} horas
            </Text>
          </TouchableOpacity>
        </View>

        {showGoalInput && (
          <View style={styles.goalInputContainer}>
            <Text style={styles.goalInputLabel}>Nova meta (horas):</Text>
            <View style={styles.goalInputRow}>
              <TextInput
                style={styles.goalInput}
                value={goalInputValue}
                onChangeText={setGoalInputValue}
                keyboardType="number-pad"
                autoFocus={true}
                selectTextOnFocus={true}
              />
              <TouchableOpacity style={styles.goalUpdateButton} onPress={updateGoal}>
                <Text style={styles.goalUpdateButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.goalCancelButton} 
                onPress={() => setShowGoalInput(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Introduz as horas:</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="decimal-pad"
              placeholder="0.0"
            />
            <TouchableOpacity style={styles.updateButton} onPress={updateSleep}>
              <Text style={styles.updateButtonText}>Atualizar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.removeButton]}
            onPress={removeHour}
          >
            <Ionicons name="remove" size={40} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.addButton]} onPress={addHour}>
            <Ionicons name="add" size={40} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.tipText}>
          💡 Dica: Dorme de 7 a 9 horas por noite para te manteres saudável!
        </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
