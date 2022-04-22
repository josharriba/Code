import React from 'react';
import {Alert} from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import uuid from 'react-native-uuid'

/*
    FirebaseHandler handles some of the app's interactions with 
    the firebase auth and firestore data
*/

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
        checkNewUser sets the firestore user document with the
        name, email and age that the user entered
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

    /* 
        doSignup takes the email, password, name and age
        that the user input and uses firebase auth to create a new 
        account. It also passes the info to checkNewUser to create firestore doc

        password must meet google's requirements for security
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

    }


    /*
        deleteUser deletes the user from the firestore database and the firestore auth
    */
    deleteUser() {
        /*
            need to delete user from firestore and from auth
        */
        userList.doc(auth().currentUser.email).delete().then((res) => {
            console.log('User data deleted from app');
        })
        auth().currentUser.delete()
    }


    //sign the user out with firebase auth
    signOut() {
        auth().signOut()
        .then(() => console.log('User signed out!'));
    }

    /*
        enterTransaction takes the date description, amount and category
        of a transaction and adds a new doc to firestore database with 
        that info and a unique id
    */
    enterTransaction(date, description, amount, category) {
       userList.doc(auth().currentUser.email).collection('Transactions').add({
            date: date,
            description: description,
            amount: amount, 
            category: category, 
            id: uuid.v4()
         });
    }

    /*
        takes the stock symbol and makes a new firestore doc to save to favorites
    */
    addFavoriteStock(symbol) {
        userList.doc(auth().currentUser.email).collection('Favorite Stocks').doc(symbol).set({
            symbol: symbol
        }, {merge: true})
        Alert.alert("Favorite stock successfully added to favorites");
        console.log("successfully added stock to favorites")
    }

    /*
        Gets the name of the current user
    */
    getName() {
        userList.doc(auth().currentUser.email)
        .get()
        .then(documentSnapshot => {
            //console.log(documentSnapshot.data().name);
            this.name = documentSnapshot.data().name
            return this.name;
        });
    }

     /*
        Gets the phone number of the current user
    */
    getPhoneNum() {
        userList.doc(auth().currentUser.email)
        .get()
        .then(documentSnapshot => {
            this.phoneNum = documentSnapshot.data().phoneNum
        })
    }

     /*
        Gets the address of the current user
    */
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