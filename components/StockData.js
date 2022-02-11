import React from 'react';
//import Plotly from 'react-native-plotly';
import {View, Text, StyleSheet} from 'react-native';
// import Plot from 'react-plotly.js';

class StockData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = 'ER1D6MX3FXC0EQJE';
    // let StockSymbol = 'FB';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=msft&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

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
    return (
      <View>
        <Text style={styles.titleText}> Stock Prices {'\n'}</Text>
        <Text style={styles.ticker}> MSFT: Microsoft </Text>
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
  }
});