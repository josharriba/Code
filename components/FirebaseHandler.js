import React from 'react';
import {Alert} from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

class FirebaseHandler extends React.Component {
   
    constructor(){
        super();
        this.state= {
            trans: []
        }
    }

    onStartup() {
        userList = firestore().collection('Users');
        currUser = null;
        currentUserData = null;
        flag = false;      
        loggedIn = false;
    }
    /*
        moved auth for login to LoginScreen

    doLogin(email, password) {
        // console.log(email)
        // console.log(password)
        // this.currUser = null;
        // this.currentUserData = null;
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            this.loggedIn = true; 
            this.currUser = auth().currentUser.email;
            this.currentUserData = userList.doc(currUser);
            this.flag = true;
            console.log(this.currUser);
            console.log(this.currentUserData);    
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
    }
    */

    checkNewUser(name, email, age) {
        userList.doc(email).get().then((documentSnapshot) => {
            if(documentSnapshot.exists) {
                return;
            }
            else {
                userList.doc(email).set({
                    name: name,
                    email: email,
                    age: age
                }) 
            }
        })
    }

    /* password must meet google's requirements for security
        the userList.add will still run if the auth() fails because password does not meet requirements
    */
    doSignup(email, password, name, age) {
    
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            this.checkNewUser(name, email, age);
            console.log('New user registered successfully')            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; 
            alert(errorMessage);
            throw error;
        });

        // auth()
        // .signInWithEmailAndPassword(email, password)
        // .then((res) => { 
        //     console.log('User logged in successfully')
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message; 
        //     if(errorCode === 'auth/wrong-password' || errorCode == 'auth/invalid-password') {
        //       Alert.alert('Invalid Password. Please try again!')
        //     }
        //     if(errorCode === 'auth/invalid-user-token' || errorCode === 'auth/user-token-expired' || errorCode === 'auth/invalid-email') {
        //       Alert.alert('Invalid email. Please try again!')
        //     } 
        // });

       

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

    addFavoriteStock(symbol) {
        userList.doc(auth().currentUser.email).collection('Favorite Stocks').doc(symbol).set({
            symbol: symbol
        }, {merge: true})
        console.log("successfully added stock to favorites")
    }

   

    /*if the transaction already exists in the transactions list, 
        we dont need to add it again
        

        can use .orderBy(date) and .limit(#OfTransactionsToShow)
    */
    // getTransactions() {
    //    //console.log(auth().currentUser.email)
    //    transactions = [];
    //     userList.doc(auth().currentUser.email)
    //     .collection('Transactions').get()
    //     .then(querySnapshot => {
    //         querySnapshot.forEach(doc => {
    //             const{date, description, amount} = doc.data();
    //             transactions.push({
    //                 date, 
    //                 description, 
    //                 amount
    //             }); 
    //         });
    //         this.state.trans = transactions;
    //         // this.setState({
    //         //     trans: transactions,
    //         // });
    //        //console.log(this.state.trans);
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message; 
    //         alert(errorMessage);
    //         throw error;
    //     });
    //     //console.log(transactions);
    // }

    getName() {
        userList.doc(auth().currentUser.email)
        .get()
        .then(documentSnapshot => {
            //console.log(documentSnapshot.data().name);
            this.name = documentSnapshot.data().name
            return this.name;
        });
    }

    getPhoneNum() {
        userList.doc(auth().currentUser.email)
        .get()
        .then(documentSnapshot => {
            this.phoneNum = documentSnapshot.data().phoneNum
        })
    }

    getAddress() {
        userList.doc(auth().currentUser.email)
        .get()
        .then(documentSnapshot => {
            this.address = documentSnapshot.data().address
        })
    }   

}

const db = new FirebaseHandler();

export default db;