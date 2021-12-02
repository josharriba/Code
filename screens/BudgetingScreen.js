import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableHighlight, TextInput, StackNavigator } from 'react-native';

class BudgetingScreen extends React.Component {
  constructor(){
    super();
        this.state = {
            amount: ''
        }  
  }

  updateInput = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
    render() {
      return(
        <View style={{bottom: 275, flex: 1, alignItems:'center', justifyContent:'center'}}>
        <TextInput
        placeholder ="Enter Budget Amount" 
        placeholderTextColor = 'black'
        value = {this.state.amount}
        onChangeText={(input) => this.updateInput(input, 'amount')}
         />
        </View>
        );
    }
    styles = StyleSheet.create({
        input: {
            padding: 15,
            backgroundColor: '#f8f8f8',
            borderBottomWidth: 1,
            borderColor: '#eee',
        }
    })
    }

export default BudgetingScreen