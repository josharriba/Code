/**
 * Orco Financial Manager App
 * 
 * TODO add info here
 * 
 * 
 * 
 */

import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

const App = () => {
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
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;