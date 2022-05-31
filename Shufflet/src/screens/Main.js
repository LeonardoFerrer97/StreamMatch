import React, { useState, useEffect, useRef  } from 'react';
import { StyleSheet, TextInput, View, Text  } from "react-native";

let numberOfLetters = 5;
let numberOfLines = [];
let viewRefs = [];
let lineRef = [];

function configure(){
  for(let a = 0;a < numberOfLetters+1;a++){
    if(a == 0){
      console.log('render');
    }
    numberOfLines.push(a)
    viewRefs.push(React.useRef())
    if(a < numberOfLetters){
      lineRef.push(React.useRef);
    }
  }
}

function validateFormAndGoOn(key,setLineFocus){
  setLineFocus(key+1);
}

export default function Main () {
  const [lineFocus, setLineFocus] = useState({ value: 0 })
  configure();
  return (

      <View style = {[style.container]}>
        <Text style = {[style.title]}> Shufflet </Text>
        {
          numberOfLines.map((a) => (
            getForms(a,lineFocus, setLineFocus)
          ))
        }
      </View>
        
  );
}

function getForms(key,lineFocus, setLineFocus){
  viewRefs.push(React.useRef());
  return(
    <View key={key} style = {[style.form]} ref={viewRefs[key]} onKeyDown={validateFormAndGoOn(key,setLineFocus)}>
      <TextInput key={key + '1'} maxLength={1}  style={[style.input]}
        ref={lineRef[0]}
        onChangeText={(value) => {
          if (value.length === 1) {
            lineRef[1].current.focus();
          }
        }}
        editable={() => isEditable(key,lineFocus)}
        returnKeyType="next"/>
      
      <TextInput key={key + '2'} maxLength={1} style={[style.input]}
        ref={lineRef[1]}
        onChangeText={(value) => {
          if (value.length === 1) {
            lineRef[2].current.focus();
          }
        }}
        editable={() => isEditable(key,lineFocus)}
        returnKeyType="next"/>

      <TextInput key={key + '3'} maxLength={1} style={[style.input]}
        ref={lineRef[2]}
        onChangeText={(value) => {
          if (value.length === 1) {
            lineRef[3].current.focus();
          }
        }}
        editable={() => isEditable(key,lineFocus)}
        returnKeyType="next"/>

      <TextInput key={key + '4'} maxLength={1} style={[style.input]}
        ref={lineRef[3]}
        onChangeText={(value) => {
          if (value.length === 1) {
            lineRef[4].current.focus();
          }
        }}
        editable={() => isEditable(key,lineFocus)}
        returnKeyType="next"/>

      <TextInput key={key + '5'} maxLength={1} style={[style.input]}
        ref={lineRef[4]}
        onChangeText={(value) => {
          if (value.length === 1) {
            lineRef[5].current.focus();
          }
        }}
        editable={() => isEditable(key,lineFocus)}
        returnKeyType="next"/>
    </View>
  )
}
function isEditable(key,lineFocus){
  console.log(key,lineFocus)
  if(lineFocus == key){
    return true;
  }else{
    return false;
  }
}

const style = StyleSheet.create({
  father: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
  },
  container: {
    flexWrap: 'wrap',
    flex : 1,
    flexDirection : 'column',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  title:{
    color:'grey',
    flex:1,
    alignSelf: 'center',
    margin: 'auto',
    fontSize:30
  }, 
  form: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection:'row',
    marginLeft:'7%'
  },
  input: {
    padding:'7%',
    marginRight:5,
    marginLeft:5,
    marginBottom:0,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#228CDB'
  }
})