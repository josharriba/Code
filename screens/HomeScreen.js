import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  StackNavigator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import db from '../components/FirebaseHandler';

class HomeScreen extends React.Component {  
  constructor(props) {
    super(props);
    db.getName(); 
    this.state= {
      name: db.name
    } 
  }

  signOut = () => {
    db.signOut();
    this.props.navigation.navigate('Login');
  };

  

    render() {
      return(
        <View style={{padding:5, flex: 1, alignItems:'center'}}> 
          <Text style={{fontSize: 20, fontWeight: 'bold', padding:50 }}>  
            Welcome, {this.state.name} !
          </Text>
            <Button title="Profile"
            onPress={() => this.props.navigation.navigate('Profile')}
            /> 
            <Button title="Stocks"
            onPress={() => this.props.navigation.navigate('Stocks')}
            />
            <Button title="Dashboard"
            onPress={() => this.props.navigation.navigate('Dashboard')}
            />
            <Button title="Finances"
            onPress={() => this.props.navigation.navigate('Finances')}
            />
            <Button
          title="News"
          onPress={() => this.props.navigation.navigate('News')}
             <Button title="Sign Out"
            onPress={() => () => this.signOut()}
            />
        </View>
        );
    }
}

export default HomeScreen;
