import 'react-native-gesture-handler';
import React from 'react';
import { Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/screens/Main';

const Stack = createStackNavigator();

export default function App() {
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