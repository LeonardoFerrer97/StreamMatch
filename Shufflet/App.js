import 'react-native-gesture-handler';
import React from 'react';
import { Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/screens/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuHeader from './src/screens/MenuHeader'
const Stack = createStackNavigator();

  

   
export default function App() {
  const storeData = async (value) => {
    try {
      fetch('https://generaterandomword.herokuapp.com/words/five')
        .then((response) => response.text())
        .then((json) => AsyncStorage.setItem('fiveCharWord', json));
      fetch('https://generaterandomword.herokuapp.com/words/six')
        .then((response) => response.text())
        .then((json) => AsyncStorage.setItem('sixCharWord', json));
      fetch('https://generaterandomword.herokuapp.com/words/seven')
        .then((response) => response.text())
        .then((json) => AsyncStorage.setItem('sevenCharWord', json));
      fetch('https://generaterandomword.herokuapp.com/words/eight')
        .then((response) => response.text())
        .then((json) => AsyncStorage.setItem('eightCharWord', json));
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
    <NavigationContainer>
      <View>
        <MenuHeader></MenuHeader>
      </View>
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
    </NavigationContainer>
  );
}
const style = StyleSheet.create({
  headerIcon: {
    marginRight: 10
  }
});