import AsyncStorage from "@react-native-community/async-storage";

export default class StorageService {
  //setters
  static setValue = async (key, val) => {
    await AsyncStorage.setItem(key, val);
  };

  //getters
  static getValue = async key => {
    const val = await AsyncStorage.getItem(key);
    return val;
  };

  //remove
  static removeValue = async key => {
    await AsyncStorage.removeItem(key);
  };
}
