import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DashboardScreen from '../screens/DashboardScreen';
import PackageScreen from '../screens/PackageScreen';
import DeliveryDetails from '../screens/postman/DeliveryDetails';
import DeliveriesList from '../screens/postman/DeliveryList';
import PickupDetails from '../screens/postman/Pickupdetails';
import PickupList from '../screens/postman/Pickuplist';
import RescheduleScreen from '../screens/postman/Reshedule';
import ScanQr from '../screens/postman/ScanQr';
import SendPackageScreen from './SendPackageScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DashboardScreen">
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanQr"
          component={ScanQr}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SendPackage"
          component={SendPackageScreen}
          options={{ title: 'Send a Package' }}
        />
        <Stack.Screen
          name="PackageScreen"
          component={PackageScreen}
          options={{ title: 'Send a Package' }}
        />
        <Stack.Screen
          name="DeliveriesList"
          component={DeliveriesList}
          options={{ title: 'Deliveries' }}
        />
        <Stack.Screen
          name="DeliveryDetails"
          component={DeliveryDetails}
          options={{ title: 'Delivery Details' }}
        />
        <Stack.Screen
          name="RescheduleScreen"
          component={RescheduleScreen}
          options={{ title: 'Reschedule' }}
        />
        <Stack.Screen
          name="PickupList"
          component={PickupList}
          options={{ title: 'Pickup List' }}
        />
        <Stack.Screen
          name="PickupDetails"
          component={PickupDetails}
          options={{ title: 'Pickup Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
