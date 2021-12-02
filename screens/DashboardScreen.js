import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  Item,
  TextInput,
  StackNavigator,
} from 'react-native';
import db from '../components/FirebaseHandler';

class DashboardScreen extends React.Component {
  transactions = db.getTransactions();
  render() {
    {
      transactions;
    }
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Stocks"
          onPress={() => this.props.navigation.navigate('Stocks')}
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

export default DashboardScreen;
