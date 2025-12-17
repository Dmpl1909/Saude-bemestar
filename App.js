import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import WaterScreen from './src/screens/WaterScreen';
import SleepScreen from './src/screens/SleepScreen';
import ExerciseScreen from './src/screens/ExerciseScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Água') {
              iconName = focused ? 'water' : 'water-outline';
            } else if (route.name === 'Sono') {
              iconName = focused ? 'moon' : 'moon-outline';
            } else if (route.name === 'Exercício') {
              iconName = focused ? 'fitness' : 'fitness-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: '#9E9E9E',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Água" component={WaterScreen} />
        <Tab.Screen name="Sono" component={SleepScreen} />
        <Tab.Screen name="Exercício" component={ExerciseScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
