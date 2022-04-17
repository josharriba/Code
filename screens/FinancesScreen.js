import React from 'react';
  import { Alert, StyleSheet, Modal, Button, TouchableOpacity, Text, View, TouchableHighlight, TextInput, StackNavigator } from 'react-native';
import db from '../components/FirebaseHandler'
import colors from '../assets/colors/colors';
import Dropdown from 'react-native-element-dropdown'
import {Picker} from '@react-native-picker/picker'

class FinancesScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      date: '',
      description: '',
      amount: '',
      id: '',
      category: [
        {label: 'Housing', value: 'housing', key:1},
        {label: 'Transportation', value: 'transportation', key:2},
        {label: 'Food', value: 'food', key:3},
        {label: 'Insurance', value: 'insurance', key:4},
        {label: 'Savings', value: 'savings', key:5},
        {label: 'Miscelaneous bills', value: 'miscelaneous bills', key:6},
        {label: 'Personal/hobby', value: 'personal', key:7},
        {label: 'Miscelaneous', value: 'miscelaneous', key:8},
      ],
      selected: 'miscelaneous'
    }
  }
  
  enterTransaction() {
    if (this.state.date == '' || this.state.description == '' || this.state.amount == '') {
      Alert.alert("You cannot leave any information blank!");
    }
    else {
      db.enterTransaction(this.state.date, this.state.description, this.state.amount, this.state.selected);
      this.setState({
        date: '',
        description: '',
        amount: '', 
        selected: 'Enter a category for your transaction'
      })
      Alert.alert('Transaction successfully recorded.');
    }
  }

  async onValueChange(value) {
    this.setState({ selected: value });
    console.log(this.state.selected);
  }

  updateInput = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
}

    render() {
      return(
        <View style={{flex: 1, alignItems:'center', backgroundColor: 'white',justifyContent:'center'}}>
          <TouchableOpacity 
            style={styles.buttonContainer} 
            onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
            {/* <Button title="Stocks"
            onPress={() => this.props.navigation.navigate('Stocks')}
            />
            <Button title="Dashboard"
            onPress={() => this.props.navigation.navigate('Dashboard')}
            />
            <Button title="Profile"
            onPress={() => this.props.navigation.navigate('Profile')}
            /> */}
             <Picker
              prompt="Select a transaction category"
              mode="dropdown"
              style={{
                height: 50, 
                width: 300, 
                 
                position: "absolute",
                  top: "41%",
                backgroundColor: colors.background,
                
                }}
              
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              {this.state.category.map((item, index) => (
                <Picker.Item
                  color= {colors.primary}
                  label={item.label}
                  value={item.value}
                  index={index}
                />
              ))}
          </Picker>
            <TextInput 
              style={styles.textContainer}
              placeholder="date"
              placeholderTextColor="lightgrey"
              value = {this.state.date}
              onChangeText={(input) => this.updateInput(input, 'date')}
            />
            <TextInput 
              style={styles.textContainer1}
              placeholder="description"
              placeholderTextColor="lightgrey"
              value = {this.state.description}
              onChangeText={(input) => this.updateInput(input, 'description')}
            />
            <TextInput 
              style={styles.textContainer2}
              placeholder="amount"
              placeholderTextColor="lightgrey"
              value = {this.state.amount}
              onChangeText={(input) => this.updateInput(input, 'amount')}
            />
           

            <TouchableOpacity 
            style={styles.buttonContainer1}
            //title="Enter transaction"
            onPress={() => this.enterTransaction()}
            >
              <Text style={styles.text}>Enter Transaction</Text>
              </TouchableOpacity>
            <Text
              style={[styles.textContainer3,styles.text1]}>
              You can view your transactions on the Dashboard Screen
            </Text>
        </View>
        );
    }
}
const styles = StyleSheet.create({
  titleText: {
    marginTop: 25,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    //fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white"
  },
  textContainer: {
    position: 'absolute',
      top: 20,
      //left: 45,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    height: 50, width: "100%",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: .8,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 20
  },
  textContainer1: {
    position: 'absolute',
      top: 80,
      //left: 45,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    height: 50, width: "100%",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: .8,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 20
  },
  textContainer2: {
    position: 'absolute',
      top: 140,
      //left: 45,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    height: 50, width: "100%",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: .8,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 20
  },
  textContainer3: {
    position: 'absolute',
    top: 100,
  },
  buttonContainer: {
    position: 'absolute',
      top: "75%",
      left: 45,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddinghorizontal: 20,
      width: 300
  },
  buttonContainer1: {
    position: 'absolute',
      top: "60%",
      left: 45,
    elevation: 8,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 4,
    marginBottom: 4,
    width: 300
  },
  buttonContainer2: {
    position: 'absolute',
      top: 450,
      left: 45,
    backgroundColor: "lightgray",
    borderRadius: 10,
    paddingVertical: 10,
    paddinghorizontal: 14,
    marginBottom: 29,
    width: 300
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 5,
      //marginLeft: '40%',
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    color: colors.primary
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    color: colors.background,
    //marginLeft: '30%'
  },
  text1: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: colors.secondary,
    position: 'absolute',
    top: "55%",
    //marginLeft: '30%'
  },

});
export default FinancesScreen