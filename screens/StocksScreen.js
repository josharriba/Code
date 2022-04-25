import React from 'react';
  import { StyleSheet, Button, Text, View, TouchableOpacity, TouchableHighlight, TextInput, StackNavigator } from 'react-native';

import StockData from '../components/StockData'
import colors from './assets/colors/colors';

/*
  This is our main stocks screen. It renders the StockData component from ../components/StockData.js
  We also have a button to allow users to navigate to their favorites stock page, which
  is another screen/component located in ../components/FavoriteStocks.js
*/
class StocksScreen extends React.Component {
    render() {
      return(
        <View style={styles.container}>
            
          <StockData />
          <TouchableOpacity 
            style={styles.buttonContainer2} 
            title="Show my favorite stocks" 
            onPress={() => this.props.navigation.navigate('FavoriteStocks')}>
              <Text style={styles.text}>Show Favorites</Text>
          </TouchableOpacity>           

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
    top: "95%",
    left: 45,
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 5,
    paddinghorizontal: 20,
    width: 300
  },
buttonContainer2: {
  top: 5,
  elevation: 8,
  backgroundColor: colors.secondary,
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 14,
  marginTop: 4,
  marginBottom: 4
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
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    color: colors.background,      
  },
});


export default StocksScreen