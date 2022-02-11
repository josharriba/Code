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
import Transactions from '../components/Transactions'

class DashboardScreen extends React.Component {
  constructor() {
    super();
    //trans.getTransactions();
    // db.getTransactions();
    // this.state = {
    //   transactions: toString(db.state.trans)
    // };
    // console.log(db.state.trans)
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Recent Transactions: {toString(db.state.trans)}
        </Text> */}
        <Transactions/> 
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
