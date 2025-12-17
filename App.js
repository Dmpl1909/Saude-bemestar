import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import WaterScreen from './src/screens/WaterScreen';
import SleepScreen from './src/screens/SleepScreen';
import ExerciseScreen from './src/screens/ExerciseScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Water" component={WaterScreen} />
        <Stack.Screen name="Sleep" component={SleepScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
