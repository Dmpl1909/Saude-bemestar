import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getData, saveData, getTodayDate } from '../utils/storage';
import ExerciseHeart from '../components/ExerciseHeart';
 

export default function ExerciseScreen({ navigation }) {
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = getTodayDate();
    const data = await getData(today);
    setExercises(data.exercises || []);
  };

  const saveExercises = async (newExercises) => {
    const today = getTodayDate();
    const data = await getData(today);
    data.exercises = newExercises;
    await saveData(today, data);
  };

  const addExercise = () => {
    if (!exerciseName.trim()) {
      Alert.alert('Atenção', 'Por favor, digite o nome do exercício.');
      return;
    }

    const minutes = parseInt(duration);
    if (isNaN(minutes) || minutes <= 0) {
      Alert.alert('Atenção', 'Por favor, digite uma duração válida em minutos.');
      return;
    }

    const newExercise = {
      id: Date.now().toString(),
      name: exerciseName,
      duration: minutes,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    const newExercises = [...exercises, newExercise];
    setExercises(newExercises);
    saveExercises(newExercises);

    setExerciseName('');
    setDuration('');
    Alert.alert('Sucesso!', 'Exercício adicionado com sucesso!');
  };

  const removeExercise = (id) => {
    Alert.alert('Remover Exercício', 'Deseja remover este exercício?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          const newExercises = exercises.filter((ex) => ex.id !== id);
          setExercises(newExercises);
          saveExercises(newExercises);
        },
      },
    ]);
  };

  const getTotalDuration = () => {
    return exercises.reduce((total, ex) => total + ex.duration, 0);
  };

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseItem}>
      <View style={styles.exerciseIcon}>
        <Ionicons name="barbell" size={30} color="#E74C3C" />
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseDetails}>
          {item.duration} min • {item.time}
        </Text>
      </View>
      <TouchableOpacity onPress={() => removeExercise(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#E74C3C" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="fitness" size={32} color="#F44336" />
        <Text style={styles.headerTitle}>Exercícios</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.heartContainer}>
          <ExerciseHeart width={200} height={200} progress={Math.min(exercises.length / 5, 1)} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{exercises.length}</Text>
            <Text style={styles.statLabel}>Exercícios</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{getTotalDuration()}</Text>
            <Text style={styles.statLabel}>Minutos</Text>
          </View>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputTitle}>Adicionar Exercício</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do exercício (ex: Corrida)"
            value={exerciseName}
            onChangeText={setExerciseName}
          />

          <TextInput
            style={styles.input}
            placeholder="Duração (minutos)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="number-pad"
          />

          <TouchableOpacity style={styles.addButton} onPress={addExercise}>
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Hoje</Text>
          {exercises.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="barbell-outline" size={60} color="#CCC" />
              <Text style={styles.emptyText}>Nenhum exercício registrado ainda</Text>
            </View>
          ) : (
            <FlatList
              data={exercises}
              renderItem={renderExercise}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
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
    padding: 15,
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 120,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F44336',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryInfo: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseIcon: {
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});
