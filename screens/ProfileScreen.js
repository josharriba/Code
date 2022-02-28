//profile page 
import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableOpacity, TouchableHighlight, TextInput, StackNavigator, Alert } from 'react-native';
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
        <View style={styles.container}>
          <Text style={styles.text}>Name: {this.state.name}</Text>
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

          <Text style={styles.text1}>Phone Number: {this.state.phoneNum}</Text>
          <TextInput 
            style={styles.textContainer}
            placeholder="update your phone number" 
            value = {this.state.phoneNumInput} 
            onChangeText={(input) => this.updateInput(input, 'phoneNumInput')}>
          </TextInput> 
          <TouchableOpacity 
            style={styles.buttonContainer1}
            color={colors.primary}
            title="Update phone number" 
            onPress={() => this.updatePhoneNum()}>
              <Text style={styles.buttonText2}>Update Phone Number</Text>
          </TouchableOpacity> 

          <Text style={styles.text2}>Address: {this.state.address}</Text>
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

          <TouchableOpacity 
            style={styles.buttonContainer} 
            title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonContainer2} 
            title="Delete Account"
            onPress={() => this.deleteAccountAlert()}
            >
              <Text style={styles.buttonText3}>Delete Account</Text>
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
        );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center', 
      backgroundColor: "white", 
      justifyContent:'center'
      
      //paddingVertical: 10,
    },
    textContainer: {
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
      marginBottom: 20
    },
    buttonContainer: {
      position: 'absolute',
      top: 600,
      left: 45,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddinghorizontal: 20,
      width: 300
    },
    buttonContainer1: {
      elevation: 8,
      backgroundColor: colors.secondary,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginTop: 4,
      marginBottom: 4
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
      position: 'absolute',
      top: 130,
      left: 35,
      elevation: 2,
      backgroundColor: "darkred",
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 10,
      marginBottom: 0
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
      position: 'absolute',
      top: 20,
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
    text1: {
      position: 'absolute',
      top: 50,
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
      position: 'absolute',
      top: 80,
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
