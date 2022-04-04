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

class DashboardScreen extends React.Component {
  constructor() {
    super();
    //trans.getTransactions();
    // db.getTransactions();
     this.state = {
       transactions: [], 
       modalVisible: false,
       transactionsCalled: false, 
       dates: [],
       descriptions: [],
       amounts: [], 
       categories: [],
       trans: []
     };
    // console.log(db.state.trans)
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  getTransactions() {
    if(this.state.transactionsCalled == true) {
      this.setState({
        transactions: []
      });
      this.setModalVisible(true);
      //console.log(auth().currentUser.email)
      firestore().collection('Users').doc(auth().currentUser.email)
      .collection('Transactions').get()
      .then(querySnapshot => {
          querySnapshot.forEach(doc => {
              const{date, description, amount, category} = doc.data();
              this.state.transactions.push({
                  date, 
                  description, 
                  amount, 
                  category
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
      this.setModalVisible(true);
      firestore().collection('Users').doc(auth().currentUser.email)
      .collection('Transactions').get()
      .then(querySnapshot => {
          querySnapshot.forEach(doc => {
              const{date, description, amount, category} = doc.data();
              this.state.transactions.push({
                  date, 
                  description, 
                  amount, 
                  category
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

  deleteTransaction(description) {
    const ref = firestore().collection('Users').doc(auth().currentUser.email)
      .collection('Transactions').where('description', '==', description);

    ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc);
        doc.ref.delete();
      });
    });
    console.log('Transaction deleted');
    Alert.alert('Transaction successfully deleted');
    this.setModalVisible(false);
  }

  render() {
    const{modalVisible} = this.state;
    return (
      <View style={{flex: 1, backgroundColor:"white", alignItems: 'center'}}>
        <Modal
          animationType="slide"
          visible={modalVisible}
          presentationStyle="fullScreen"
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
          >
            <Text styles={styles.title}> Transactions: </Text>
            <FlatList 
                      data={this.state.trans}
                      keyExtractor={(x,i) => i}
                      renderItem={({item}) => 
                      <Text style={styles.transList}>
                        Category: {item.category} Amount: {item.amount} Date: {item.date} Description: {item.description} 
                        <Button styles= {styles.buttonContainer} title= 'Delete' onPress={() => this.deleteTransaction(item.description)}> 
                          Delete transaction</Button>
                      </Text>}>

            </FlatList>
            {/* <Text styles={styles.modalText}>
              {JSON.stringify(this.state.trans)}
            </Text> */}
            {/* <Text style={styles.modalText}> 
              {this.state.dates}</Text>

              <Text style={styles.modalText}> 
              {this.state.descriptions}</Text>

              <Text style={styles.modalText}> 
              {this.state.amounts}</Text> */}
            
          <TouchableOpacity
            style={styles.buttonContainer1}
            title="close"
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity> 
           
          </Modal>
        {/* <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Recent Transactions: {toString(db.state.trans)}
        </Text> */}
        <Button
          style={styles.buttonContainer}
          title="Show Transactions"
          onPress={() => this.getTransactions()}
        />
        <TouchableOpacity 
            style={styles.buttonContainer} 
            title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>
        {/* <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Stocks"
          onPress={() => this.props.navigation.navigate('Stocks')}
        />
        <Button
          title="Finances"
          onPress={() => this.props.navigation.navigate('Finances')}
        />
        <Button
          title="Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        <Button
          title="News"
          onPress={() => this.props.navigation.navigate('News')}
        /> */}
      </View>
    );
  }
}

export default DashboardScreen;

const styles = StyleSheet.create({
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
    position: 'absolute',
      top: 580,
      left: 45,
      backgroundColor: colors.background,
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
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 200,
   // fontWeight: "bold"
  }
});
