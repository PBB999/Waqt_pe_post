import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SendPackageScreen from '../screens/SendPackageScreen';
import AddAddressScreen from '../screens/AddAddressScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />
            <Stack.Screen name="SendPackage" component={SendPackageScreen} />
            <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        </Stack.Navigator>

    );
}
