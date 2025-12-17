import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getData, saveData, getTodayDate } from '../utils/storage';

export default function SleepScreen({ navigation }) {
  const [sleepHours, setSleepHours] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const goal = 8; // Meta de 8 horas por noite

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = getTodayDate();
    const data = await getData(today);
    setSleepHours(data.sleep);
    setInputValue(data.sleep.toString());
  };

  const saveSleepData = async (hours) => {
    const today = getTodayDate();
    const data = await getData(today);
    data.sleep = hours;
    await saveData(today, data);
  };

  const updateSleep = () => {
    const hours = parseFloat(inputValue);
    if (isNaN(hours) || hours < 0 || hours > 24) {
      Alert.alert('Valor Inválido', 'Por favor, insira um valor entre 0 e 24 horas.');
      return;
    }

    setSleepHours(hours);
    saveSleepData(hours);

    if (hours >= goal) {
      Alert.alert('Ótimo!', 'Você dormiu o suficiente! 😴');
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
      'Resetar Horas',
      'Deseja resetar as horas de sono para hoje?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetar',
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
    if (sleepHours >= 6) return { text: 'Regular', color: '#E67E22' };
    return { text: 'Insuficiente', color: '#E74C3C' };
  };

  const quality = getSleepQuality();
  const progress = Math.min((sleepHours / goal) * 100, 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Horas de Sono</Text>
        <TouchableOpacity onPress={resetSleep}>
          <Ionicons name="refresh" size={28} color="#9B59B6" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="moon" size={100} color="#9B59B6" />
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
          <Text style={styles.progressText}>
            Meta: {sleepHours.toFixed(1)}/{goal} horas
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Digite as horas:</Text>
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
          💡 Dica: Durma de 7 a 9 horas por noite para uma boa recuperação!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  countText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  labelText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 15,
  },
  qualityBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  qualityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9B59B6',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  updateButton: {
    backgroundColor: '#9B59B6',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 20,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  addButton: {
    backgroundColor: '#9B59B6',
  },
  removeButton: {
    backgroundColor: '#E74C3C',
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
});
