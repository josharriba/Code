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
    this.state = {
      name: db.name, 
      phoneNum: db.phoneNum,
      address: db.address, 
      nameInput: '',
      phoneNumInput: '',
      addressInput: '',
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

  updateName() {
    db.getName();
    if(this.state.nameInput == '') {
      Alert.alert('Name cannot be empty')
    }
    firestore().collection('Users').doc(auth().currentUser.email).update({
      name: this.state.nameInput
    })
    db.getName()
    this.setState({
      name: this.state.nameInput
    })
  } 
  
  updatePhoneNum() {
    db.getPhoneNum();
    if(this.state.phoneNumInput == '') {
      Alert.alert('Phone number cannot be empty')
    }
    firestore().collection('Users').doc(auth().currentUser.email).update({
      phoneNum: this.state.phoneNumInput
    })
    db.getPhoneNum()
    this.setState({
      phoneNum: this.state.phoneNumInput
    })
  }

  updateAddress() {
    db.getAddress();
    if(this.state.addressInput == '') {
      Alert.alert('Address cannot be empty')
    }
    firestore().collection('Users').doc(auth().currentUser.email).update({
      address: this.state.addressInput
    })
    db.getAddress()
    this.setState({
      address: this.state.addressInput
    })
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

<<<<<<< HEAD
          {/* <TouchableOpacity 
            style={styles.buttonContainer} 
            title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity> */}
=======
        
>>>>>>> bd5bb100182936d193b0da24ea37eb7186c99206

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
      top: '5%',
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
      top: 22
    },
    buttonContainer: {
     //position: 'absolute',
      top: 550,
      left: 45,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddinghorizontal: 20,
      width: 300
    },
    buttonContainer1: {
      top: '5%',
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
      top: 110,
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
      top: 0,
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
      position: 'absolute',
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
