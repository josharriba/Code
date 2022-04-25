import React, {useState, useEffect} from 'react';
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

import {Picker} from '@react-native-picker/picker'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../assets/colors/colors';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDate, setModalDate] = useState();
  const [modalDescription, setModalDescription] = useState();
  const [modalCategory, setModalCategory] = useState();
  const [modalAmount, setModalAmount] = useState();
  const [modalID, setModalID] = useState();
  const categories = [
    {label: 'Housing', value: 'housing', key:1},
    {label: 'Transportation', value: 'transportation', key:2},
    {label: 'Food', value: 'food', key:3},
    {label: 'Insurance', value: 'insurance', key:4},
    {label: 'Savings', value: 'savings', key:5},
    {label: 'Miscelaneous bills', value: 'miscelaneous bills', key:6},
    {label: 'Personal/hobby', value: 'personal', key:7},
    {label: 'Miscelaneous', value: 'miscelaneous', key:8},
  ];

    useEffect(() => {
      const subscriber = firestore().collection('Users').doc(auth().currentUser.email)
      .collection('Transactions').orderBy('sortValue', 'desc')
      .onSnapshot(querySnapshot => {
          const trans = [];
          querySnapshot.forEach(doc => {
              const{date, description, amount, category, id, sortValue} = doc.data();
              trans.push({date, description, amount, category, id, sortValue});
              //console.log(doc.data())
              console.log(trans)
          });
          setTransactions(trans);
      })
      return () => subscriber();
    }, []);

  function deleteTransaction(id) {
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
  }

  function updateTransaction(id, date, description, amount, category) {
    setModalDate(date);
    setModalDescription(description);
    setModalAmount(amount);
    setModalCategory(category);
    setModalID(id);
    setModalVisible(true)
  }

  function editTransaction(id, date, description, amount, category) {
    setModalVisible(false);
    const ref = firestore().collection('Users').doc(auth().currentUser.email)
      .collection('Transactions').where('id', '==', id);
    if(date.length != 8) {
      Alert.alert("Please enter a valid date! (mm/dd/yy)");
    }
    if(date.length == 8) {
      dateSplit = date.split("/");
      sortVal = dateSplit[2] + dateSplit[0] + dateSplit[1];
      ref.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc);
          doc.ref.update({
              date: date,
              description: description,
              amount: amount,
              category: category, 
              sortValue: sortVal
          })
        });
      });
    }
  }

    
    return (
      <View style={{flex: 1, backgroundColor:"white", alignItems: 'center'}}>
            <Text styles={styles.title}> Transactions: </Text>
            <Modal
              visible={modalVisible}
              onRequestClose={() => {
                editTransaction(modalID, modalDate, modalDescription, modalAmount, modalCategory)
                setModalVisible(!modalVisible)
              }}
              >
                <Text style={{position: 'absolute', top:"55%", left:"1%"}}>
                  Category: 
              </Text>
                <Picker
              prompt="Select a transaction category"
              mode="dropdown"
              style={{
                height: 50, 
                width: 300, 
                 
                position: "absolute",
                  top: "60%",
                backgroundColor: colors.background,
                
                }}
              selectedValue={modalCategory}
              onValueChange={setModalCategory}
            >
              {categories.map((item, index) => (
                <Picker.Item
                  color= {colors.primary}
                  label={item.label}
                  value={item.value}
                  index={index}
                />
              ))}
          </Picker>
          <Text style={{position: 'absolute', top:"10%", left:"1%"}}>
            Date:
          </Text>
            <TextInput 
              style={styles.textContainer}
              placeholder="date"
              placeholderTextColor="lightgrey"
              value = {modalDate}
              onChangeText={setModalDate}
            />
             <Text style={{position: 'absolute', top:"25%", left:"1%"}}>
            Description:
            </Text>
            <TextInput 
              style={styles.textContainer1}
              placeholder="description"
              placeholderTextColor="lightgrey"
              value = {modalDescription}
              onChangeText={setModalDescription}
            />
             <Text style={{position: 'absolute', top:"40%", left:"1%"}}>
            Amount:
            </Text>
            <TextInput 
              style={styles.textContainer2}
              placeholder="amount"
              placeholderTextColor="lightgrey"
              value = {modalAmount}
              onChangeText={setModalAmount}
            />
              <TouchableOpacity
                    styles= {styles.buttonContainer} 
                    title= 'Update transaction' 
                    onPress={() => editTransaction(modalID, modalDate, modalDescription, modalAmount, modalCategory)}
                    > 
                    <Text style={styles.buttonText}>Save</Text>

              </TouchableOpacity>
            </Modal>

            <FlatList 
                      data={transactions}
                      keyExtractor={(x,i) => i}
                      renderItem={({item}) => 
                      <Text style={styles.transList}>
                        Category: {<Text style={styles.subtitle}>{item.category}</Text>}{"\n"}Amount: {<Text style={styles.subtitle}>{item.amount}</Text>}{"\n"}Date: {<Text style={styles.subtitle}>{item.date}</Text>}{"\n"}Description: {<Text style={styles.subtitle}>{item.description}</Text>} 
                        <TouchableOpacity
                        styles= {styles.delContainer} 
                        title= 'Delete' 
                        onPress={() => deleteTransaction(item.id)}
                        > 
                            <Text style={styles.delText}>Delete</Text>

                          </TouchableOpacity>
                          <TouchableOpacity
                            styles= {styles.editContainer} 
                            title= 'Edit' 
                            onPress={() => updateTransaction(item.id, item.date, item.description, item.amount, item.category)}
                            > 
                            <Text style={styles.editText}>Edit</Text>
                          </TouchableOpacity>
                      </Text>
                    }>

            </FlatList>
        
      </View>
    );
}

export default Transactions;

const styles = StyleSheet.create({
  delContainer: {
    width: 70,
    color: colors.primary,
    paddingHorizontal: 14, 
    left: "80%"
  },
  editContainer: {
    width: 70,
    color: colors.primary,
    paddingHorizontal: 14, 
    left: 15
  },
  editText: {
    textAlign: 'center',
    justifyContent: 'center',
    //position: 'absolute',
      top: 5,
      left: 15,
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: colors.secondary,
    backgroundColor: colors.background
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
  transList: {
    color: colors.primary,
    padding: 15
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
  buttonContainer: {
    width: "100%",
    height: 75,
    color: colors.primary,
    position: 'relative',
    top:10,
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    position: 'relative',
      top: 475,
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: colors.secondary,
    backgroundColor: colors.background
  },
  buttonText2: {
    padding: 5,
    marginLeft: '30%',
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    color: colors.primary
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
  },
  textContainer: {
    position: 'absolute',
      top: "10%",
      //left: 45,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    height: 50, width: "100%",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: .8,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 20
  },
  textContainer1: {
    position: 'absolute',
      top: "25%",
      //left: 45,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    height: 50, width: "100%",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: .8,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 20
  },
  textContainer2: {
    position: 'absolute',
      top: "40%",
      //left: 45,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    height: 50, width: "100%",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: .8,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 20
  },
});