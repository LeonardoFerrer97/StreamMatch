import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Alert, Dimensions  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalHistory from './ModalHistory';
import Keyboard from './Keyboard';

const {height, width} = Dimensions.get('window');

let numberOfLetters = 5;

let disabledKeyList = [];
let correctLettersList = [];
let existingLettersList = [];

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
      if(char == undefined || char == ''){
        Alert.alert("Essa palavra é muito curta")
        lineRef[key][0].current.focus();
        onFocus = [key,0];
        return;
      }
    }
      var wordExist = "";
      for(let a = 0;a<numberOfLetters;a++){
        wordExist += lineRef[key][a].current.value
      }
      var exists = true;
       await fetch('https://generaterandomword.herokuapp.com/words/exists/' + wordExist.toLowerCase() )
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
          lineRef[key][a].current.clear()
        }
        lineRef[key][0].current.focus()
        onFocus = [key,0];
        return;
      }
      var isSolved = true;
      var containingChars = [];
      let coutingCharsAux = {};
      Object.assign(coutingCharsAux,coutingChars)
      for(let a = 0;a<numberOfLetters;a++){
        var char = lineRef[key][a].current.value.toUpperCase();
        if(char == word[a]){
          correctLettersList.push(char);
          lineRef[key][a].current.setNativeProps({
            style:{backgroundColor: '#3fba29'}
          });
          if(coutingCharsAux[char] > 0){ 
            coutingCharsAux[char]--;
          }
        }else if(word.indexOf(char) >= 0){
          existingLettersList.push(char);
          isSolved = false;
          var containChar = {char:char,a:a};
          containingChars.push(containChar)
          lineRef[key][a].current.setNativeProps({
            style:{backgroundColor: 'grey'}
          });
        }else{
          disabledKeyList.push(char);
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
      }else{
        console.log(key,numberOfLines)
        if(key>=numberOfLines.length -1){
          setIsModalHistoryOpen(true)
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
        onFocus = [key+1,0];
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

  let onFocus = [0,0];
  const onKeyPress = (key) =>{
    if(key == "Enter"){
      handleSubmitEditing(onFocus[0]);
    }
    else if(key == "Apagar"){
      lineRef[onFocus[0]][onFocus[1]].current.value = "";
      if(onFocus[1] > 0){
        onFocus[1] -=1;
        lineRef[onFocus[0]][onFocus[1]].current.focus();
      }
    }
    else{
      lineRef[onFocus[0]][onFocus[1]].current.value = key;
      if(onFocus[1] < 4){
        onFocus[1] +=1;
        lineRef[onFocus[0]][onFocus[1]].current.focus();
      }
    }
    
  }

  if(!isModalHistoryOpen){
    return (
      <View style = {[style.container]} id = "debug">
              {
                numberOfLines.map((key) => (
                  <View tabIndex={key} key={key} 
                    pointerEvents={lineFocus[key]}
                    style = {[style.form]} 
                    ref={viewRefs[key]}>
                      <TextInput tabIndex={key + '1'} key={key + '1'} maxLength={1}  style={[style.input]}
                      showSoftInputOnFocus={false}
                        ref={lineRef[key][0]}
        
                        onFocus={() => {
                          onFocus = [key,0];
                        }}
                        returnKeyType="next"/>
                      <TextInput  tabIndex={key + '2'} key={key + '2'} maxLength={1} style={[style.input]}
                      showSoftInputOnFocus={false}
                        ref={lineRef[key][1]}
                        onFocus={() => {
                          onFocus = [key,1];
                        }}
                        returnKeyType="next"/>
              
                      <TextInput  tabIndex={key + '3'} key={key + '3'} maxLength={1} style={[style.input]}
                      showSoftInputOnFocus={false}
                        ref={lineRef[key][2]}
                        onFocus={() => {
                          onFocus = [key,2];
                        }}
                        returnKeyType="next"/>
              
                      <TextInput  tabIndex={key + '4'} key={key + '4'} maxLength={1} style={[style.input]}
                        showSoftInputOnFocus={false}
                        ref={lineRef[key][3]}
                        onFocus={() => {
                          onFocus = [key,3];
                        }}
                        returnKeyType="next"/>
              
                      <TextInput  tabIndex={key + '5'} key={key + '5'} maxLength={1} style={[style.input]}
                      showSoftInputOnFocus={false}
                        ref={lineRef[key][4]}
                        returnKeyType="next"
                        onFocus={() => {
                          onFocus = [key,4];
                        }}/>
                  </View>
                ))
              }
              <View style = {[style.keyboard]}>
                <Keyboard 
                  onKeyPress={onKeyPress}
                  disabledKeyList = {disabledKeyList}
                  correctLettersList = {correctLettersList}
                  existingLettersList = {existingLettersList}/>
              </View>
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
    height:height,
    backgroundColor:'lightblue'
  },
  title:{
    color:'grey',
    alignSelf: 'center',
    fontSize:30
  }, 
  form: {
    justifyContent:'center',
    flexDirection:'row',
    flexWrap: 'wrap',
    maxHeight:height/10,
    margin:5
  },
  input: { 
    fontSize: '500%',
    maxWidth: '15%',
    maxHeight: '100%',
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
  },
  keyboard: {
    justifyContent: 'center',
    flex:1,
    width: width,
  }
})