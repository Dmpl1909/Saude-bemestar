import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { gradients, shadow } from '../theme';
import styles from '../styles/PrimaryButtonStyles';

export default function PrimaryButton({ title, onPress, icon, gradientColors = gradients.royal, style, textStyle }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
      <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.button, shadow.soft]}>
        {icon ? <Ionicons name={icon} size={20} color="#fff" style={{ marginRight: 10 }} /> : null}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
