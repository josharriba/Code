import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableHighlight, TextInput, StackNavigator } from 'react-native';

import StockData from '../components/StockData'

class StocksScreen extends React.Component {
    render() {
      return(
        <View style={{flex: 1, alignItems:'center', paddingTop:20}}>
            
          <StockData />
            <Button style={styles.button} title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
            />
            <Button style={styles.button} title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
            />
            <Button style={styles.button} title="Dashboard"
            onPress={() => this.props.navigation.navigate('Dashboard')}
            />
            <Button style={styles.button} title="Finances"
            onPress={() => this.props.navigation.navigate('Finances')}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default StocksScreen