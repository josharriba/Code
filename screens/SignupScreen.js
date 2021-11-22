import React from 'react';
  import { StyleSheet, View, Button, TextInput, Alert } from 'react-native';
   import auth from '@react-native-firebase/auth';
//import firebase from 'firebase'
import firestore from '@react-native-firebase/firestore'


  class SignupScreen extends React.Component {
   constructor(){
    super();
    this.db = firestore().collection('Users');
        this.state = {
            name:'',
            email: '',
            password: '',
            age: ''
        }  
      }

    updateInput = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    registerNewUser = () => {
        if(this.state.email === '' || this.state.password === '' || this.state.name === '') {
            Alert.alert('Please enter your name, email, and password to signup')
        }
        if(this.state.age < 18) {
            Alert.alert('You must be at least 18 years old to sign up')
        }
        else {
        this.db.add({
            name: this.state.name,
            email: this.state.email,
            age: this.state.age
        })
        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            console.log('New user registered successfully')
            // res.user.updateProfile({
            //     name: this.state.name,
            //     email: this.state.email,
            //     age: this.state
            // })
            console.log('New user registered successfully')
            this.setState({
                name: '',
                email: '',
                password: '',
                age: ''
            })
            this.props.navigation.navigate('Home')
        })
        .catch(error => this.setState({errorMessage: error.message}))
        }
    }

  render() {
   return (
        <View>
            <TextInput
            placeholder="Name"
            placeholderTextColor = 'black'
            value = {this.state.name}
            onChangeText={(input) => this.updateInput(input, 'name')}
                />
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
            maxLength={18}
            secureTextEntry={true}
                />
      <TextInput
           placeholder="Age"
           placeholderTextColor = 'black'
           value = {this.state.age}
           onChangeText={(input) => this.updateInput(input, 'age')}
            />
        <Button title="Finish"
            onPress={() => {
            this.registerNewUser()
            }
        } />
        </View>
  );
 }
}

export default SignupScreen;