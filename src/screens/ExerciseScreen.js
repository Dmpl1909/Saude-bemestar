import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getData, saveData, getTodayDate } from '../utils/storage';
import ExerciseHeart from '../components/ExerciseHeart';
import styles from '../styles/ExerciseScreenStyles';
 

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
    Alert.alert('Sucesso!', 'Exercício adicionado com sucesso! 💪');
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
