import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableHighlight, TextInput, StackNavigator } from 'react-native';

class HomeScreen extends React.Component {
    render() {
      return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Button title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
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
            <Button title="Profile"
            onPress={() => this.props.navigation.navigate('Profile')}
            />
        </View>
        );
    }
}

export default HomeScreen