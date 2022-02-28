import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableOpacity, TouchableHighlight, TextInput, StackNavigator } from 'react-native';

import StockData from '../components/StockData'
import colors from './assets/colors/colors';

class StocksScreen extends React.Component {
    render() {
      return(
        <View style={styles.container}>
            
          <StockData />
          <TouchableOpacity 
            style={styles.buttonContainer} 
            title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>
             
            {/* <TouchableOpacity
            style={styles.buttonContainer1} 
            title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
            >
               <Text style={styles.buttonText}>Login</Text>
               </TouchableOpacity>
            <TouchableOpacity
            style={styles.buttonContainer2} 
            title="Dashboard"
            onPress={() => this.props.navigation.navigate('Dashboard')}
            >
              <Text style={styles.buttonText}>Dashboard</Text>
              </TouchableOpacity>
            <TouchableOpacity
            style={styles.buttonContainer3} 
            title="Finances"
            onPress={() => this.props.navigation.navigate('Finances')}
            >
              <Text style={styles.buttonText}>Finances</Text>
              </TouchableOpacity> */}
            

        </View>
        );
    }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
    fontFamily: 'Montserrat-Medium'
  },
  buttonContainer: {
      position: 'absolute',
      top: 500,
      left: 45,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddinghorizontal: 20,
      width: 300
  },
  buttonContainer1: {
    position: 'absolute',
    top: 460,
    left: 45,
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 5,
    paddinghorizontal: 20,
    width: 300
  },
buttonContainer2: {
  position: 'absolute',
  top: 520,
  left: 45,
  backgroundColor: colors.background,
  borderRadius: 10,
  paddingVertical: 5,
  paddinghorizontal: 20,
  width: 300
},
buttonContainer3: {
  position: 'absolute',
  top: 580,
  left: 45,
  backgroundColor: colors.background,
  borderRadius: 10,
  paddingVertical: 5,
  paddinghorizontal: 20,
  width: 300
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
      button: {
      backgroundColor: colors.primary
  },
  text: {
      fontSize: 15,
      fontFamily: "Montserrat-Medium",
      height: 45, width: "100%",
      paddingHorizontal: 20,
      borderRadius: 5,
      borderBottomColor: 'lightgray',
      borderBottomWidth: 1,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginBottom: 15,
      //backgroundColor: 'lightgray'
      
  },
});


export default StocksScreen