import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableHighlight, TextInput, StackNavigator } from 'react-native';

class DashboardScreen extends React.Component {
    render() {
      return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Button title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
            />
            <Button title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
            />
            <Button title="Stocks"
            onPress={() => this.props.navigation.navigate('Stocks')}
            />
            <Button title="Finances"
            onPress={() => this.props.navigation.navigate('Finances')}
            />
        </View>
        );
    }
}

export default DashboardScreen