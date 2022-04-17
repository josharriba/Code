import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

function Name() {
    const [name, setName] = useState(0);

    useEffect(() => {
        firestore().collection('Users').doc(auth().currentUser.email)
        .onSnapshot(documentSnapshot => {
            setName(documentSnapshot.data().name)
        });
    });

    return(
        <View>
        <Text style={styles.text}> Welcome, {name}</Text>
        </View>
    )
}

export default Name;

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontFamily: "Montserrat-Bold",
        height: 50, width: "100%",
        borderRadius: 5,
        paddingHorizontal: 20,
        marginLeft: '25%',
        //borderColor: 'lightgray',
        //borderWidth: 1,
        marginBottom: 20,
      },
});