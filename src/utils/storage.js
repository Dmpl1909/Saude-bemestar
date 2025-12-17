import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@saude_bemestar';

export const saveData = async (date, data) => {
  try {
    const key = `${STORAGE_KEY}_${date}`;
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

export const getData = async (date) => {
  try {
    const key = `${STORAGE_KEY}_${date}`;
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : { water: 0, sleep: 0, exercises: [] };
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return { water: 0, sleep: 0, exercises: [] };
  }
};

export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};
