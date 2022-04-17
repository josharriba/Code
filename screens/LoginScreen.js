import React, {useEffect, useState} from 'react';
  import { Alert, StyleSheet, Text, TouchableOpacity, View, Button, TextInput, } from 'react-native';
  import auth from '@react-native-firebase/auth'
import db from '../components/FirebaseHandler';
import { withNavigation } from 'react-navigation';
import colors from './assets/colors/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';


  class LoginScreen extends React.Component {
   constructor(){
    super();
        this.state = {
          email: '',
          password: '', 
          flag: false
        }  
      }

    updateInput = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    login = () => {
      if(this.state.email === '' || this.state.password === '') {
        Alert.alert('Enter email and password to signin')
      } 
      else {
        //db.doLogin(this.state.email, this.state.password)
         auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            this.currUser = auth().currentUser.email;
            //this.props.navigation.navigate('Home'); 
            console.log('User logged in successfully')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; 
            if(errorCode === 'auth/wrong-password' || errorCode == 'auth/invalid-password') {
              Alert.alert('Invalid Password. Please try again!')
            }
            if(errorCode === 'auth/invalid-user-token' || errorCode === 'auth/user-token-expired' || errorCode === 'auth/invalid-email') {
              Alert.alert('Invalid email. Please try again!')
            }  
            else {
              Alert.alert(errorMessage);
            } 
        });
        this.setState({
          email: '', 
          password: ''
        })
      }
    }

  render() {
   return (
    <View style = {styles.container}>
       <TextInput style = {styles.text}
           placeholder="Email"
           placeholderTextColor = {"lightgray"}
           value = {this.state.email}
          onChangeText={(input) => this.updateInput(input, 'email')}
            />
      <TextInput style = {styles.text}
              placeholder="Password"
              placeholderTextColor = {"lightgray"}
              value = {this.state.password}
              onChangeText={(input) => this.updateInput(input, 'password')}
              secureTextEntry={true}
            />
      <View style = {styles.container}>

      <TouchableOpacity
          style={styles.buttonContainer2}
          onPress={() => {this.login();}} 
        >
      <Text style={styles.buttonText}>login</Text>
        
      </TouchableOpacity>
      </View>
      
      <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {{this.props.navigation.navigate('Signup')}}}
        >
      <Text style={styles.buttonText2}>create account</Text>
      </TouchableOpacity>
      {/* <Button title="Create Account"
        color = {colors.secondary}
        onPress={() => {{this.props.navigation.navigate('Signup')}}} /> */}
  </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white"
  },
  square: {
    width: 30,
    height: 12,
    backgroundColor: "gray"
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    paddinghorizontal: 14,
    width: 300,
    position: 'absolute',
        top: 270,
        left: 46,
  },
  buttonContainer2: {
    elevation: 8,
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    paddinghorizontal: 10,
    width: 300,
    position: 'absolute',
        top: 23,
        left: 22,
  },
  buttonText: {
    padding: 5,
    marginLeft: '40%',
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    color: colors.primary
  },
  buttonText2: {
    padding: 5,
    marginLeft: '25%',
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    color: colors.primary
  },
  text: {
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    height: 50, width: "100%",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20
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
export default LoginScreen;