//profile page 
import React from 'react';
  import { StyleSheet, Button, KeyboardAvoidingView, Text, View, TouchableOpacity, TouchableHighlight, TextInput, StackNavigator, Alert, Body } from 'react-native';
import db from '../components/FirebaseHandler'
import colors from './assets/colors/colors';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore'
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';

/*
  Profile Screen
  We allow users to view and edit their name, address, and phone number
  We also allow users to sign out or delete their account
*/
class ProfileScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      name: db.name, 
      phoneNum: db.phoneNum,
      address: db.address, 
      nameInput: '',
      phoneNumInput: '',
      addressInput: '',
      digit: /^[0-9\b]+$/
    }
  }

  /*
    Gets the data for the current user when component mounts
  */
  componentDidMount() {
    userList = firestore().collection('Users');
    userList.doc(auth().currentUser.email)
        .get()
        .then(documentSnapshot => {
           this.setState({
             name: documentSnapshot.data().name
           }) 
        });
    userList.doc(auth().currentUser.email)
        .get()
        .then(documentSnapshot => {
            this.setState({
              phoneNum: documentSnapshot.data().phoneNum
            }) 
        })

    userList.doc(auth().currentUser.email)
        .get()
        .then(documentSnapshot => {
            this.setState({
              address: documentSnapshot.data().address
            })
        })
  }
  
  /*
    This function runs when the user clicks the deleteAccount button. They will 
    first be prompted asking if they would like to delete their account 
    before proceeding
  */
  deleteAccountAlert = () => {
    Alert.alert('Delete account', 'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {text: 'Yes', onPress: () => this.deleteAccount()},
        {text: 'No', onPress: () => console.log('User was not deleted'),style: 'cancel'},
      ],
      {cancelable: true}
    );
  }

  /*
    This function runs when the user clicks the signout button. They will
    first be prompted asking if they would like to signout before proceeding
  */
  signOutAlert = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?',
      [
        {text: 'Yes', onPress: () => this.signOut()},
        {text: 'No', onPress: () => console.log('user not signed out'),style: 'cancel'},
      ],
      {cancelable: true}
    );
  }

  /*
    If user wishes to delete account, FirebaseHander will run deleteAccount funciton
    which will delete the user from firebase auth and firestore use data
  */
  deleteAccount = () => {
    db.deleteUser();
    this.props.navigation.navigate('Login');
  }

  /*
    If the user wishes to sign out, FirebaseHandler will run signOut function
    which will sign the current user out using firebase auth
  */
  signOut = () => {
    db.signOut();
    this.props.navigation.navigate('Login');
  }

  /*
    Update input for text input
  */
  updateInput = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  /*
    Update input for phone numbers
    we require users to enter only digits, so we check 
   that the input is indeed a digit using the digit 
   regex state variable
  */
  updateInputPhoneNum = (val, prop) => {
    if(this.state.digit.test(val)){
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
  }

  /*
    Updates the name of the current user if input is non-empty
    This function runs when the user clicks update name button
    New data will be saved in firestore database in same location as old name
  */
  updateName() {
    db.getName();
    if(this.state.nameInput == '') {
      Alert.alert('Name cannot be empty')
    }
    else {
      firestore().collection('Users').doc(auth().currentUser.email).update({
        name: this.state.nameInput
      })
      db.getName()
      this.setState({
        name: this.state.nameInput
      })
    }
  } 
  
   /*
    Updates the phone number of the current user if input is non-empty
    This function runs when the user clicks update phone number button
    New data will be saved in firestore database in same location as old phone num if one exists
    or will create new field for phone number in user data
  */
  updatePhoneNum() {
    db.getPhoneNum();
    if(this.state.phoneNumInput == '') {
      Alert.alert('Phone number cannot be empty')
    }
    else{
      firestore().collection('Users').doc(auth().currentUser.email).update({
        phoneNum: this.state.phoneNumInput
      })
      db.getPhoneNum()
      this.setState({
        phoneNum: this.state.phoneNumInput
      })
    }
  }

   /*
    Updates the address of the current user if input is non-empty
    This function runs when the user clicks update address button
    New data will be saved in firestore database in same location as old address if one exists
    or will create new field for address in user data
  */
  updateAddress() {
    db.getAddress();
    if(this.state.addressInput == '') {
      Alert.alert('Address cannot be empty')
    }
    else{
      firestore().collection('Users').doc(auth().currentUser.email).update({
        address: this.state.addressInput
      })
      db.getAddress()
      this.setState({
        address: this.state.addressInput
      })
    }
  }

    render() {
      /*
        Render current name, address and phone number,
                delete account button, signout button,
                text fields and buttons to update data
      */
      return(
        
        <KeyboardAwareScrollView 
        style={{ backgroundColor: 'white' }}
        contentContainerStyle={styles.container1}
        resetScrollToCoords={{ x: 0, y: 0 }}>
        <View>
        

          <Text style={styles.text}>Name: {this.state.name}</Text>
          <Text style={styles.text}>Phone Number: {this.state.phoneNum}</Text>
          <Text style={styles.text}>Address: {this.state.address}</Text>

          <View style={{flexDirection:'row'}}> 

            <TouchableOpacity 
              style={styles.buttonContainer2} 
              title="Delete Account"
              onPress={() => this.deleteAccountAlert()}
              >
                <Text style={styles.buttonText3}>Delete Account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.buttonContainer2} 
              title="Sign out"
              onPress={() => this.signOutAlert()}
              >
                <Text style={styles.buttonText3}>Sign Out</Text>
            </TouchableOpacity>

          </View>
        
          <TextInput 
            style={styles.textContainer}
            placeholder="update your name" 
            value = {this.state.nameInput} 
            onChangeText={(input) => this.updateInput(input, 'nameInput')}>
          </TextInput>
          <TouchableOpacity 
            style={styles.buttonContainer1}
            color={colors.primary}
            title="Update name" 
            onPress={() => this.updateName()}>
              <Text style={styles.buttonText2}>Update Name</Text>
          </TouchableOpacity>

          
          <TextInput 
            style={styles.textContainer}
            placeholder="update your phone number" 
            value = {this.state.phoneNumInput} 
            keyboardType="numeric"
            onChangeText={(input) => this.updateInputPhoneNum(input, 'phoneNumInput')}>
          </TextInput> 
          <TouchableOpacity 
            style={styles.buttonContainer1}
            color={colors.primary}
            title="Update phone number" 
            onPress={() => this.updatePhoneNum()}>
              <Text style={styles.buttonText2}>Update Phone Number</Text>
          </TouchableOpacity> 

          
          <TextInput 
            style={styles.textContainer}
            placeholder="update your address" 
            value = {this.state.addressInput} 
            onChangeText={(input) => this.updateInput(input, 'addressInput')}>
          </TextInput>
          <TouchableOpacity 
            style={styles.buttonContainer1}
            color={colors.primary}
            title="Update address" 
            onPress={() => this.updateAddress()}>
              <Text style={styles.buttonText2}>Update Address</Text>
          </TouchableOpacity>

      
            {/* <Button title="Stocks"
            onPress={() => this.props.navigation.navigate('Stocks')}
            />
            <Button title="Dashboard"
            onPress={() => this.props.navigation.navigate('Dashboard')}
            />
            <Button title="Sign out"
            onPress={() => this.signOut()}
            />
            <Button title="Delete Account" onPress={() => this.deleteAccountAlert()}
            /> */}

    
        </View>
        </KeyboardAwareScrollView>
        
        );
    }
  }

  const styles = StyleSheet.create({
    
    container1: {
     flex: 1,
      padding: 15,
      justifyContent: 'center',
      backgroundColor: "white", 
      //marginBottom: 0,
      marginTop: -110,
    },
    textContainer: {
      top: '10%',
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 14,
      fontFamily: "Montserrat-Medium",
      height: 50, width: "100%",
      borderRadius: 5,
      paddingHorizontal: 20,
      borderBottomColor: 'lightgray',
      borderBottomWidth: .8,
      borderBottomLeftRadius: 100,
      borderBottomRightRadius: 100,
      marginBottom: 20,
    },
    buttonContainer: {
     position: 'absolute',
      top: 550,
      left: 45,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddinghorizontal: 20,
      width: 300,
      marginBottom: 30
    },
    buttonContainer1: {
      //position: 'absolute',
      top: '10%',
      elevation: 8,
      marginLeft: '14%',
      backgroundColor: colors.secondary,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginTop: 4,
      marginBottom: 4,
      width: 260
    },
    buttonText: {
      textAlign: 'center',
      justifyContent: 'center',
        padding: 5,
        //marginLeft: '40%',
        fontFamily: "Montserrat-Medium",
        fontSize: 20,
        color: colors.primary
    },
    buttonContainer2: {
      //position: 'absolute',
      top: '5%',
      //left: 35,
      elevation: 7,
      backgroundColor: "darkred",
      borderRadius: 10,
      paddingVertical: 2,
      paddingHorizontal: 3,
      // marginBottom: 0,
      width: 80
    },
    buttonContainer3: {
      //position: 'absolute',
      top: '7%',
      //left: 35,
      elevation: 7,
      backgroundColor: "darkred",
      borderRadius: 10,
      paddingVertical: 2,
      paddingHorizontal: 3,
      // marginBottom: 0,
      width: 80
    },
    buttonText1: {
      padding: 5,
      marginLeft: '40%',
      fontFamily: "Montserrat-Medium",
      fontSize: 17,
      color: colors.primary
    },
    buttonText2: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontFamily: "Montserrat-Medium",
        color: colors.background,
        //marginLeft: '30%'
    },
    buttonText3: {
      textAlign: 'center',
      justifyContent: 'center',
      padding: 2,
      //marginLeft: '33%',
      fontFamily: "Montserrat-Medium",
      fontSize: 11,
      color: "white"
    },
    text: {
     // position: 'absolute',
      alignItems: 'flex-start',
      marginTop: 7,
      //textAlign: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontFamily: "Montserrat-SemiBold",
      paddingHorizontal: 10,
      marginLeft:'0%'
    },
    text1: {
      //position: 'absolute',
      top: 30,
      marginTop: 20,
      //textAlign: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontFamily: "Montserrat-SemiBold",
      height: 40, width: "100%",
      borderRadius: 5,
      paddingHorizontal: 20,
      marginLeft:'30%'
    },
    text2: {
      //position: 'absolute',
      top: 60,
      marginTop: 20,
      //textAlign: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontFamily: "Montserrat-SemiBold",
      height: 40, width: "100%",
      borderRadius: 5,
      paddingHorizontal: 20,
      marginLeft:'30%'
    }
  });
export default ProfileScreen
