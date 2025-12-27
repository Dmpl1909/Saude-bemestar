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
import WaterGlass from '../components/WaterGlass';
import styles from '../styles/WaterScreenStyles';
 

export default function WaterScreen({ navigation }) {
  const [waterCount, setWaterCount] = useState(0);
  const [goal, setGoal] = useState(8);
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState('8');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = getTodayDate();
    const data = await getData(today);
    setWaterCount(data.water);
    if (data.waterGoal) {
      setGoal(data.waterGoal);
      setGoalInputValue(data.waterGoal.toString());
    }
  };

  const saveWaterData = async (newCount, newGoal = goal) => {
    const today = getTodayDate();
    const data = await getData(today);
    data.water = newCount;
    data.waterGoal = newGoal;
    await saveData(today, data);
  };

  const updateGoal = () => {
    const newGoal = parseInt(goalInputValue);
    if (newGoal && newGoal > 0 && newGoal <= 20) {
      setGoal(newGoal);
      saveWaterData(waterCount, newGoal);
      setShowGoalInput(false);
      Alert.alert('Sucesso', `Meta atualizada para ${newGoal} copos!`);
    } else {
      Alert.alert('Erro', 'Introduza um número válido entre 1 e 20');
    }
  };

  const addWater = () => {
    const newCount = waterCount + 1;
    setWaterCount(newCount);
    saveWaterData(newCount);
    
    if (newCount === goal) {
      Alert.alert('Parabéns!', 'Atingiste a tua meta diária de água! 🎉');
    }
  };

  const removeWater = () => {
    if (waterCount > 0) {
      const newCount = waterCount - 1;
      setWaterCount(newCount);
      saveWaterData(newCount);
    }
  };

  const resetWater = () => {
    Alert.alert(
      'Reiniciar Contador',
      'Desejas reiniciar o contador de água para hoje?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: () => {
            setWaterCount(0);
            saveWaterData(0);
          },
        },
      ]
    );
  };

  const progress = Math.min((waterCount / goal) * 100, 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="water" size={32} color="#2196F3" />
        <Text style={styles.headerTitle}>Água</Text>
        <TouchableOpacity onPress={resetWater}>
          <Ionicons name="refresh" size={28} color="#2196F3" />
        </TouchableOpacity>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.glassContainer}>
          <WaterGlass width={200} height={280} progress={waterCount / goal} />
        </View>

        <Text style={styles.countText}>{waterCount}</Text>
        <Text style={styles.labelText}>copos de água</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <TouchableOpacity onPress={() => setShowGoalInput(!showGoalInput)}>
            <Text style={styles.progressText}>
              Meta: {waterCount}/{goal} copos 
            </Text>
          </TouchableOpacity>
        </View>

        {showGoalInput && (
          <View style={styles.goalInputContainer}>
            <Text style={styles.goalInputLabel}>Nova meta (copos):</Text>
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.removeButton]}
            onPress={removeWater}
          >
            <Ionicons name="remove" size={40} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.addButton]} onPress={addWater}>
            <Ionicons name="add" size={40} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.tipText}>
          Dica: Bebe pelo menos 8 copos de água por dia para te manteres hidratado!
        </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
