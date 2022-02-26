//profile page 
import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableHighlight, TextInput, StackNavigator, Alert } from 'react-native';
import db from '../components/FirebaseHandler'
import colors from './assets/colors/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';

class ProfileScreen extends React.Component {

  constructor() {
    super();
    db.getName();
    db.getPhoneNum();
    db.getAddress();
    this.state = {
      name: db.name, 
      phoneNum: db.phoneNum,
      address: db.address
    }
  }

  componentDidMount() {
    db.getName();
    db.getAddress();
    db.getPhoneNum();
    this.setState({
      name: db.name,
      phoneNum: db.phoneNum, 
      address: db.address, 
    })
  }
  
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

  updateInput = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateName() {
    if(this.state.nameInput == '') {
      Alert.alert('Name cannot be empty')
    }
    firestore().collection('Users').doc(auth().currentUser.email).update({
      name: this.state.nameInput
    })
    db.getName()
    this.state.name = db.name
  } 
  
  updatePhoneNum() {
    if(this.state.phoneNumInput == '') {
      Alert.alert('Phone number cannot be empty')
    }
    firestore().collection('Users').doc(auth().currentUser.email).update({
      phoneNum: this.state.phoneNumInput
    })
    db.getPhoneNum()
    this.state.phoneNum = db.phoneNum
  }

  updateAddress() {
    if(this.state.addressInput == '') {
      Alert.alert('Address cannot be empty')
    }
    firestore().collection('Users').doc(auth().currentUser.email).update({
      address: this.state.addressInput
    })
    db.getAddress()
    this.state.address = db.address
  }

    render() {
      return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.text}>Name: {this.state.name}</Text>
          <TextInput 
            style={styles.buttonContainer}
            placeholder="Update your name" 
            placeholderTextColor={colors.secondary}
            value = {this.state.nameInput} 
            onChangeText={(input) => this.updateInput(input, 'nameInput')}>
          </TextInput>
          <Button 
            color={colors.primary}
            title="Update name" 
            onPress={() => this.updateName()}>
          </Button>

          <Text style={styles.text}>Phone Number: {this.state.phoneNum}</Text>
          <TextInput 
            style={styles.buttonContainer}
            placeholder="Update your phone number" 
            placeholderTextColor={colors.secondary}
            value = {this.state.phoneNumInput} 
            onChangeText={(input) => this.updateInput(input, 'phoneNumInput')}>
          </TextInput> 
          <Button 
            color={colors.primary}
            title="Update phone number" 
            onPress={() => this.updatePhoneNum()}>
          </Button> 

          <Text style={styles.text}>Address: {this.state.address}</Text>
          <TextInput 
            style={styles.buttonContainer}
            placeholder="Update your address" 
            placeholderTextColor={colors.secondary}
            value = {this.state.addressInput} 
            onChangeText={(input) => this.updateInput(input, 'addressInput')}>
          </TextInput>
          <Button 
            color={colors.primary}
            title="Update address" 
            onPress={() => this.updateAddress()}>
          </Button>

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
      paddingVertical: 7,
      paddingHorizontal: 14,
      marginBottom: 7
    },
    buttonContainer2: {
      elevation: 8,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
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
      
    }
  });
export default ProfileScreen
