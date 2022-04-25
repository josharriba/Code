import React from 'react';
import Plot from 'react-native-plotly';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert, Modal, FlatList} from 'react-native';
import colors from '../assets/colors/colors';
import db from './FirebaseHandler'
// import Plot from 'react-plotly.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

/*
      Stock data component to deal with all alpha vantage api calls as well as 
      the users favorite stocks
*/
class StockData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [], 
      stockSymbol: '', 
      favorites: [], 
      modalVisible: false,
      favoritesCalled: false, 
      timeSeriesType: '', 
      favoriteList: '', 
      search: false, 
    }
  }
  

  /*
      if it is valid, this will invoke the firebase handler to add the 
      stock symbol to favorites
  */
  addFavorite() {
    console.log(this.state.stockChartXValues.length)
    if(this.state.stockChartXValues.length == 0) {
      Alert.alert("The stock symbol you entered is invalid")
    }
    else{
      db.addFavoriteStock(this.state.stockSymbol);
    }
    
  }

  updateInput = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
}

/*
  clear the state variables for the stock symbol and stock data
  when the component mounts
*/
  componentDidMount() {
    this.setState({
      search: false,
      stockSymbol: '',
      stockChartYValues: [],
      stockCharYValues: []
    });
  }

  /*
      makes the api call and gets the stock prices for the 
      stock symbol that the user entered
  */
  fetchStock() {
    const pointerToThis = this;
    //console.log(pointerToThis);
    const API_KEY = 'ER1D6MX3FXC0EQJE';
    // let StockSymbol = 'FB';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       // console.log(data);
 

        for (var key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data['Time Series (Daily)'][key]['1. open']
          );
        }
        //console.log(stockChartXValuesFunction);

        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction, 
          timeSeriesType: 'Daily',
          search: true
        });
      });
    
  }

  render() {
    /*
        if the user hasn't searched anything, we only allow them
        to enter stock symbol to search
    */
    if(this.state.search == false || this.state.stockChartXValues == []) {
      return (
        <View style = {styles.container}>
          <TextInput 
            style={styles.textContainer}
            placeholder="Enter stock symbol. (i.e. 'MSFT')" 
            placeholderTextColor={"lightgrey"}
            value = {this.state.stockSymbol} 
            onChangeText={(input) => this.updateInput(input, 'stockSymbol')}>
          </TextInput>
          <TouchableOpacity 
            style={styles.buttonContainer1} 
            color={colors.primary} 
            onPress={() => this.fetchStock()}>
              <Text style={styles.text}>Search Stock</Text>
          </TouchableOpacity>
        </View>
      );
    }
    /*
      if the user searches for a stock and a stock api call 
      is made, then we change what is returned/displayed
    */
    else {
      return (
        <View style = {styles.container}>
          <TouchableOpacity 
            style={styles.stockContainer} 
            >
          </TouchableOpacity>
      
        <TextInput 
          placeholder="Enter stock symbol. (i.e. 'MSFT')"
          value = {this.state.stockSymbol} 
          onChangeText={(input) => this.updateInput(input, 'stockSymbol')}>
        </TextInput>
        <TouchableOpacity 
          style={styles.buttonContainer1} 
          title="Search stock" 
          onPress={() => this.fetchStock()}>
            <Text style={styles.text}>Search Stock</Text>
        </TouchableOpacity>
        
          {/*
            We use the plotly library to plot the stock data
            the range selector buttons allow users to 
            select a date range for viewing the price of the stock
        */}
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: colors.primary},
              name: this.state.stockSymbol, 
            }
          ]}
          layout={{
            title: this.state.stockSymbol,  
            xaxis: {
              autorange: true,  
              rangeselector: {buttons: [
                {
                  count: 1,
                  label: '1 month',
                  step: 'month',
                  stepmode: 'backward'
                },
                {
                  count: 6,
                  label: '6 month',
                  step: 'month',
                  stepmode: 'backward'
                },
                {
                  count: 12,
                  label: '1 year',
                  step: 'month',
                  stepmode: 'backward'
                },
                {step: 'all'}
              ]},
            }, 
            yaxis: {
              autorange: true
            }  
          }}
        /> 
        <TouchableOpacity 
          style={styles.buttonContainer1}  
          onPress={() => this.addFavorite()}>
            <Text style={styles.text}>Add to Favorites</Text>
        </TouchableOpacity>

      </View>
      );
    }
    
  }
}

export default StockData;

const styles = StyleSheet.create({
  titleText: {
    marginTop: 15,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    //fontWeight: 'bold',
  },
  ticker: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    //fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Light',
    fontSize: 15,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white"
  },
  favContainer: {
    //position: 'absolute',
      //top: 40,
     left: 40,
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
    //padding: 10,
    backgroundColor: "white",
    width: 300
  },
  textContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    height: 35, width: "100%",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10
  },
  buttonContainer: {
    elevation: 8,
    color: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14
  },
  delContainer: {
    //width: 70,
    elevation: 8,
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 4,
    marginBottom: 4
  },
  buttonContainer1: {
    elevation: 8,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginTop: 4,
    marginBottom: 4
  },
  closeContainer: {
    //position: 'absolute',
      //top: "0%",
      //left: 75,
    justifyContent: 'center',
    elevation: 8,
    alignSelf:'center',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginTop: 4,
    marginBottom: 4,
    width: 250,
    height: 40
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
  stockContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    paddinghorizontal: 20,
    width: 300
  },
  homeText: {
    textAlign: 'center',
    justifyContent: 'center',
      padding: 5,
      //marginLeft: '40%',
      fontFamily: "Montserrat-Medium",
      fontSize: 20,
      color: colors.primary
  },
  buttonText: {
    //textAlign: 'center',
    //alignContent: 'flex',
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
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    color: colors.background,
    //marginLeft: '30%'
  },
  delText: {
    textAlign: 'center',
    justifyContent: 'center',
    //position: 'absolute',
      top: 5,
      left: 10,
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    color: colors.secondary,
    backgroundColor: colors.background
    
  },
  text1: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    color: colors.background,
    //marginLeft: '30%'
  },
  favText: {
    //position: 'absolute',
      top: -5,
      //left: 150,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
    color: colors.primary,
    //marginLeft: '30%'
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