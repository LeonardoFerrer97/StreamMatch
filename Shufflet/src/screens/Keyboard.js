
import React from 'react';
import {Pressable, Text, View, StyleSheet, Dimensions} from 'react-native';



const keySequence = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ["Apagar", "Enter"],
];

const Keyboard =  (props) => {
  const {onKeyPress, disabledKeyList, correctLettersList, existingLettersList} = props;

  return (
    <>
      {keySequence.map((row, rowIndex) => {
        return (
          <View key={'key-row-' + rowIndex} style={styles.row}>
            {row.map(key => {
              const isDisabled = disabledKeyList.includes(key);
              const correct = correctLettersList.includes(key);
              const exists = existingLettersList.includes(key);
              const cellStyle = correct ? styles.cellCorrect : exists ? styles.cellExists : isDisabled ? styles.cellDisabled : "";
              return (
                <Pressable
                  key={key}
                  onPress={() => onKeyPress(key)}>
                  <View
                    style={[styles.cell, cellStyle]}>
                    <Text
                      style={[styles.text, cellStyle]}>
                      {key}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </>
  );
};

export default Keyboard;


const styles =  StyleSheet.create({
  row: {
    margin:'auto',
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    padding: 5,
    paddingHorizontal: 8,
    margin: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  cellDisabled: {
    borderColor: 'grey',
  },
  cellExists: {
    borderColor: 'yellow',
  },
  cellCorrect: {
    borderColor: 'green',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  textDisabled: {
    color: 'grey',
  },
});