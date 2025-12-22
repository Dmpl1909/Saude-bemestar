import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { gradients } from '../theme';
import styles from '../styles/GradientHeaderStyles';

export default function GradientHeader({ title, onBack, rightIcon, onRightPress, subtitle }) {
  return (
    <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Voltar">
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}

        <View style={styles.titleBox}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Ação do cabeçalho">
            <Ionicons name={rightIcon} size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>
    </LinearGradient>
  );
}
