import React from 'react';
import {Alert} from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

class FirebaseHandler extends React.Component {
   
    constructor(){
        super();
    }

    onStartup() {
        userList = firestore().collection('Users');
        currUser = null;
        currentUserData = null;
        transactions = [];
    }

    doLogin(email, password) {
        // console.log(email)
        // console.log(password)
        // this.currUser = null;
        // this.currentUserData = null;
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {   
          console.log('User logged in successfully')          
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; 
            if(errorCode === 'auth/wrong-password' || errorCode == 'auth/invalid-password') {
              Alert.alert('Invalid Password. Please try again!')
            }
            if(errorCode === 'auth/invalid-user-token' || errorCode === 'auth/user-token-expired' || errorCode === 'auth/invalid-email') {
              Alert.alert('Invalid email. Please try again!')
            }   
        });
        this.currUser = auth().currentUser.email;
        this.currentUserData = userList.doc(currUser);
        console.log(this.currUser);
        console.log(this.currentUserData);
    }

    /* password must meet google's requirements for security
        the userList.add will still run if the auth() fails because password does not meet requirements
    */
    doSignup(email, password, name, age) {
        userList.doc(email).set({
            name: name,
            email: email,
            age: age
        }) 
        .then(() => {   
            console.log('User signed up successfully')          
        })
        .catch((error) => {
            const errorMessage = error.message; 
            alert(errorMessage);
            throw error;
        });


        auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            console.log('New user registered successfully')            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; 
            alert(errorMessage);
            throw error;
        });
    }

    deleteUser() {
        /*TODO
            need to delete user from firestore and from auth
        */
        userList.doc(auth().currentUser.email).delete().then((res) => {
            console.log('User data deleted from app');
        })
    }

    signOut() {
        auth().signOut()
        .then(() => console.log('User signed out!'));
    }

    enterTransaction(date, description, amount) {
       userList.doc(auth().currentUser.email).collection('Transactions').add({
            date: date,
            description: description,
            amount: amount
         });
    }

    /*if the transaction already exists in the transactions list, 
        we dont need to add it again
        

        can use .orderBy(date) and .limit(#OfTransactionsToShow)
    */
    getTransactions() {
        userList.doc(auth().currentUser.email)
        .collection('Transactions').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const{date, description, amount} = doc.data();
                transactions.push({
                    date, 
                    description, 
                    amount
                }); 
            });
            this.setState({
                data : transactions,
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; 
            alert(errorMessage);
            throw error;
        });
        console.log(transactions);
    }

    getName() {
        doc = currentUserData.get();
        if(doc.exists) {
            console.log('Document data:', doc.data());
        }
    }
}

const db = new FirebaseHandler();

export default db;