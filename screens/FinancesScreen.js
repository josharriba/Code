import React from 'react';
  import { Alert, StyleSheet, Modal, Button, TouchableOpacity, KeyboardAvoidingView, Text, View, TouchableHighlight, TextInput, StackNavigator } from 'react-native';
import db from '../components/FirebaseHandler'
import colors from '../assets/colors/colors';
import Dropdown from 'react-native-element-dropdown'
import {Picker} from '@react-native-picker/picker'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

/*
    Finances screen allows user to enter transactions
*/
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
  
  /*
    if user has non-empty date, description and amount and date is formatted properly, 
    then call FirebaseHandler enter transaction to enter transaction
  */
  enterTransaction() {
    if (this.state.date == '' || this.state.description == '' || this.state.amount == '') {
      Alert.alert("You cannot leave any information blank!");
    }
    else {
      if(this.state.date.length != 8) {
        Alert.alert("Please enter a valid date! (mm/dd/yy)");
      }
      if(this.state.date.length == 8){
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
  }

  /*
    change value of dropdown selection for transaction category
  */
  async onValueChange(value) {
    this.setState({ selected: value });
    console.log(this.state.selected);
  }

  /*
    update input for text fields
  */
  updateInput = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
}

    render() {
      /*
          render text fields for user to enter transaction
      */
      return(
        <KeyboardAwareScrollView 
       // style={styles.container1}
        style={{backgroundColor: 'white'}} 
        contentContainerStyle={styles.container1}
        //resetScrollToCoords={{ x: 0, y: 0 }}>
        >
          <View style={styles.container}>
            <TextInput 
              style={styles.textContainer}
              placeholder="date (mm/dd/yy)"
              placeholderTextColor="lightgrey"
              value = {this.state.date}
              onChangeText={(input) => this.updateInput(input, 'date')}
            />
            <TextInput 
              style={styles.textContainer}
              placeholder="description"
              placeholderTextColor="lightgrey"
              value = {this.state.description}
              onChangeText={(input) => this.updateInput(input, 'description')}
            />
            <TextInput 
              style={styles.textContainer}
              placeholder="amount (ex. $25.95)"
              placeholderTextColor="lightgrey"
              value = {this.state.amount}
              onChangeText={(input) => this.updateInput(input, 'amount')}
            />
            <View style={styles.container}>
             <Picker
              prompt="Select a transaction category"
              mode="dropdown"
              style={{
                height: 30, 
                width: 300, 
                alignSelf: 'center',
                //position: "absolute",
                  top: '10%',
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
           
           

            <TouchableOpacity 
            style={styles.buttonContainer1}
            //title="Enter transaction"
            onPress={() => this.enterTransaction()}
            >
              <Text style={styles.text}>Enter Transaction</Text>
              </TouchableOpacity>
            
            
            </View>
            
            </View>
            <Text
              style={styles.text1}>
              You can view your transactions on the Dashboard Screen
            </Text>
          </KeyboardAwareScrollView>
          
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
    //padding: 24,
    backgroundColor: "white",
    fontFamily: 'Montserrat-Medium'
  },
  container1: {
    flex: 1,
     padding: 15,
     justifyContent: 'center',
     backgroundColor: "white", 
     //marginBottom: 0,
     //marginTop: -110,
   },
  textContainer: {
    //position: 'absolute',
      top: '0%',
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
      top: '20%',
      //left: 45,
    textAlign: 'center',
    //justifyContent: 'center',
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
  buttonContainer: {
   // position: 'absolute',
      top: '-40%',
      left: 45,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 20,
      paddinghorizontal: 20,
      width: 300
  },
  buttonContainer1: {
    //position: 'absolute',
      top: "20%",
      
      
    elevation: 8,
    alignSelf: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 4,
    marginBottom: 4,
    width: 300
  },
  buttonContainer2: {
    //position: 'absolute',
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
  //postion: 'absolute',
      top: '-45%',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: colors.primary,
    
    //marginLeft: '30%'
  },

});
export default FinancesScreen