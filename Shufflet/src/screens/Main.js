import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Alert  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalHistory from './ModalHistory';
import Keyboard from './Keyboard';

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
    for(let a = 0;a<numberOfLetters;a++){
      var char = lineRef[key][a].current.value
      console.log(char)
      if(char == undefined || char == ''){
        Alert.alert("Essa palavra é muito curta")
        lineRef[key][0].current.focus();
        return;
      }
    }
      var wordExist = "";
      for(let a = 0;a<numberOfLetters;a++){
        wordExist += lineRef[key][a].current.value
      }
      var exists = true;
       await fetch('https://generaterandomword.herokuapp.com/words/exists/' + wordExist )
        .then((response) => response.text())
        .then((json) => {
          if(json == "false"){
            Alert.alert(wordExist +" não existe")
            exists = false;
          }
        });
      if(!exists){
        for(let a = 0;a<numberOfLetters;a++){
          lineRef[key][a].current.value = undefined
          console.log("value: " + lineRef[key][a].current.value)
          lineRef[key][a].current.clear()
        }
        lineRef[key][0].current.focus()
        return;
      }
      var isSolved = true;
      var containingChars = [];
      let coutingCharsAux = {};
      Object.assign(coutingCharsAux,coutingChars)
      for(let a = 0;a<numberOfLetters;a++){
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
          lineRef[key][a].current.setNativeProps({
            style:{backgroundColor: 'grey'}
          });
        }else{
          lineRef[key][a].current.setNativeProps({
            style:{backgroundColor: 'grey'}
          });

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
        }else{
          lineRef[key][containingChars[b].a].current.setNativeProps({
            style:{backgroundColor: 'grey'}
          });

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
              {
                numberOfLines.map((key) => (
                  <View tabIndex={key} key={key} 
                    pointerEvents={lineFocus[key]}
                    style = {[style.form]} 
                    ref={viewRefs[key]}>
                      <TextInput tabIndex={key + '1'} key={key + '1'} maxLength={1}  style={[style.input]}
                      showSoftInputOnFocus={false}
                        ref={lineRef[key][0]}
                        onChange={(event) => {
                        }}
                        onChangeText={(value) => {
                          if (value.length === 1) {
                            if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))){
                              console.log(lineRef[key][0]._root)
                              lineRef[key][0].current.clear();
                              Alert.alert("Esse character não é permitido")
                            }else{
                              lineRef[key][0].current.value = value;
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
                      showSoftInputOnFocus={false}
                        ref={lineRef[key][1]}
                        onChangeText={(value) => {
                          if (value.length === 1) {
                            if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))){
                              lineRef[key][1].current.clear();
                              Alert.alert("Esse character não é permitido")
                              lineRef[key][1].current.focus();
                            }else{
                              lineRef[key][1].current.value = value;
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
                      showSoftInputOnFocus={false}
                        ref={lineRef[key][2]}
                        onChangeText={(value) => {
                          if (value.length === 1) {
                            if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))){
                              lineRef[key][2].current.clear();
                              Alert.alert("Esse character não é permitido")
                            }else{
                              lineRef[key][2].current.value = value;
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
                      showSoftInputOnFocus={false}
                        ref={lineRef[key][3]}
                        onChangeText={(value) => {
                          if (value.length === 1) {
                            if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))){
                              lineRef[key][3].current.clear();
                              Alert.alert("Esse character não é permitido")
                            }else{
                              lineRef[key][3].current.value = value;
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
                      showSoftInputOnFocus={false}
                        ref={lineRef[key][4]}
                        returnKeyType="next"
                        onChangeText={(value) => {
                          if (value.length === 1) {
                            if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))){
                              lineRef[key][4].current.clear();
                              Alert.alert("Esse character não é permitido")
                            }else{
                              
                              lineRef[key][4].current.value = value;
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
              
              <Keyboard/>
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
    overflow: 'scroll'
  },
  title:{
    color:'grey',
    alignSelf: 'center',
    fontSize:30
  }, 
  form: {
    justifyContent:'center',
    flexDirection:'row'
  },
  input: { 
    fontSize: 200,
    maxWidth: '15%',
    maxHeight: '30%',
    textAlign:'center',
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