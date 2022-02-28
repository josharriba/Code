import * as React from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import HomeScreen from '../screens/HomeScreen';
import FinancesScreen from '../screens/FinancesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { create } from 'react-test-renderer';

//Screen Names
const homeName = 'Home';
const financesName = 'finances';
const profileName = 'profile';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
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

            </Tab.Navigator>
        </NavigationContainer>
    )
}