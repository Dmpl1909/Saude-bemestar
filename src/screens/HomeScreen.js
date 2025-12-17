import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HabitCard from '../components/HabitCard';
import { getData, getTodayDate } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState({ water: 0, sleep: 0, exercises: [] });
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = getTodayDate();
    setCurrentDate(formatDate(today));
    const savedData = await getData(today);
    setData(savedData);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="fitness" size={32} color="#4A90E2" />
        <Text style={styles.headerTitle}>Saúde e Bem-Estar</Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>

      <ScrollView style={styles.content}>
        <HabitCard
          title="Consumo de Água"
          icon="water"
          value={data.water}
          unit="copos"
          color="#4A90E2"
          onPress={() => navigation.navigate('Water')}
        />

        <HabitCard
          title="Horas de Sono"
          icon="moon"
          value={data.sleep}
          unit="horas"
          color="#9B59B6"
          onPress={() => navigation.navigate('Sleep')}
        />

        <HabitCard
          title="Exercícios Físicos"
          icon="barbell"
          value={data.exercises.length}
          unit="atividades"
          color="#E74C3C"
          onPress={() => navigation.navigate('Exercise')}
        />
      </ScrollView>
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
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  dateContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 15,
  },
});
