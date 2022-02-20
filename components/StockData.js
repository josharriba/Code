import React from 'react';
//import Plotly from 'react-native-plotly';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import colors from '../assets/colors/colors';
// import Plot from 'react-plotly.js';

class StockData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [], 
      stockSymbol: ''
    }
  }

  updateInput = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
}

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = 'ER1D6MX3FXC0EQJE';
    // let StockSymbol = 'FB';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    //need to have an alert if they enter invalid stock symbol
    // if(this.state.stockChartXValues == null) {
    //   Alert.alert("The stock symbol that you entered was invalid. Please try again!")
    // }

    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
 

        for (var key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data['Time Series (Daily)'][key]['1. open']
          );
        }
        console.log(stockChartXValuesFunction);

        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction
        });
      });
    
  }

  render() {
    if(this.state.stockSymbol == '') {
      return (
        <View style = {styles.container}>
          <TextInput 
            style={styles.buttonContainer}
            placeholder="Search for a stock by entering the stock symbol" 
            placeholderTextColor={colors.secondary}
            value = {this.state.stockSymbol} 
            onChangeText={(input) => this.updateInput(input, 'stockSymbol')}>
          </TextInput>
          <Button 
            style={styles.buttonContainer} 
            color={colors.primary}
            title="Search stock" 
            onPress={() => this.fetchStock()}>
          </Button>
        </View>
      );
    }
    else {
      return (
        <View style = {styles.container}>
        <TextInput 
          placeholder="Search for a stock by entering the stock symbol" 
          value = {this.state.stockSymbol} 
          onChangeText={(input) => this.updateInput(input, 'stockSymbol')}>
        </TextInput>
        <Button 
          style={styles.buttonContainer} 
          title="Search stock" 
          onPress={() => this.fetchStock()}>
        </Button>
        <Text style={styles.titleText}> Stock Prices {'\n'}</Text>
        <Text style={styles.ticker}> Symbol: {this.state.stockSymbol} </Text>
        <Text style={styles.subtitle}> Date: {this.state.stockChartXValues[0]}</Text>
        <Text style={styles.subtitle}> Price: {this.state.stockChartYValues[0]}</Text>
        {/* <Plotly
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{title: 'MSFT Stock Data', autosize: true}}
        /> */}
      </View>
      );
    }
    
  }
}

export default StockData;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ticker: {
    fontFamily: 'sans-serif',
    fontSize: 15,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'sans-serif',
    fontSize: 15,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white"
  },
  square: {
    width: 30,
    height: 12,
    backgroundColor: "gray"
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14
  },
  buttonText: {
    padding: 5,
    marginLeft: '40%',
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    color: colors.primary
  },
  buttonText2: {
    padding: 5,
    marginLeft: '30%',
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    color: colors.primary
  },
  text: {
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    height: 50, width: "100%",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 20,
  },
  title: {
    //marginTop: 16,
    //paddingVertical: 8,
   // borderWidth: 4,
    //borderColor: "#20232a",
    //borderRadius: 6,
    //backgroundColor: "#61dafb",
   // color: "#20232a",
    //textAlign: "center",
    //fontSize: 30,
    //fontWeight: "bold"
  }
});