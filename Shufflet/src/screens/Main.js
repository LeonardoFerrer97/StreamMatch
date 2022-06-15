import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


let numberOfLetters = 5;

const Main = ()  => {
  const [lineFocus, setLineFocus] = useState(['auto','none','none','none','none','none'])
  const [word, setWord] = useState('')
  const [coutingChars, setCoutingChars] = useState({})
  const [viewRefs, setViewRefs] = useState([])
  const [lineRef, setLineRef] = useState([[]])
  const [numberOfLines, setNumberOfLines] = useState([])
  numberOfLetters = 5;
  useEffect(() => {
    configure();
    AsyncStorage.getItem('fiveCharWord').then((res) => {
      setWord(res)
      let newCoutingChars = {}
      for(let char in res){
        newCoutingChars[res[char]] = (newCoutingChars[res[char]] || 0) + 1;
      }
      setCoutingChars(newCoutingChars)
    })
  }, []);
  const handleSubmitEditing = (key) => {
    if(key < 5){
      var isSolved = true;
      var containingChars = [];
      let coutingCharsAux = coutingChars
      for(let a = 0;a<viewRefs[key].current.children.length;a++){
        var char = lineRef[key][a].current.value
        if(char == ''){
          console.log('incompleto')
          lineRef[key][0].current.focus();
          return;
        }
      }
      for(let a = 0;a<viewRefs[key].current.children.length;a++){
        var char = lineRef[key][a].current.value
        if(char == word[a]){
          lineRef[key][a].current.setNativeProps({
            style:{backgroundColor: '#3fba29'}
          });
          if(coutingCharsAux[char] > 0){ 
            coutingCharsAux[char]--;
          }
        }else if(word.indexOf(char) >= 0){
          isSolved = false;
          var containChar = {char:char,a:a};
          containingChars.push(containChar)
        }else{
          isSolved = false;
        }
      }
      if(isSolved){
        setLineFocus(['none','none','none','none','none','none'])
        return
      }
      for(let b in containingChars){
        console.log(b.char)
        if(coutingCharsAux[containingChars[b].char] > 0){
          lineRef[key][containingChars[b].a].current.setNativeProps({
            style:{backgroundColor: '#fff700'}
          });
          coutingCharsAux[containingChars[b].char]--
        }
      }
      const newLineFocus = (['none','none','none','none','none','none']);
      newLineFocus[key+1] = 'auto'
      setLineFocus(newLineFocus)
      lineRef[key+1][0].current.focus();
    }
  }
  const configure = () => {
    for(let a = 0;a < numberOfLetters+1;a++){
      setNumberOfLines(lines => [...lines,a])
      setViewRefs(refs => [...refs,React.createRef()])
      viewRefs.push(React.createRef())
      for(let b = 0; b<numberOfLetters ; b++){
        if(b == 0){
          lineRef[a] = []
        }
        setLineRef(refs => {
          const newRefs = refs;
          newRefs[a].push(React.createRef())
          return { ...newRefs }
        })
      }
    }
  }
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
                  returnKeyType="next"
                  onSubmitEditing={() => handleSubmitEditing(key)}/>
                <TextInput  tabIndex={key + '2'} key={key + '2'} maxLength={1} style={[style.input]}
                  ref={lineRef[key][1]}
                  onChangeText={(value) => {
                    if (value.length === 1) {
                      lineRef[key][2].current.focus();
                    }
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => handleSubmitEditing(key)}/>
        
                <TextInput  tabIndex={key + '3'} key={key + '3'} maxLength={1} style={[style.input]}
                  ref={lineRef[key][2]}
                  onChangeText={(value) => {
                    if (value.length === 1) {
                      lineRef[key][3].current.focus();
                    }
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => handleSubmitEditing(key)}/>
        
                <TextInput  tabIndex={key + '4'} key={key + '4'} maxLength={1} style={[style.input]}
                  ref={lineRef[key][3]}
                  onChangeText={(value) => {
                    if (value.length === 1) {
                      lineRef[key][4].current.focus();
                    }
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => handleSubmitEditing(key)}/>
        
                <TextInput  tabIndex={key + '5'} key={key + '5'} maxLength={1} style={[style.input]}
                  ref={lineRef[key][4]}
                  returnKeyType="next"
                  onSubmitEditing={() => handleSubmitEditing(key)}/>
            </View>
          ))
        }
      </View>
        
  );
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