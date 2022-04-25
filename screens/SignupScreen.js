import React from 'react';
  import { StyleSheet,Text, TouchableOpacity, View, Button, TextInput, Alert } from 'react-native';

import db from '../components/FirebaseHandler';
import colors from './assets/colors/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

/*
  This is our signup screen. We require users to enter name, email, password and age
  and then we create an account if requirements as described below are met
*/
  class SignupScreen extends React.Component {
   constructor(){
    super();
        this.state = {
            name:'',
            email: '',
            password: '',
            age: '', 
            digit: /^[0-9\b]+$/
        }  
      }

    /*
      Update the input values of the text input
    */
    updateInput = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    /*
      Update input values of text input for numbers
      requires that the input is a digit, as described with the 
      digit regex state variable
    */
    updateInputNum = (val, prop) => {
      if(this.state.digit.test(val)){
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
    }

    /*
        If the email, password and name are non-empty, the age is > 18
        then we call FirebaseHandler.js doSignup, which then will check for valid
        email and password and then create account and user data documents
    */
    registerNewUser = () => {
        if(this.state.email === '' || this.state.password === '' || this.state.name === '') {
            Alert.alert('Please enter your name, email, and password to signup')
        }
        if(this.state.age < 18) {
            Alert.alert('You must be at least 18 years old to sign up')
        }
        else {
            db.doSignup(this.state.email, this.state.password, this.state.name, this.state.age);

            this.setState({
                name: '',
                email: '',
                password: '',
                age: ''
            })
            Alert.alert("Account successfully created. You will be signed in")
            // this.props.navigation.navigate('Login')
        }
    }

  render() {
    /*
      We render text inputs for email, password, name and age
      We also have some text instructions that give the guidelines for
      entering valid email and passwords
    */
   return (
        <View style = {styles.container}>
            <TextInput style = {styles.text}
            placeholder="Name"
            placeholderTextColor = {"lightgray"}
            value = {this.state.name}
            onChangeText={(input) => this.updateInput(input, 'name')}
                />
        <TextInput style = {styles.text}
            placeholder="Email"
            placeholderTextColor = {"lightgray"}
            value = {this.state.email}
            keyboardType="email-address"
            onChangeText={(input) => this.updateInput(input, 'email')}
                />
                <Text style = {styles.text} >Please enter your email in all lowercase</Text>
        <TextInput style = {styles.text}
            placeholder="Password"
            placeholderTextColor = {"lightgray"}
            value = {this.state.password}
            onChangeText={(input) => this.updateInput(input, 'password')}
            maxLength={18}
            secureTextEntry={true}
                />
        <Text style = {styles.text}>Your password must be at least 6 characters long</Text>
      <TextInput style = {styles.text}
           placeholder="Age"
           placeholderTextColor = {"lightgray"}
           value = {this.state.age}
           keyboardType="numeric"
           onChangeText={(input) => this.updateInputNum(input, 'age')}
            />

    <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {this.registerNewUser()}}
        >
      <Text style={styles.buttonText}>finish</Text>
      </TouchableOpacity>

        {/* <Button title="Finish"
            color = {colors.secondary}
            onPress={() => {
            this.registerNewUser()
            }
        } /> */}
        </View>
  );
 }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "white",
      fontFamily: 'Montserrat-Medium'
    },
    buttonContainer: {
        //position: 'absolute',
        top: 40,
        //left: 45,
        backgroundColor: colors.background,
        alignSelf:'center',
        borderRadius: 10,
        paddingVertical: 10,
        paddinghorizontal: 20,
        width: 300
    },
    buttonText: {
        padding: 5,
        marginLeft: '40%',
        fontFamily: "Montserrat-Medium",
        fontSize: 20,
        color: colors.primary
    },
        button: {
        backgroundColor: colors.primary
    },
    text: {
        fontSize: 15,
        fontFamily: "Montserrat-Medium",
        height: 45, width: "100%",
        paddingHorizontal: 20,
        borderRadius: 5,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 15,
        //backgroundColor: 'lightgray'
        
    },
    title: {
      //marginTop: 16,
      //paddingVertical: 8,
     // borderWidth: 4,
      //borderColor: "#20232a",
      //borderRadius: 6,
      //backgroundColor: "#61dafb",
     // color: "#20232a",
      //textAlign: "center",
      //fontSize: 30,
      //fontWeight: "bold"
    }
  });
export default SignupScreen;