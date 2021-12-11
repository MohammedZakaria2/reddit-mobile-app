import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`${key}`, jsonValue);
  } catch (e) {
    console.log('e:', e);
  }
};

export const getStorageData = async key => {
  try {
    let final = [];
    const jsonValue = await AsyncStorage.getItem(`${key}`);
    if (JSON.parse(jsonValue)) {
      final = JSON.parse(jsonValue);
    }
    return final;
  } catch (e) {
    console.log('e:', e);
    // error reading value
  }
};
