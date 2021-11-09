import React from 'react';
  import { StyleSheet, Text, View, TouchableHighlight, Button, TextInput, StackNavigator } from 'react-native';

  class LoginScreen extends React.Component {
   constructor(){
    super();
        this.state = {
                loginusername: '',
                loginpassword: '',
                isloggedin: false,
                loggedinuser: null,
        }  
      }

  render() {
   return (
    <View>
       <TextInput
           placeholder="Type here to enter username"
           placeholderTextColor = 'black'
           onChangeText={(loginusername) => this.setState({loginusername})}
            />
      <TextInput
                placeholder="Type here to enter password"
                placeholderTextColor = 'black'
                onChangeText={(loginpassword) => this.setState({loginpassword})}
            />
      <Button title="Login"
        onPress={() => {
        {this.props.navigation.navigate('Home')}
        }
      }>
      <View>
      <Text>Login</Text>
      </View>
    </Button>
  </View>
  );
 }
}

export default LoginScreen;