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