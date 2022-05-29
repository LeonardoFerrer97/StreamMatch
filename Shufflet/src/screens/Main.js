import React from 'react';
import { StyleSheet, TextInput, View  } from "react-native";

export default function Main () {
  let numberOfLines =  [1,2,3,4,5];
  return (
    <View style = {[style.container]}>
      {
        numberOfLines.map((a) => (
          getForms(a)
        ))
      }
    </View>
  );
}

function handleSubmit(){
  console.log(submit)
}

function getForms(key){
  return(
    <View key={key} style = {[style.form]}>

      <TextInput key={key + '1'} maxLength={1}  style={[style.input]}/>
      
      <TextInput key={key + '2'} maxLength={1} style={[style.input]}/>

      <TextInput key={key + '3'} maxLength={1} style={[style.input]} />

      <TextInput key={key + '4'} maxLength={1} style={[style.input]}  />

      <TextInput key={key + '5'} maxLength={1} style={[style.input]} />

    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex : 1,
    flexDirection : 'column'
  },
  form: {
    flex: 1,
    flexDirection:'row'
  },
  input: {
    padding:10,
    marginRight:5,
    marginLeft:5,
    borderWidth: '1px',
    borderColor: 'gray',
    borderRadius: '10%',
  },
  button: {
    backgroundColor: '#228CDB'
  }
})