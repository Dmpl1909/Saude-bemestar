import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/HabitCardStyles';

export default function HabitCard({ title, icon, value, unit, onPress, color }) {
  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={40} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>
          {value} {unit}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );
}
