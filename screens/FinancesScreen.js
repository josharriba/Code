import React from 'react';
  import { Alert, StyleSheet, Modal, Button, TouchableOpacity, Text, View, TouchableHighlight, TextInput, StackNavigator } from 'react-native';
import db from '../components/FirebaseHandler'
import colors from '../assets/colors/colors';


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
    Alert.alert('Transaction successfully recorded.');
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
          <TouchableOpacity
            style={styles.buttonContainer2}
            onPress={() => this.props.navigation.navigate('Budgeting')}
            >
              <Text style={styles.buttonText}>Budgeting</Text>
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
      top: 540,
      left: 45,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddinghorizontal: 20,
      width: 300
  },
  buttonContainer1: {
    position: 'absolute',
      top: 220,
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
    color: colors.background,
    position: 'absolute',
    top: 280,
    //marginLeft: '30%'
  },

});
export default FinancesScreen