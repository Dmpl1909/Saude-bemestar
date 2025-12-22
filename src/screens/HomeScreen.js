import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getData, getTodayDate } from '../utils/storage';
import styles from '../styles/HomeScreenStyles';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState({ water: 0, sleep: 0, exercises: [] });
  const [currentDate, setCurrentDate] = useState('');
  const [waterGoal, setWaterGoal] = useState(8);
  const [sleepGoal, setSleepGoal] = useState(8);
  const [exerciseGoal, setExerciseGoal] = useState(30);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = getTodayDate();
    setCurrentDate(formatDate(today));
    const savedData = await getData(today);
    setData(savedData);
    setWaterGoal(savedData.waterGoal || 8);
    setSleepGoal(savedData.sleepGoal || 8);
    setExerciseGoal(savedData.exerciseGoal || 30);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-PT', options);
  };

  const getTotalExerciseMinutes = () => {
    return data.exercises.reduce((total, ex) => total + ex.duration, 0);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá! 👋</Text>
            <Text style={styles.subtitle}>Como está a tua saúde hoje?</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="fitness" size={40} color="#2196F3" />
          </View>
        </View>

        <View style={styles.dateCard}>
          <Ionicons name="calendar" size={20} color="#2196F3" />
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Resumo Diário</Text>
          
          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}
            onPress={() => navigation.navigate('Água')}
          >
            <View style={styles.statIcon}>
              <Ionicons name="water" size={32} color="#2196F3" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Água</Text>
              <Text style={styles.statValue}>{data.water} / {waterGoal} copos</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min((data.water / waterGoal) * 100, 100)}%`, backgroundColor: '#2196F3' }]} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: '#F3E5F5' }]}
            onPress={() => navigation.navigate('Sono')}
          >
            <View style={styles.statIcon}>
              <Ionicons name="moon" size={32} color="#9C27B0" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Sono</Text>
              <Text style={styles.statValue}>{data.sleep} / {sleepGoal} horas</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min((data.sleep / sleepGoal) * 100, 100)}%`, backgroundColor: '#9C27B0' }]} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: '#FFEBEE' }]}
            onPress={() => navigation.navigate('Exercício')}
          >
            <View style={styles.statIcon}>
              <Ionicons name="fitness" size={32} color="#F44336" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Exercícios</Text>
              <Text style={styles.statValue}>{getTotalExerciseMinutes()} / {exerciseGoal} minutos</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min((getTotalExerciseMinutes() / exerciseGoal) * 100, 100)}%`, backgroundColor: '#F44336' }]} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
