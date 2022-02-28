import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        trans: [], 
        dates: [], 
        amounts: [], 
        descriptions: []
    }
  }

  componentDidMount() {
    this.getTransactions();
  }

//   getTransactions() {
//     //console.log(auth().currentUser.email)
//     firestore().collection('Users').doc(auth().currentUser.email)
//      .collection('Transactions').get()
//      .then(querySnapshot => {
//          querySnapshot.forEach(doc => {
//              const{date, description, amount} = doc.data();
//              this.state.trans.push({
//                  date, 
//                  description, 
//                  amount
//              }); 
//          });
//          //this.state.trans = transactions;
//          // this.setState({
//          //     trans: transactions,
//          // });
//        //console.log(this.state.trans);
//        this.mapTransactions();
//      })
//      .catch((error) => {
//          const errorCode = error.code;
//          const errorMessage = error.message; 
//          alert(errorMessage);
//          throw error;
//      });
//      //console.log(transactions);
//      //this.mapTransactions();
//  }

//  mapTransactions() {
//   this.state.dates = this.state.trans.map(function(item) {
//     return item['date'];
//   });

//   this.state.descriptions = this.state.trans.map(function(item) {
//     return item['description'];
//   });

//   this.state.amounts = this.state.trans.map(function(item) {
//     return item['amount'];
//   });
//   console.log(this.state.amounts);
//   console.log(this.state.dates);
//   console.log(this.state.descriptions)
//   //console.log(this.state.trans)
//   //console.log(this.state.transaction);
// }
 
  render() {
    if(this.state.trans == []) {
      return (
        <View>
          <Text> Transactions: </Text>
          <Text> Date: {JSON.stringify(this.state.dates)}</Text> 
          <Text> Descriptions: {JSON.stringify(this.state.descriptions)}</Text> 
          <Text> Amount: {JSON.stringify(this.state.amounts)}</Text> 
        </View>
      );
    }
    if(this.state.trans != []) {
      return (
        <View>
          <Text> Transactions: </Text>
          <Text> Date: {JSON.stringify(this.state.dates)}</Text> 
          <Text> Descriptions: {JSON.stringify(this.state.descriptions)}</Text> 
          <Text> Amount: {JSON.stringify(this.state.amounts)}</Text> 
        </View>
      );
    }
  }
}

const tran = new Transactions();

export default Transactions;

const styles = StyleSheet.create({
 
});