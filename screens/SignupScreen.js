import React from 'react';
  import { StyleSheet, View, Button, TextInput } from 'react-native';
  import auth from '@react-native-firebase/auth';

  class SignupScreen extends React.Component {
   constructor(){
    super();
        this.state = {
            name:'',
            email: '',
            password: ''
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
        else {
        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            res.user.updateProfile({
                name: this.state.name
            })
            console.log('New user registered successfully')
            this.setState({
                name: '',
                email: '',
                password: ''
            })
            this.props.navigation.navigate('Login')
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
        <Button title="Finish"
            onPress={() => {
            this.registerNewUser()
            {this.props.navigation.navigate('Home')}
            }
        } />
        </View>
  );
 }
}

export default SignupScreen;