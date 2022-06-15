import 'react-native-gesture-handler';
import React from 'react';
import { Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/screens/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system'

const Stack = createStackNavigator();

export default function App() {
  const storeData = async (value) => {
    try {
      AsyncStorage.setItem('fiveCharWord', 'carol');
      await AsyncStorage.getItem('fiveCharWordx').then(res => {
        if(res != undefined){
          FileSystem.readAsStringAsync("/assets/palavras5.txt") // 'base64' for binary 
            .then(res => {
              AsyncStorage.setItem('fiveCharWord',res[Math.floor(Math.random() * res.length)]);
            })
            .catch(console.error)
          AsyncStorage.setItem('sixChars', 'value');
          AsyncStorage.setItem('sevenChars', 'value');
          AsyncStorage.setItem('eightChars', 'value');
        }
      })
    }catch (e) {
      // saving error
    }
  }
  storeData()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#228CDB'},headerTintColor: '#fff'}} initialRouteName="Main">
      <Stack.Screen 
          name="Main" 
          component={Main}  
          options={({navigation}) => ({
            headerRight: () => (
              <Icon 
                name="plus" 
                type="feather" 
                color="#fff"
                style={style.headerIcon}
                onPress={() => navigation.navigate('Main')}
              />
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const style = StyleSheet.create({
  headerIcon: {
    marginRight: 10
  }
});