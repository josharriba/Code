import React from 'react';
  import { StyleSheet, View, Button, TextInput, } from 'react-native';
  import auth from '@react-native-firebase/auth';

  class LoginScreen extends React.Component {
   constructor(){
    super();
        this.state = {
          email: '',
          password: ''
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
        auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res)
          console.log('User logged in successfully')
          this.setState({
            email: '', 
            password: ''
          })
          this.props.navigation.navigate('Home')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
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
        {this.props.navigation.navigate('Home')}
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