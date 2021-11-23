import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

class FirebaseHandler extends React.Component {
   
    constructor(){
        super();
        userList = firestore().collection('Users');
        currentUser = null;
        currentUserData = null;
    }

    doLogin(email, password) {
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {   
          console.log('User logged in successfully')          
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; 
            if(errorCode === 'auth/wrong-password') {
              alert('Invalid Password. Please try again!')
            }
            if(errorCode === 'auth/invalid-user-token' || errorCode === 'auth/user-token-expired' || errorCode === 'auth/invalid-email') {
              alert('Invalid email. Please try again!')
            }   
        });
        currentUser = auth().currentUser.email;
        currentUserData = userList.doc(currentUser);
        console.log(currentUser);
        console.log(currentUserData);
    }

    doSignup(email, password, name, age) {
        userList.doc(email).set({
            name: name,
            email: email,
            age: age
        }) 
        .then(() => {   
            console.log('User logged  in successfully')          
        })
        /* password must meet google's requirements for security
            the userList.add will still run if the auth() fails because password does not meet requirements
        */
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            console.log('New user registered successfully')            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; 
        });
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