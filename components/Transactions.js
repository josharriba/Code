import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        trans: []
    }
  }

  getTransactions() {
    //console.log(auth().currentUser.email)
    firestore().collection('Users').doc(auth().currentUser.email)
     .collection('Transactions').get()
     .then(querySnapshot => {
         querySnapshot.forEach(doc => {
             const{date, description, amount} = doc.data();
             this.state.trans.push({
                 date, 
                 description, 
                 amount
             }); 
         });
         //this.state.trans = transactions;
         // this.setState({
         //     trans: transactions,
         // });
       // console.log(this.state.trans);
     })
     .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message; 
         alert(errorMessage);
         throw error;
     });
     //console.log(transactions);
 }
 
  render() {
    return (
      <View>
        <Text> Transactions: {this.state.trans}</Text>
      </View>
    );
  }
}

const tran = new Transactions();

export default Transactions;

const styles = StyleSheet.create({
 
});