//profile page 
import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableHighlight, TextInput, StackNavigator, Alert } from 'react-native';
import db from '../components/FirebaseHandler'
import colors from './assets/colors/colors';

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 40,
      //paddingVertical: 10,
      backgroundColor: "white"
    },
    buttonContainer: {
      elevation: 8,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddinghorizontal: 14,
      marginBottom: 29
    },
    buttonContainer2: {
      elevation: 8,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddinghorizontal: 14,
      marginBottom: 29
    },
    buttonText1: {
      padding: 5,
      marginLeft: '40%',
      fontFamily: "Montserrat-Medium",
      fontSize: 17,
      color: colors.primary
    },
    buttonText2: {
      padding: 5,
      marginLeft: '35%',
      fontFamily: "Montserrat-Medium",
      fontSize: 17,
      color: colors.primary
    },
    buttonText3: {
      padding: 5,
      marginLeft: '33%',
      fontFamily: "Montserrat-Medium",
      fontSize: 17,
      color: colors.primary
    },
    text: {
      fontSize: 15,
      fontFamily: "Montserrat-Bold",
      height: 50, width: "100%",
      borderRadius: 5,
      paddingHorizontal: 20,
      marginLeft: '25%',
      //borderColor: 'lightgray',
      //borderWidth: 1,
      marginBottom: 20,
    }
  });
export default ProfileScreen
