
import { View, Text, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState} from 'react';
const ModalHistory = ({ open, onClose, numberOfLines })  => {
    const [gotAll, setGotAll] = useState(false)
    const [one, setOne] = useState(0)
    const [two, setTwo] = useState(0)
    const [three, setThree] = useState(0)
    const [four, setFour] = useState(0)
    const [five, setFive] = useState(0)
    const [six, setSix] = useState(0)
    const [seven, setSeven] = useState(0)
    const [eight, setEight] = useState(0)
    const [totalGames, setTotalGames] = useState(0)
    const [totalSolved, setTotalSolved] = useState(0)
    const [totalSolvedPercentage, setSolvedPercentage] = useState(0)
    const [maxSolvedInARow, setMaxSolvedInARow] = useState(0)
    const [solvedInARow, setSolvedInARow] = useState(0)
    AsyncStorage.getItem("totalGames").then((res) => {
        setTotalGames(res);
    })   
    AsyncStorage.getItem("totalSolved").then((res) => {
        setTotalSolved(res);
        setSolvedPercentage(res*100/totalGames);
    })   
    AsyncStorage.getItem("0").then((res) => {
        setOne(res)
        //one = parseInt(res)*100/parseInt(totalSolved)
        console.log(res)
    })   
    AsyncStorage.getItem("1").then((res) => {
        setTwo(res*100/totalSolved)
    })   
    AsyncStorage.getItem("2").then((res) => {
        setThree(res*100/totalSolved)
    })   
    AsyncStorage.getItem("3").then((res) => {
        setFour(res*100/totalSolved)
    })   
    AsyncStorage.getItem("4").then((res) => {
        setFive(res*100/totalSolved)
    })   
    AsyncStorage.getItem("5").then((res) => {
        setSix(res*100/totalSolved)
    })   
    AsyncStorage.getItem("6").then((res) => {
        setSeven(res*100/totalSolved)
    })   
    AsyncStorage.getItem("7").then((res) => {
        setEight(res*100/totalSolved)
    })   
    AsyncStorage.getItem("solvedInARow").then((res) => {
        setSolvedInARow(res);
    })   
    AsyncStorage.getItem("maxSolvedInARow").then((res) => {
        setMaxSolvedInARow(res);
        setGotAll(true);
    })
    if(gotAll){
      return (
        <Modal isVisible={open} onBackButtonPress={onClose} onBackdropPress={onClose}>
          <Text > totalGames: {totalGames}  </Text>
          <Text > TotalSolvedPercentage: {totalSolvedPercentage} % </Text>
          <Text > solvedInARow: {solvedInARow} </Text>
          <Text > maxSolvedInARow: {maxSolvedInARow} </Text>
            <View >
                <Text>1 tentativa : {one} </Text>
            </View>
            <View >
                <Text>2 tentativa : {two} </Text>
            </View>
            <View >
                <Text>3 tentativa : {three} </Text>
            </View>
            <View >
                <Text>4 tentativa : {four} </Text>
            </View>
            <View >
                <Text>5 tentativa : {five} </Text>
            </View>
            <View >
                <Text>6 tentativa : {six} </Text>
            </View>
            <View >
                <Text>7 tentativa : {seven} </Text>
            </View>
            <View >
                <Text>8 tentativa : {eight} </Text>
            </View>
        </Modal>     
    );    
    }else{
        return(
            <Modal isVisible={open} onBackButtonPress={onClose} onBackdropPress={onClose}>
            </Modal>
        )
    }
  }
  
  
  export default ModalHistory;