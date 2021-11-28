import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableHighlight, TextInput, StackNavigator } from 'react-native';

class BudgetingScreen extends React.Component {
    render() {
      return(
        <View style={{bottom: 275, flex: 1, alignItems:'center', justifyContent:'center'}}>
        <TextInput
        placeholder ="Enter Budget Amount"
        placeholderTextColor = 'black'
         />
        </View>
        );
    }
    style = StyleSheet.create({
        input: {
            borderWidth: 1,
            borderColor: '#777',
            padding: 8,
            margin: 10,
            width: 200,
        }
    })
    }

export default BudgetingScreen