import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá! </Text>
            <Text style={styles.subtitle}>Como está sua saúde hoje?</Text>
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
              <Text style={styles.statValue}>{data.water} / 8 copos</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(data.water / 8) * 100}%`, backgroundColor: '#2196F3' }]} />
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
              <Text style={styles.statValue}>{data.sleep} / 8 horas</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(data.sleep / 8) * 100}%`, backgroundColor: '#9C27B0' }]} />
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
              <Text style={styles.statValue}>{data.exercises.length} atividades</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min((data.exercises.length / 3) * 100, 100)}%`, backgroundColor: '#F44336' }]} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 10,
    flex: 1,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  statCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  statInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
