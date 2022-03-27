import React from 'react';
import Plot from 'react-native-plotly';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert, Modal} from 'react-native';
import colors from '../assets/colors/colors';
import db from './FirebaseHandler'
// import Plot from 'react-plotly.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

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
      timeSeriesType: ''
    }
  }
  

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  addFavorite() {
    db.addFavoriteStock(this.state.stockSymbol);
  }

  getFavoriteStocks() {
    if(this.state.favoritesCalled == true) {
      this.setState({
        favorites: []
      });
      this.setModalVisible(true);
      firestore().collection('Users').doc(auth().currentUser.email)
      .collection('Favorite Stocks').get()
      .then(querySnapshot => {
          querySnapshot.forEach(doc => {
              const{symbol} = doc.data();
    
              this.setState({
                favorites: this.state.favorites.concat(symbol)
              })

              // this.state.favorites.push({
              //     symbol
              // }); 
          });
          console.log(this.state.favorites);
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message; 
          alert(errorMessage);
          throw error;
      });
     // this.mapFavorites();
    }
    else {
      this.setState({
        favoritesCalled: true
      });
      
      this.setModalVisible(true);
      firestore().collection('Users').doc(auth().currentUser.email)
      .collection('Favorite Stocks').get()
      .then(querySnapshot => {
          querySnapshot.forEach(doc => {
              const{symbol} = doc.data();
               console.log(symbol)
              this.setState({
                favorites: this.state.favorites.concat(symbol)
              })

              // this.state.favorites.push({
              //     symbol
              // }); 
          });
          console.log(this.state.favorites);
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message; 
          alert(errorMessage);
          throw error;
      });
      //this.mapFavorites();
      this.setState({
        favoriteList: this.state.favorites
      })
    }
  }

  mapFavorites() {
    this.setState({
      favoriteList: this.state.favorites.map(function(item) {
      return item['symbol'];
    })
     })

    // this.state.favoriteList = this.state.favorites.map(function(item) {
    //   return item['symbol'];
    // });
   console.log(this.state.favoriteList);
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
    //console.log(pointerToThis);
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
       // console.log(data);
 

        for (var key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data['Time Series (Daily)'][key]['1. open']
          );
        }
        console.log(stockChartXValuesFunction);

        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction, 
          timeSeriesType: 'Daily'
        });
      });
    
  }

  render() {
    const {modalVisible} = this.state;
    if(this.state.stockSymbol == '') {
      return (
        <View style = {styles.container}>
          <Modal
          animationType="slide"
          visible={modalVisible}
          presentationStyle="fullScreen"
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
          >
            <Text styles={styles.title}> Favorites:</Text>
            <Text style={styles.modalText}> 
              {JSON.stringify(this.state.favorites)}</Text>
            
            <TouchableOpacity
            style={styles.buttonContainer1}
            title="close"
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
           
          </Modal>
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
          <TouchableOpacity 
            style={styles.buttonContainer1} 
            title="Show my favorite stocks" 
            onPress={() => this.getFavoriteStocks()}>
              <Text style={styles.text}>Show Favorites</Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View style = {styles.container}>
          
          <Modal
          animationType="slide"
          visible={modalVisible}
          presentationStyle="fullScreen"
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
          >
            <Text styles={styles.title}> Favorites:</Text>
            <Text style={styles.modalText}> 
              {JSON.stringify(this.state.favorites)}</Text>
            
            <TouchableOpacity
            style={styles.buttonContainer1}
            title="close"
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
           
          </Modal>
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
                  label: '1 week',
                  step: 'week',
                  stepmode: 'backward'
                },
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
        <TouchableOpacity 
          style={styles.buttonContainer1} 
          onPress={() => this.getFavoriteStocks()}>
            <Text style={styles.text}>Show Favorites</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}> Stock Prices {'\n'}</Text>
        <Text style={styles.ticker}> Symbol: {this.state.stockSymbol} </Text>
        <Text style={styles.subtitle}> Date: {this.state.stockChartXValues[0]}</Text>
        <Text style={styles.subtitle}> Price: {this.state.stockChartYValues[0]}</Text>
       
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
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14
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