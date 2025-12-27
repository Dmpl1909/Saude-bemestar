import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getData, saveData, getTodayDate } from '../utils/storage';
import ExerciseHeart from '../components/ExerciseHeart';
import styles from '../styles/ExerciseScreenStyles';

const EXERCISES = [
  'Corrida',
  'Caminhada',
  'Ciclismo',
  'Natação',
  'Musculação',
  'Yoga',
  'Pilates',
  'Dança',
  'Futebol',
  'Basquetebol',
  'Ténis',
  'Boxe',
  'Crossfit',
  'HIIT',
  'Alongamentos',
  'Subir escadas',
  'Remo',
  'Spinning',
];

export default function ExerciseScreen({ navigation }) {
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [goal, setGoal] = useState(30);
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState('30');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    const today = getTodayDate();
    const data = await getData(today);
    setExercises(data.exercises || []);
    if (data.exerciseGoal) {
      setGoal(data.exerciseGoal);
      setGoalInputValue(data.exerciseGoal.toString());
    }
  };

  const saveExercises = async (newExercises, newGoal = goal) => {
    const today = getTodayDate();
    const data = await getData(today);
    data.exercises = newExercises;
    data.exerciseGoal = newGoal;
    await saveData(today, data);
  };

  const selectExercise = (exercise) => {
    setExerciseName(exercise);
    setShowDropdown(false);
  };

  const updateGoal = () => {
    const newGoal = parseInt(goalInputValue);
    if (newGoal && newGoal > 0 && newGoal <= 300) {
      setGoal(newGoal);
      saveExercises(exercises, newGoal);
      setShowGoalInput(false);
      Alert.alert('Sucesso', `Meta atualizada para ${newGoal} minutos!`);
    } else {
      Alert.alert('Erro', 'Introduza um número válido entre 1 e 300');
    }
  };

  const addExercise = () => {
    if (!exerciseName.trim()) {
      Alert.alert('Atenção', 'Por favor, introduz o nome do exercício.');
      return;
    }

    const minutes = parseInt(duration);
    if (isNaN(minutes) || minutes <= 0) {
      Alert.alert('Atenção', 'Por favor, introduz uma duração válida em minutos.');
      return;
    }

    const newExercise = {
      id: Date.now().toString(),
      name: exerciseName,
      duration: minutes,
      time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
    };

    const newExercises = [...exercises, newExercise];
    setExercises(newExercises);
    saveExercises(newExercises);

    const totalMinutes = newExercises.reduce((total, ex) => total + ex.duration, 0);
    if (totalMinutes >= goal) {
      Alert.alert('Parabéns!', 'Atingiste a tua meta de exercício! 💪');
    }

    setExerciseName('');
    setDuration('');
  };

  const removeExercise = (id) => {
    Alert.alert('Remover Exercício', 'Desejas remover este exercício?', [
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

  const resetExercises = () => {
    Alert.alert(
      'Reiniciar Exercícios',
      'Desejas reiniciar todos os exercícios para hoje?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: () => {
            setExercises([]);
            saveExercises([]);
          },
        },
      ]
    );
  };

  const getTotalDuration = () => {
    return exercises.reduce((total, ex) => total + ex.duration, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="fitness" size={32} color="#F44336" />
        <Text style={styles.headerTitle}>Exercícios</Text>
        <TouchableOpacity onPress={resetExercises}>
          <Ionicons name="refresh" size={28} color="#F44336" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.heartContainer}>
          <ExerciseHeart width={200} height={200} progress={Math.min(getTotalDuration() / goal, 1)} />
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

          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowDropdown(true)}
          >
            <Text style={[styles.dropdownText, !exerciseName && styles.dropdownPlaceholder]}>
              {exerciseName || 'Seleciona o exercício'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          <Modal
            visible={showDropdown}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowDropdown(false)}
          >
            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowDropdown(false)}
            >
              <View style={styles.dropdownModal}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Seleciona o Exercício</Text>
                  <TouchableOpacity onPress={() => setShowDropdown(false)}>
                    <Ionicons name="close" size={28} color="#666" />
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.dropdownList}>
                  {EXERCISES.map((exercise, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dropdownItem,
                        exerciseName === exercise && styles.dropdownItemSelected
                      ]}
                      onPress={() => selectExercise(exercise)}
                    >
                      <Text style={[
                        styles.dropdownItemText,
                        exerciseName === exercise && styles.dropdownItemTextSelected
                      ]}>
                        {exercise}
                      </Text>
                      {exerciseName === exercise && (
                        <Ionicons name="checkmark" size={24} color="#F44336" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>

          <TextInput
            style={styles.input}
            placeholder="Duração (minutos)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="number-pad"
          />

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min((getTotalDuration() / goal) * 100, 100)}%` }]} />
            </View>
            <TouchableOpacity onPress={() => setShowGoalInput(!showGoalInput)}>
              <Text style={styles.progressText}>
                Meta: {getTotalDuration()}/{goal} minutos
              </Text>
            </TouchableOpacity>
          </View>

          {showGoalInput && (
            <View style={styles.goalInputContainer}>
              <Text style={styles.goalInputLabel}>Nova meta (minutos):</Text>
              <View style={styles.goalInputRow}>
                <TextInput
                  style={styles.goalInput}
                  value={goalInputValue}
                  onChangeText={setGoalInputValue}
                  keyboardType="number-pad"
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
              <Text style={styles.emptyText}>Nenhum exercício registado</Text>
            </View>
          ) : (
            exercises.map((item) => (
              <View key={item.id} style={styles.exerciseItem}>
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
            ))
          )}
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
