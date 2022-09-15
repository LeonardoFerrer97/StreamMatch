import 'react-native-gesture-handler';
import React from 'react';
import Tutorial from "./src/screens/Tutorial"
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/screens/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App() {
  const storeData = async (value) => {
    try {
      fetch('https://generaterandomword.herokuapp.com/words/five')
        .then((response) => response.text())
        .then((json) => AsyncStorage.setItem('fiveCharWord', json.toUpperCase()));
      fetch('https://generaterandomword.herokuapp.com/words/six')
        .then((response) => response.text())
        .then((json) => AsyncStorage.setItem('sixCharWord', json.toUpperCase()));
      fetch('https://generaterandomword.herokuapp.com/words/seven')
        .then((response) => response.text())
        .then((json) => AsyncStorage.setItem('sevenCharWord', json.toUpperCase()));
      fetch('https://generaterandomword.herokuapp.com/words/eight')
        .then((response) => response.text())
        .then((json) => AsyncStorage.setItem('eightCharWord', json.toUpperCase()));
    }catch (e) {
      // saving error
    }
  }
  storeData()
  AsyncStorage.getItem('0').then((res) => {
    AsyncStorage.setItem('0', "0")
    AsyncStorage.setItem('1', "0")
    AsyncStorage.setItem('2', "0")
    AsyncStorage.setItem('3', "0")
    AsyncStorage.setItem('4', "0")
    AsyncStorage.setItem('5', "0")
    AsyncStorage.setItem('6', "0")
    AsyncStorage.setItem('7', "0")
    AsyncStorage.setItem('totalGames', "0")
    AsyncStorage.setItem('totalSolved', "0")
    AsyncStorage.setItem('solvedInARow', "0")
    AsyncStorage.setItem('maxSolvedInARow', "0")
  })
  return (
    <NavigationContainer >
      <Drawer.Navigator useLegacyImplementation initialRouteName="Shufflet Cinco Letras">
        <Drawer.Screen name="Shufflet Cinco Letras" component={Main} />
        <Drawer.Screen name="Shufflet seis Letras" component={Main} />
        <Drawer.Screen name="Shufflet Tutorial" component={Tutorial} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}