import 'react-native-gesture-handler';
import React from 'react';
import { Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/screens/Main';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNFS from 'react-native-fs';
const Stack = createStackNavigator();

export default function App() {
  AsyncStorage.getItem('fiveChars').then(res => {
    console.log(res)
    if(res != undefined){

      RNFS.readFileAssets("../assets/palavras5.txt") // 'base64' for binary 
        .then(res => {
          console.log(res)
          AsyncStorage.setItem('fiveChars', res);
        })
        .catch(console.error)
      AsyncStorage.setItem('fiveChars', 'value');
      AsyncStorage.setItem('sixChars', 'value');
      AsyncStorage.setItem('sevenChars', 'value');
      AsyncStorage.setItem('eightChars', 'value');
    }
  });
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