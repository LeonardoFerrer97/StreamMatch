import React from 'react';
import { StyleSheet, TextInput, View  } from "react-native";

export default function Main () {

  return (
    <View style = {[style.container]}>
      <View style = {[style.form]}>
        <TextInput maxLength={1}  style={[style.input]}/>
        
        <TextInput maxLength={1} style={[style.input]}/>

        <TextInput maxLength={1} style={[style.input]} />

        <TextInput maxLength={1} style={[style.input]}  />

        <TextInput maxLength={1} style={[style.input]} />
      </View>
    </View>
  );
}

function handleSubmit(){
  console.log(submit)
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
    margin:10,
    borderWidth: '1px',
    borderColor: 'gray',
    borderRadius: '10%',
    width: 50,
    height: 50,
  },
  button: {
    backgroundColor: '#228CDB'
  }
})