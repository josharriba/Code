import React from 'react';
  import { Alert, StyleSheet, Modal, Button, Text, View, TouchableHighlight, TextInput, StackNavigator } from 'react-native';
import db from '../components/FirebaseHandler'


class FinancesScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      date: '',
      description: '',
      amount: '',
    }
  }

  enterTransaction() {
    db.enterTransaction(this.state.date, this.state.description, this.state.amount);
    this.setState({
      date: '',
      description: '',
      amount: ''
    })
    Alert.alert('Transaction successfully recorded. You can view your recent transactions in the Dashboard');
  }

  updateInput = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
}

    render() {
      return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Button title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
            />
            <Button title="Budgeting"
            onPress={() => this.props.navigation.navigate('Budgeting')}
            />
            <Button title="Stocks"
            onPress={() => this.props.navigation.navigate('Stocks')}
            />
            <Button title="Dashboard"
            onPress={() => this.props.navigation.navigate('Dashboard')}
            />
            <Button title="Profile"
            onPress={() => this.props.navigation.navigate('Profile')}
            />
            <TextInput 
              placeholder="date"
              placeholderTextColor="black"
              value = {this.state.date}
              onChangeText={(input) => this.updateInput(input, 'date')}
            />
            <TextInput 
              placeholder="description"
              placeholderTextColor="black"
              value = {this.state.description}
              onChangeText={(input) => this.updateInput(input, 'description')}
            />
            <TextInput 
              placeholder="amount"
              placeholderTextColor="black"
              value = {this.state.amount}
              onChangeText={(input) => this.updateInput(input, 'amount')}
            />
             <Button title="Enter transaction"
            onPress={() => this.enterTransaction()}
            />
        </View>
        );
    }
}

export default FinancesScreen