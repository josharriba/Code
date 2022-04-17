//profile page 
import React from 'react';
  import { StyleSheet, Button, KeyboardAvoidingView, Text, View, TouchableOpacity, TouchableHighlight, TextInput, StackNavigator, Alert, Body } from 'react-native';
import db from '../components/FirebaseHandler'
import colors from './assets/colors/colors';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore'
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';

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
    
    // this.setState({
    //   name: nameDB,
    //   phoneNum: phoneDB, 
    //   address: addressDB, 
    // })
    // console.log(this.state.name);
    // console.log(this.state.address);
    // console.log(this.state.phoneNum);
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

  updateInputPhoneNum = (val, prop) => {
    if(this.state.digit.test(val)){
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
  }

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
      
      return(
        
        <KeyboardAwareScrollView 
        style={{ backgroundColor: 'white' }}
        contentContainerStyle={styles.container1}
        resetScrollToCoords={{ x: 0, y: 0 }}>
        <View>
        

          <Text style={styles.text}>Name: {this.state.name}</Text>
          <Text style={styles.text}>Phone Number: {this.state.phoneNum}</Text>
          <Text style={styles.text}>Address: {this.state.address}</Text>

          <TouchableOpacity 
            style={styles.buttonContainer2} 
            title="Delete Account"
            onPress={() => this.deleteAccountAlert()}
            >
              <Text style={styles.buttonText3}>Delete Account</Text>
          </TouchableOpacity>
        
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
