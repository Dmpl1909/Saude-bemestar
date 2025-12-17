import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
      Alert.alert('Erro', 'Digite um número válido entre 1 e 20');
    }
  };

  const addWater = () => {
    const newCount = waterCount + 1;
    setWaterCount(newCount);
    saveWaterData(newCount);
    
    if (newCount === goal) {
      Alert.alert('Parabéns!', 'Você atingiu sua meta diária de água! 🎉');
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
      'Resetar Contador',
      'Deseja resetar o contador de água para hoje?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetar',
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
                placeholder="8"
              />
              <TouchableOpacity style={styles.goalUpdateButton} onPress={updateGoal}>
                <Text style={styles.goalUpdateButtonText}>Salvar</Text>
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
          Dica: Beba pelo menos 8 copos de água por dia para manter-se hidratado!
        </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
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
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  glassContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
  countText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  labelText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 30,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 40,
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
    backgroundColor: '#4A90E2',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  goalInputContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  goalInputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontWeight: '600',
  },
  goalInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  goalInput: {
    flex: 1,
    height: 45,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F5F9FF',
  },
  goalUpdateButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  goalUpdateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalCancelButton: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 30,
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
    backgroundColor: '#4A90E2',
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
