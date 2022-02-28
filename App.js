/**
 * Orco Financial Manager App
 *
 * TODO add info here
 *
 *
 *
 */

 import React, {useEffect, useState} from 'react';
 import {NavigationContainer} from '@react-navigation/native';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import auth from '@react-native-firebase/auth';
 import firestore from '@react-native-firebase/firestore';
 import {StyleSheet, Button, Text, View, TextInput} from 'react-native';
 
 
 import LoginScreen from './screens/LoginScreen';
 import HomeScreen from './screens/HomeScreen';
 import StocksScreen from './screens/StocksScreen';
 import DashboardScreen from './screens/DashboardScreen';
 import FinancesScreen from './screens/FinancesScreen';
 import BudgetingScreen from './screens/BudgetingScreen';
 import ProfileScreen from './screens/ProfileScreen';
 import SignupScreen from './screens/SignupScreen';
 import db from './components/FirebaseHandler';
 import NewsScreen from './screens/NewsScreen';
 import colors from './assets/colors/colors';

 import MainContainer from './navigation/MainContainer';
 
 //import colors from './screens/assets/colors/colors';
 
 const Stack = createNativeStackNavigator();
 const userData = firestore().collection('Users');
 
 const App = () => {
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();
 
   db.onStartup();
 
   function onAuthStateChanged(user) {
     setUser(user);
     if (initializing) {
       setInitializing(false);
     }
   }
   useEffect(() => {
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber;
   }, []);
 
   if (initializing) {
     return null;
   }
 
   return (
     <MainContainer></MainContainer>
    //  <NavigationContainer>
    //    <Stack.Navigator
    //      initialRouteName={'Login'}
    //      screenOptions={{
    //        headerTitleAlign: 'center',
    //        headerStyle: {
    //          backgroundColor: "white",
    //        },
    //        headerTitleStyle: {
    //          color: "gray",
    //          fontFamily: 'Montsesrrat-Medium'
    //        },
    //      }}>
    //      <Stack.Screen name="Home" component={HomeScreen} />
    //      <Stack.Screen
    //        name="Login"
    //        component={LoginScreen}
    //        options={{title: 'Welcome! Please Login'}}
    //        fontFamily= 'Montsesrrat-Medium'
    //      />
    //      <Stack.Screen name="Stocks" component={StocksScreen} />
    //      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    //      <Stack.Screen name="Finances" component={FinancesScreen} />
    //      <Stack.Screen name="Budgeting" component={BudgetingScreen} />
    //      <Stack.Screen name="Profile" component={ProfileScreen} />
    //      <Stack.Screen name="Signup" component={SignupScreen} />
    //      <Stack.Screen name="News" component={NewsScreen} />
    //    </Stack.Navigator>
      
    //  </NavigationContainer>
   );
 };
 export default App;