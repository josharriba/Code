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
  constructor() {
    super();
    this.name = '';
  }

  signOut = () => {
    db.signOut();
    this.props.navigation.navigate('Login');
  };

  render() {
    this.name = db.getName();
    return (
      <View
        style={{
          padding: 10,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text {...this.name} />
        <Button title="Sign Out" onPress={() => () => this.signOut()} />
        <Button
          title="Stocks"
          onPress={() => this.props.navigation.navigate('Stocks')}
        />
        <Button
          title="Dashboard"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
        <Button
          title="Finances"
          onPress={() => this.props.navigation.navigate('Finances')}
        />
        <Button
          title="Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />

        <Button
          title="News"
          onPress={() => this.props.navigation.navigate('News')}
        />
      </View>
    );
  }
}

export default HomeScreen;
