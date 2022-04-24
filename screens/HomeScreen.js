import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  StackNavigator,
} from 'react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import db from '../components/FirebaseHandler';
import colors from './assets/colors/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Name from '../components/Name'


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    db.getName();
    this.state = {
      name: db.name,
    };
  }

  signOut = () => {
    //db.signOut();
    auth().signOut().then(() => console.log('User signed out!'))
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <Name></Name> 
        <TouchableOpacity
          style={styles.buttonContainer}
          title="Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText1}>Profile</Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          title="Stocks"
          onPress={() => this.props.navigation.navigate('Stocks')}
        >
          <Text style={styles.buttonText1}>Stocks</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.buttonContainer}
          title="Dashboard"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        >
          <Text style={styles.buttonText3}>Dashboard</Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          title="Finances"
          onPress={() => this.props.navigation.navigate('Finances')}
        >
          <Text style={styles.buttonText2}>Finances</Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          title="News"
          onPress={() => this.props.navigation.navigate('News')}
        >
          <Text style={styles.buttonText1}>News</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.buttonContainer2}
          title="Sign Out" 
          onPress={() => this.signOut()} 
          >
            <Text style={styles.buttonText2}>Sign Out</Text>
            </TouchableOpacity>
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
    backgroundColor: "lightgray",
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
export default HomeScreen;
