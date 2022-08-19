
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const keySequence = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ["Por favor", "funciona"],
];

const Keyboard = () => {
  isDisabled = false;
  
  const onKeyPress = (key) => {
    console.log(key)
    }

  return (
    <>
      {keySequence.map((row, rowIndex) => {
        return (
          <View key={'key-row-' + rowIndex} style={styles.row}>
            {row.map(key => {
              return (
                <Pressable
                  key={key}
                  disabled={isDisabled}
                  onPress={() => onKeyPress(key)}>
                  <View
                    style={[styles.cell, isDisabled && styles.cellDisabled]}>
                    <Text
                      style={[styles.text, isDisabled && styles.textDisabled]}>
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

const styles = StyleSheet.create({
  row: {
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
  text: {
    color: 'white',
    fontSize: 16,
  },
  textDisabled: {
    color: 'grey',
  },
});

export default Keyboard;