import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalHistory from './ModalHistory';

let numberOfLetters = 5;

const Main = ()  => {     
  const [lineFocus, setLineFocus] = useState(['auto','none','none','none','none','none'])
  const [word, setWord] = useState('')
  const [isModalHistoryOpen, setIsModalHistoryOpen] = useState(false)
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
  const handleSubmitEditing = async (key) => {
    console.log(key)
    
      var wordExist = "";
      for(let a = 0;a<viewRefs[key].current.children.length;a++){
        wordExist += lineRef[key][a].current.value
      }
      var exists = true;
       await fetch('https://generaterandomword.herokuapp.com/words/exists/' + wordExist )
        .then((response) => response.text())
        .then((json) => {
          if(json == "false"){
            console.log("doesnt exist")
            exists = false;
          }
        });
      if(!exists){
        for(let a = 0;a<viewRefs[key].current.children.length;a++){
          lineRef[key][a].current.clear()
        }
        lineRef[key][0].current.focus()
        return;
      }
      var isSolved = true;
      var containingChars = [];
      let coutingCharsAux = {};
      Object.assign(coutingCharsAux,coutingChars)
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
        AsyncStorage.getItem(key).then((res) => {
          AsyncStorage.setItem(key.toString(), (parseInt(parseInt(res) + 1)).toString())
          AsyncStorage.getItem("totalSolved").then((res) => {
            AsyncStorage.setItem("totalSolved", (parseInt(res)+ 1 ).toString())
            AsyncStorage.getItem("solvedInARow").then((res) => {
              AsyncStorage.setItem("solvedInARow", (parseInt(res)+ 1 ).toString())
              AsyncStorage.getItem("MaxSolvedInARow").then((max) => {
                if(parseInt(res) > parseInt(max)){
                  AsyncStorage.setItem("solvedInARow",  (parseInt(res)+ 1 ).toString())
                }
                setIsModalHistoryOpen(true)
              })
            })
          })
        })
        setLineFocus(['none','none','none','none','none','none'])
        return
      }
      for(let b in containingChars){
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
  if(!isModalHistoryOpen){
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
                            if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))){
                              lineRef[key][0].current.clear();
                              console.log("nao pode char especial")
                            }else{
                              lineRef[key][1].current.focus();
                            }
                          }
                        }}
                        onKeyPress={({ nativeEvent }) => {
                          if (nativeEvent.key === 'Backspace') {
                          }
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => handleSubmitEditing(key)}/>
                      <TextInput  tabIndex={key + '2'} key={key + '2'} maxLength={1} style={[style.input]}
                        ref={lineRef[key][1]}
                        onChangeText={(value) => {
                          if (value.length === 1) {
                            if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))){
                              lineRef[key][1].current.clear();
                              console.log("nao pode char especial")
                            }else{
                              lineRef[key][2].current.focus();
                            }
                          }
                        }}
                        onKeyPress={({ nativeEvent }) => {
                          if (nativeEvent.key === 'Backspace') {
                            lineRef[key][0].current.focus();
                          }
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => handleSubmitEditing(key)}/>
              
                      <TextInput  tabIndex={key + '3'} key={key + '3'} maxLength={1} style={[style.input]}
                        ref={lineRef[key][2]}
                        onChangeText={(value) => {
                          if (value.length === 1) {
                            if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))){
                              lineRef[key][2].current.clear();
                              console.log("nao pode char especial")
                            }else{
                              lineRef[key][3].current.focus();
                            }
                          }
                        }}
                        onKeyPress={({ nativeEvent }) => {
                          if (nativeEvent.key === 'Backspace') {
                            lineRef[key][1].current.focus();
                          }
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => handleSubmitEditing(key)}/>
              
                      <TextInput  tabIndex={key + '4'} key={key + '4'} maxLength={1} style={[style.input]}
                        ref={lineRef[key][3]}
                        onChangeText={(value) => {
                          if (value.length === 1) {
                            if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))){
                              lineRef[key][3].current.clear();
                              console.log("nao pode char especial")
                            }else{
                              lineRef[key][4].current.focus();
                            }
                          }
                        }}
                        onKeyPress={({ nativeEvent }) => {
                          if (nativeEvent.key === 'Backspace') {
                            lineRef[key][2].current.focus();
                          }
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => handleSubmitEditing(key)}/>
              
                      <TextInput  tabIndex={key + '5'} key={key + '5'} maxLength={1} style={[style.input]}
                        ref={lineRef[key][4]}
                        returnKeyType="next"
                        onChangeText={(value) => {
                          if (value.length === 1) {
                            if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))){
                              lineRef[key][4].current.clear();
                              console.log("nao pode char especial")
                            }
                          }
                        }}
                        onKeyPress={({ nativeEvent }) => {
                          if (nativeEvent.key === 'Backspace') {
                            lineRef[key][4].current.clear();
                            lineRef[key][3].current.focus();
                          }
                        }}
                        onSubmitEditing={() => handleSubmitEditing(key)}/>
                  </View>
                ))
              }
      </View>          
    );
  }else{
    return <ModalHistory open={isModalHistoryOpen} onClose={()=> setIsModalHistoryOpen(false)} numberOfLines={numberOfLines} />
  }
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