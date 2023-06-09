import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Item,
  TextInput,
  StackNavigator,
  Modal, 
  Alert
} from 'react-native';
import db from '../components/FirebaseHandler';
import Transactions from '../components/Transactions'
import colors from '../assets/colors/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


/*
  Dashboard screen displays transactions of current user. Also allows users to edit existing transactions

  NOTE: the functions in this component are never called: they have been moved to the Transactions component
  in ../components/Transactions.js
*/
class DashboardScreen extends React.Component {
  constructor() {
    super();
    //trans.getTransactions();
    // db.getTransactions();
     this.state = {
       transactions: [], 
      //  modalVisible: false,
       transactionsCalled: false, 
       dates: [],
       descriptions: [],
       amounts: [], 
       categories: [],
       ids: [],
       trans: []
     };
    // console.log(db.state.trans)
  }

  // setModalVisible = (visible) => {
  //   this.setState({modalVisible: visible});
  // }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions() {
    if(this.state.transactionsCalled == true) {
      this.setState({
        transactions: []
      });
      // this.setModalVisible(true);
      //console.log(auth().currentUser.email)
      firestore().collection('Users').doc(auth().currentUser.email)
      .collection('Transactions').get()
      .then(querySnapshot => {
          querySnapshot.forEach(doc => {
              const{date, description, amount, category, id} = doc.data();
              this.state.transactions.push({
                  date, 
                  description, 
                  amount, 
                  category, 
                  id
              }); 
          });
        this.mapTransactions();
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message; 
          alert(errorMessage);
          throw error;
      });
    }
    else{
      this.setState({
        transactionsCalled: true
      });
      // this.setModalVisible(true);
      firestore().collection('Users').doc(auth().currentUser.email)
      .collection('Transactions').get()
      .then(querySnapshot => {
          querySnapshot.forEach(doc => {
              const{date, description, amount, category, id} = doc.data();
              this.state.transactions.push({
                  date, 
                  description, 
                  amount, 
                  category, 
                  id
              }); 
          });
        this.mapTransactions();
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message; 
          alert(errorMessage);
          throw error;
      });
    }
  }

 mapTransactions() {

  this.setState({
    dates: this.state.transactions.map(function(item) {
      return item['date'];
    }),
    
    descriptions: this.state.transactions.map(function(item) {
      return item['description'];
    }),

    amounts: this.state.transactions.map(function(item) {
      return item['amount'];
    }),

    categories: this.state.transactions.map(function(item) {
      return item['category'];
    }),

    ids: this.state.transactions.map(function(item) {
      return item['id'];
    }),

    trans:  this.state.transactions.map(function(item) {
      //console.log(item);
      return item
    })

  });
  console.log(this.state.trans)

  // this.state.dates = this.state.transactions.map(function(item) {
  //   return item['date'];
  // });

  // this.state.descriptions = this.state.transactions.map(function(item) {
  //   return item['description'];
  // });

  // this.state.amounts = this.state.transactions.map(function(item) {
  //   return item['amount'];
  // });

  // this.state.trans = this.state.transactions.map(function(item) {
  //   console.log(item);
  //   return item
  // });
  //console.log(this.state.transactions);
  // console.log(this.state.amounts);
  // console.log(this.state.dates);
  // console.log(this.state.descriptions)
  } 

  deleteTransaction(id) {
    const ref = firestore().collection('Users').doc(auth().currentUser.email)
      .collection('Transactions').where('id', '==', id);

    ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc);
        doc.ref.delete();
      });
    });
    console.log('Transaction deleted');
    Alert.alert('Transaction successfully deleted');
    this.getTransactions();
    // this.setModalVisible(false);
  }

 

    render() {
      return(
        <Transactions> </Transactions>
      )
    }

  // render() {
  //   // const{modalVisible} = this.state;
  //   return (
  //     <View style={{flex: 1, backgroundColor:"white", alignItems: 'center'}}>
  //       {/* <Modal
  //         animationType="slide"
  //         visible={modalVisible}
  //         presentationStyle="fullScreen"
  //         onRequestClose={() => {
  //           Alert.alert("Modal has been closed.");
  //           this.setModalVisible(!modalVisible);
  //         }}
  //         > */}
  //           <Text styles={styles.title}> Transactions: </Text>
  //           <FlatList 
  //                     data={this.state.trans}
  //                     keyExtractor={(x,i) => i}
  //                     renderItem={({item}) => 
  //                     <Text style={styles.transList}>
  //                       Category: {<Text style={styles.subtitle}>{item.category}</Text>}{"\n"}Amount: {<Text style={styles.subtitle}>{item.amount}</Text>}{"\n"}Date: {<Text style={styles.subtitle}>{item.date}</Text>}{"\n"}Description: {<Text style={styles.subtitle}>{item.description}</Text>} 
  //                       <TouchableOpacity
  //                       styles= {styles.delContainer} 
  //                       title= 'Delete' 
  //                       onPress={() => this.deleteTransaction(item.id)}
  //                       > 
  //                           <Text style={styles.delText}>Delete</Text>
  //                         </TouchableOpacity>
  //                     </Text>
  //                   }>

  //           </FlatList>
  //         {/* <TouchableOpacity
  //           style={styles.buttonContainer1}
  //           title="close"
  //               onPress={() => this.setModalVisible(!modalVisible)}
  //             >
  //               <Text style={styles.text}>Close</Text>
  //             </TouchableOpacity>  */}
           
  //         {/* </Modal> */}
  //       {/* <TouchableOpacity
  //         style={styles.transButton}
  //         onPress={() => this.getTransactions()}
  //       >
  //         <Text style={styles.text}>Show Transactions</Text>
  //       </TouchableOpacity> */}
        
  //     </View>
  //   );
  // }
}

export default DashboardScreen;

const styles = StyleSheet.create({
  delContainer: {
    width: 70,
    color: colors.primary,
    paddingHorizontal: 14, 
    left: "80%"
  },
  delText: {
    textAlign: 'center',
    justifyContent: 'center',
    //position: 'absolute',
      top: 5,
      left: 10,
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: colors.secondary,
    backgroundColor: colors.background
  },
  button: {
    color: colors.primary,
    paddingLeft: 10,

  },  
  transList: {
    color: colors.primary,
    padding: 10
  },
  titleText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 100,
    fontWeight: 'bold',
  },
  ticker: {
    fontFamily: 'sans-serif',
    fontSize: 15,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'sans-serif',
    fontSize: 13,
    color: 'grey'
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
    position: 'absolute',
      top: 580,
      left: 45,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddinghorizontal: 20,
      width: 300
  },
  transButton: {
      top: '5%',
      backgroundColor: colors.secondary,
      borderRadius: 10,
      paddingVertical: 10,
      paddinghorizontal: 20,
      width: 300
  },
  buttonContainer1: {
    position: 'absolute',
      top: 590,
      left: 45,
    elevation: 8,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 4,
    marginBottom: 4,
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
  buttonText2: {
    padding: 5,
    marginLeft: '30%',
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    color: colors.primary
  },
  text1: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    color: colors.primary,
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    color: colors.background,
  },
  modalText: {
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    height: "90%", width: "100%",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    // backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    justifyContent: 'center'
    // fontSize: 200,
   // fontWeight: "bold"
  }
});
