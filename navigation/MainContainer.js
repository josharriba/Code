import * as React from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import firestore from '@react-native-firebase/firestore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainContainer() {
    //const user = auth().currentUser;
    //user logged in

    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={"Home"}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;
                        if (route.name === "Home")    {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === "Stocks") {
                            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                        } else if (rn === "Finances")  {
                            iconName = focused ? 'cash' : 'cash-outline';
                        } else if (rn === "Profile")    {
                            iconName = focused ? 'person' : 'person-outline';
                        }  else if (rn === "Dashboard")  {
                            iconName = focused ? 'clipboard' : 'clipboard-outline';
                        } else if (rn === "News")   {
                            iconName = focused ? 'newspaper' : 'newspaper-outline';
                        } 

                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                
                })}
            >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Stocks" component={StocksScreen} options={{headerShown: false}} />
            <Tab.Screen name="Finances" component={FinancesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Login" component={LoginScreen} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}} />
            <Tab.Screen name="Signup" component={SignupScreen} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="News" component={NewsScreen} />
            

            </Tab.Navigator>
        </NavigationContainer>
        
    );

}