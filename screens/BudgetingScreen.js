import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableHighlight, TextInput, StackNavigator } from 'react-native';

class BudgetingScreen extends React.Component {
    render() {
      return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Button title="Back"
            onPress={() => this.props.navigation.navigate('Finances')}
            />
        </View>
        );
    }
    }

export default BudgetingScreen