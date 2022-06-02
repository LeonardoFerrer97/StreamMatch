import React, { useState, useEffect, createRef  } from 'react';
import { StyleSheet, TextInput, View, Text  } from "react-native";


let numberOfLetters = 5;
let numberOfLines = [];
let viewRefs = [];
let lineRef = [[]];

const Main = ()  => {
  const [lineFocus, setLineFocus] = useState(['auto','none','none','none','none','none','none'])
  numberOfLetters = 5;
  numberOfLines = [];
  viewRefs = [];
  lineRef = [[]];
  useEffect(() => {
      console.log(lineFocus);
  }, []);
  const handleSubmitEditing = (key) => {
    setLineFocus(['none','auto','none','none','none','none','none'])
    lineRef[key+1][0].current.focus();
  }
  configure();
  return (
      <View style = {[style.container]}>
        <Text style = {[style.title]}> Shufflet </Text>
        {
          numberOfLines.map((key) => (
            <View tabIndex={key} key={key} 
              pointerEvents={lineFocus[key]}
              style = {[style.form]} 
              ref={viewRefs[key] }
              onSubmitEditing={() => handleSubmitEditing(key)}>
                <TextInput tabIndex={key + '1'} key={key + '1'} maxLength={1}  style={[style.input]}
                  ref={lineRef[key][0]}
                  onChangeText={(value) => {
                    if (value.length === 1) {
                      lineRef[key][1].current.focus();
                    }
                  }}
                  returnKeyType="next"/>
                <TextInput  tabIndex={key + '2'} key={key + '2'} maxLength={1} style={[style.input]}
                  ref={lineRef[key][1]}
                  onChangeText={(value) => {
                    if (value.length === 1) {
                      lineRef[key][2].current.focus();
                    }
                  }}
                  returnKeyType="next"/>
        
                <TextInput  tabIndex={key + '3'} key={key + '3'} maxLength={1} style={[style.input]}
                  ref={lineRef[key][2]}
                  onChangeText={(value) => {
                    if (value.length === 1) {
                      lineRef[key][3].current.focus();
                    }
                  }}
                  returnKeyType="next"/>
        
                <TextInput  tabIndex={key + '4'} key={key + '4'} maxLength={1} style={[style.input]}
                  ref={lineRef[key][3]}
                  onChangeText={(value) => {
                    if (value.length === 1) {
                      lineRef[key][4].current.focus();
                    }
                  }}
                  returnKeyType="next"/>
        
                <TextInput  tabIndex={key + '5'} key={key + '5'} maxLength={1} style={[style.input]}
                  ref={lineRef[key][4]}
                  returnKeyType="next"/>
            </View>
          ))
        }
      </View>
        
  );
}

function configure(){
  for(let a = 0;a < numberOfLetters+1;a++){
    numberOfLines.push(a)
    viewRefs.push(React.createRef())
    for(let b = 0; b<numberOfLetters ; b++){
      if(b == 0){
        lineRef[a] = []
      }
      lineRef[a].push(React.createRef());
    }
  }
  console.log(numberOfLines)
}


export default Main;

const style = StyleSheet.create({
  container: {
    flex : 1,
    flexDirection : 'column',
  },
  title:{
    color:'grey',
    flex:1,
    alignSelf: 'center',
    margin: 'auto',
    fontSize:30
  }, 
  form: {
    flex: 1,
    flexDirection:'row'
  },
  input: {
    padding:'7%',
    marginRight:5,
    marginLeft:5,
    marginBottom:0,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    flex:1
  },
  button: {
    backgroundColor: '#228CDB'
  }
})