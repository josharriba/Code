//profile page 
import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableHighlight, TextInput, StackNavigator, Alert } from 'react-native';
import db from '../components/FirebaseHandler'

class ProfileScreen extends React.Component {
  
deleteAccountAlert = () => {
  Alert.alert('Delete account', 'Are you sure you want to delete your account? This action cannot be undone.',
    [
      {text: 'Yes', onPress: () => this.deleteAccount()},
      {text: 'No', onPress: () => console.log('User was not deleted'),style: 'cancel'},
    ],
    {cancelable: true}
  );
}

deleteAccount = () => {
  db.deleteUser();
  this.props.navigation.navigate('Login');
}

signOut = () => {
  db.signOut();
  this.props.navigation.navigate('Login');
}

    render() {
      return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Button title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
            />
            <Button title="Stocks"
            onPress={() => this.props.navigation.navigate('Stocks')}
            />
            <Button title="Dashboard"
            onPress={() => this.props.navigation.navigate('Dashboard')}
            />
            <Button title="Sign out"
            onPress={() => this.signOut()}
            />
            <Button title="Delete Account" onPress={() => this.deleteAccountAlert()}
            />
        </View>
        );
    }
  }

export default ProfileScreen