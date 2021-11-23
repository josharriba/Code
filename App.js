/**
 * Orco Financial Manager App
 * 
 * TODO add info here
 * 
 * 
 * 
 */

import React, {useEffect, useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {
  Button,
  Text,
  View,
  TextInput
} from 'react-native';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import StocksScreen from './screens/StocksScreen';
import DashboardScreen from './screens/DashboardScreen';
import FinancesScreen from './screens/FinancesScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignupScreen from './screens/SignupScreen';


const Stack = createNativeStackNavigator();
const userData = firestore().collection('Users');

const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
    
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) 
      setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;
  
  // if(auth().currentUser==null){
  //   return(
  //     <NavigationContainer> 
  //         <Stack.Navigator initialRouteName={"Login"}
  //         screenOptions= {{
  //           headerTitleAlign: "center",
  //           headerStyle: {
  //             backgroundColor: '#3A7D44'
  //           },
  //           headerTitleStyle: {
  //             color: 'black',
  //             fontFamily: 'Helvetica',
  //             fontWeight: 'bold'
  //           }
  //         }}>
  //           <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Welcome! Please Login'}} />
  //           <Stack.Screen name="Signup" component={SignupScreen} />
  //         </Stack.Navigator>

  //     </NavigationContainer>
  //   );
  // }
  
  return (
     <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}
          screenOptions= {{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#3A7D44'
            },
            headerTitleStyle: {
              color: 'black',
              fontFamily: 'Helvetica',
              fontWeight: 'bold'
            }
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Welcome! Please Login'}}/>
          <Stack.Screen name="Stocks" component={StocksScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Finances" component={FinancesScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;