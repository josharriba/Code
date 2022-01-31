import React, {useEffect, useState} from 'react';
import { Alert, StyleSheet, View, Button, TextInput, } from 'react-native';
import auth from '@react-native-firebase/auth';
import db from '../components/FirebaseHandler';
import { withNavigation } from 'react-navigation';


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
      if(this.state.email === '' && this.state.password === '') {
        Alert.alert('Enter email and password to signin')
      } 
      else {
        //db.doLogin(this.state.email, this.state.password)
         auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            this.currUser = auth().currentUser.email;
            userName  = db.getName();
            this.props.navigation.navigate('Home', {username: userName}); 
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
        });
        this.setState({
          email: '', 
          password: ''
        })
      }
    }

  render() {
   return (
    <View>
       <TextInput
           placeholder="Email"
           placeholderTextColor = 'black'
           value = {this.state.email}
          onChangeText={(input) => this.updateInput(input, 'email')}
            />
      <TextInput
              placeholder="Password"
              placeholderTextColor = 'black'
              value = {this.state.password}
              onChangeText={(input) => this.updateInput(input, 'password')}
              secureTextEntry={true}
            />
      <Button title="Login"
        onPress={() => {
          this.login();
        }
      } />

      <Button title="Create Account"
        onPress={() => {
        {this.props.navigation.navigate('Signup')}
        }
      } />
  </View>
  );
 }
}

export default LoginScreen;