import * as React from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import { create } from 'react-test-renderer';

//Screen Names
const homeName = 'Home';
const financesName = 'finances';
const profileName = 'profile';
import LoginScreen from '../screens/LoginScreen';
 import HomeScreen from '../screens/HomeScreen';
 import StocksScreen from '../screens/StocksScreen';
 import DashboardScreen from '../screens/DashboardScreen';
 import FinancesScreen from '../screens/FinancesScreen';
 import BudgetingScreen from '../screens/BudgetingScreen';
 import ProfileScreen from '../screens/ProfileScreen';
 import SignupScreen from '../screens/SignupScreen';
 import NewsScreen from '../screens/NewsScreen';

 import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    if(auth().currentUser == null) {
        return(
            <NavigationContainer>
                <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName)    {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === financesName) {
                            iconName = focused ? 'card' : 'card-outline'
                        } else if (rn === profileName)  {
                            iconName = focused ? 'person' : 'person-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                })}>

                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={financesName} component={FinancesScreen}/>
                <Tab.Screen name={profileName} component={ProfileScreen}/>
                <Tab.Screen name="Stocks" component={StocksScreen} />
                    <Tab.Screen name="Dashboard" component={DashboardScreen} />
                    <Tab.Screen name="Finances" component={FinancesScreen} />
                    <Tab.Screen name="Budgeting" component={BudgetingScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                    <Tab.Screen name="Signup" component={SignupScreen} />
                    <Tab.Screen name="News" component={NewsScreen} />

                </Tab.Navigator>
                </NavigationContainer>
            
        )
    }
    else {
         return(
            <NavigationContainer>
                <Tab.Navigator
                initialRouteName="Login"
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName)    {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === financesName) {
                            iconName = focused ? 'card' : 'card-outline'
                        } else if (rn === profileName)  {
                            iconName = focused ? 'person' : 'person-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                })}>

                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={financesName} component={FinancesScreen}/>
                <Tab.Screen name={profileName} component={ProfileScreen}/>
                <Tab.Screen name="Stocks" component={StocksScreen} />
                        <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{title: 'Welcome! Please Login'}}
                    fontFamily= 'Montsesrrat-Medium'
                    />
                    <Tab.Screen name="Dashboard" component={DashboardScreen} />
                    <Tab.Screen name="Finances" component={FinancesScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                    <Tab.Screen name="Signup" component={SignupScreen} />
                    <Tab.Screen name="News" component={NewsScreen} />

                </Tab.Navigator>
            </NavigationContainer>
         )
    }
}