import React, {useState, useEffect} from 'react';
import Plot from 'react-native-plotly';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert, Modal, FlatList} from 'react-native';
import colors from '../assets/colors/colors';
import db from './FirebaseHandler'
// import Plot from 'react-plotly.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import {useNavigation} from '@react-navigation/native'


export default function FavoriteStocks() {
    const [favorites, setFavorites] = useState([]);
    const [xValues, setxValues] = useState([]);
    const [yValues, setyValues] = useState([]);
    const [currentSymbol, setCurrentSymbol] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    /*
        function to get the current user's favorite stocks
        we use the use effect so the favorite stocks are
        updated automatically with any changes that are made
    */
    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(auth().currentUser.email)
        .collection('Favorite Stocks')
        .onSnapshot(querySnapshot => {
            const favs = [];
            querySnapshot.forEach(doc => {
                const{symbol} = doc.data();
                favs.push(symbol);
            });
                setFavorites(favs);
            })
            return () => subscriber();
          }, []);

    /*
        funciton to delete the stock from the user's favorites
        deletes based on the symbol
    */
    function deleteFavorite(symbol) {
        const ref = firestore().collection('Users').doc(auth().currentUser.email)
          .collection('Favorite Stocks').where('symbol', '==', symbol);
    
        ref.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
        console.log('Favorite deleted');
        Alert.alert('Favorite successfully deleted');
      }

    /*
      this function prepares the stock api to be called, 
      calls the stock api to fetch the data 
      and then brings up the graph of the stock in a modal popup
    */
    function viewPrice(symbol) {
        setCurrentSymbol(symbol);
        setxValues([]);
        setyValues([]);
        fetchStock();
        setModalVisible(true);
    }

    /*
        This is a funciton to fetch stock data of user-specified stocksssssssssssss
        it uses alphavantage api to fetch stock data.
    */
    function fetchStock() {
        const API_KEY = 'ER1D6MX3FXC0EQJE';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${currentSymbol}&outputsize=compact&apikey=${API_KEY}`;
        const x = [];
        const y = [];
        fetch(API_Call)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            for (var key in data['Time Series (Daily)']) {
              x.push(key);
              y.push(
                data['Time Series (Daily)'][key]['1. open']
              );
            }
            setxValues(x)
            setyValues(y)
          });
      }

    return(
        <View style={{backgroundColor: 'white'}}>
            <Text style={styles.favText}>Favorites:</Text>
            <TouchableOpacity 
                  style= {styles.backCont} 
                  onPress={() => navigation.navigate("Stocks")}
                   > 
                <Text style={styles.closeText}>Back to Stock Screen</Text>
              </TouchableOpacity>

            <FlatList 
                      contentContainerStyle={{paddingBottom: 50, paddingTop:10}}
                      data={favorites}
                      keyExtractor={item => item.id}
                      scrollEnabled={true}
                      renderItem={({item}) => 
                      <View style={{padding:5, borderBottomWidth: 5, backgroundColor: 'white', 
                                    borderBottomColor: colors.secondary}}>
                      <Text style={styles.text1}>
                        Symbol: {item}
                        </Text>
                        <TouchableOpacity 
                        styles= {styles.delContainer} 
                        onPress={() => deleteFavorite(item)}
                        > 
                        <Text style={styles.delText}>Delete</Text>
                          </TouchableOpacity>
                          <TouchableOpacity 
                        styles= {styles.viewContainer} 
                        onPress={() => viewPrice(item)}
                        > 
                        <Text style={styles.viewText}>View Price</Text>
                          </TouchableOpacity>
                      </View>
                  
                    }>
            </FlatList>

        <Modal
        animationType="slide"
        visible={modalVisible}
        presentationStyle="fullScreen"
        onRequestClose={() => {
            setModalVisible(!modalVisible)
        }}>
        
            <Plot
            data={[
                {
                x: xValues,
                y: yValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: colors.primary},
                name: currentSymbol, 
                }
            ]}
            layout={{
                title: currentSymbol,  
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
                style={styles.closeContainer}
                title="close"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
        
        </Modal>             

        </View>
    )
}

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
      alignSelf: 'center',
    
      flex: 1,
      //padding: 10,
      backgroundColor: "",
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
      marginBottom: 4, 
      width: 50, 
      alignSelf: 'center'
    },
    viewContainer: {
        //width: 70,
        alignSelf: 'center',
        elevation: 8,
        backgroundColor: colors.background,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
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
        //top: 5,
        //elevation: 8,
        backgroundColor: colors.secondary,
      },
    closeText: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontFamily: "Montserrat-Medium",
        color: colors.background,  
        paddingVertical: 5,
    },
    backCont: {
      alignSelf: 'center',
      eleveation: 4,
      backgroundColor: colors.secondary,
      borderColor: 'black',
      width: 300,
      borderRadius: 5,
    },
    buttonContainer2: {
      position: 'absolute',
        top: 100,
        left: 45,
      elevation: 8,
      backgroundColor: colors.secondary,
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 14,
      marginTop: 4,
      marginBottom: 4
    },
    stockContainer: {
      alignSelf: 'center',
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
      alignSelf: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      //position: 'absolute',
        top: 5,
        left: 10,
      fontSize: 15,
      fontFamily: "Montserrat-Medium",
      color: colors.secondary,
      backgroundColor: colors.background,
      width: 300
    },
    viewText: {
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        //position: 'absolute',
          top: 5,
          left: 10,
        fontSize: 15,
        fontFamily: "Montserrat-Medium",
        color: colors.secondary,
        backgroundColor: colors.background,
        width: 300
      },
    text1: {
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontFamily: "Montserrat-Medium",
      color: colors.primary,
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