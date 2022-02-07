import React from 'react';
  import { StyleSheet,Text, TouchableOpacity, View, Button, TextInput, Alert } from 'react-native';

import db from '../components/FirebaseHandler';
import colors from './assets/colors/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

  class SignupScreen extends React.Component {
   constructor(){
    super();
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
            db.doSignup(this.state.email, this.state.password, this.state.name, this.state.age);

            this.setState({
                name: '',
                email: '',
                password: '',
                age: ''
            })
            this.props.navigation.navigate('Login')
        }
    }

  render() {
   return (
        <View style = {styles.container}>
            <TextInput style = {styles.text}
            placeholder="Name"
            placeholderTextColor = {colors.primary}
            value = {this.state.name}
            onChangeText={(input) => this.updateInput(input, 'name')}
                />
        <TextInput style = {styles.text}
            placeholder="Email"
            placeholderTextColor = {colors.primary}
            value = {this.state.email}
            onChangeText={(input) => this.updateInput(input, 'email')}
                />
        <TextInput style = {styles.text}
            placeholder="Password"
            placeholderTextColor = {colors.primary}
            value = {this.state.password}
            onChangeText={(input) => this.updateInput(input, 'password')}
            maxLength={18}
            secureTextEntry={true}
                />
      <TextInput style = {styles.text}
           placeholder="Age"
           placeholderTextColor = {colors.primary}
           value = {this.state.age}
           onChangeText={(input) => this.updateInput(input, 'age')}
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
        elevation: 7,
        backgroundColor: colors.background,
        borderRadius: 10,
        paddingVertical: 10,
        paddinghorizontal: 14
    },
    buttonText: {
        padding: 5,
        marginLeft: '40%',
        fontFamily: "Montserrat-Medium",
        fontSize: 20,
        color: colors.secondary
    },
        button: {
        backgroundColor: colors.primary
    },
    text: {
        fontSize: 15,
        fontFamily: "Montserrat-Medium"
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