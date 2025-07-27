import React from "react";
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SendPackageScreen from "./screens/SendPackageScreen";
import PickupLocationScreen from "./screens/PickupLocationScreen";
import EstimatePriceScreen from "./screens/EstimatePriceScreen";
import PackageScreen from "./screens/PackageScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import PostmanLogin from "./screens/postman/PostmanLogin";
import PostmanDashboard from "./screens/postman/PostmanDashboard";
import DeliveryDetails from "./screens/postman/DeliveryDetails";
import SenderDeliveryDetails from "./screens/DeliveryDetails";
import DeliveryHistory from "./screens/postman/DeliveryHistory";
import Reshedule from "./screens/postman/Reshedule";
import RouteNavigation from "./screens/postman/RouteNavigation";
import DeliveriesList from "./screens/postman/DeliveryList";
import Overview from "./screens/postman/Overview";
import PickupList from "./screens/postman/Pickuplist";
import PickupDetails from "./screens/postman/Pickupdetails";
import SummaryScreen from "./screens/SummaryScreen";
import OrderScreen from "./screens/OrderScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import NeighborDeliveryScreen from "./screens/NeighborDeliveryScreen";
import ScanQr from "./screens/postman/ScanQr";
import DeliveryLocationScreen from "./screens/DeliveryLocation";
import PaymentPage from "./screens/PaymentScreen";
import Phone from "./screens/Phone";
import Check from "./screens/Check";
import Logout from "./screens/Logout";
import ProfilePage from "./screens/UserProfile";
import { LogBox } from 'react-native';
import Reschedule from "./screens/Reschedule";
import UpdateUser from "./screens/UpdateUser";
import { View, StatusBar } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar hidden />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Check" >
          <Stack.Screen
            name="Check"
            component={Check}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Logout"
            component={Logout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserProfile"
            component={ProfilePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SendPackage"
            component={SendPackageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PickupLocation"
            component={PickupLocationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DeliveryLocation"
            component={DeliveryLocationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PackageScreen"
            component={PackageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateUser"
            component={UpdateUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EstimatePrice"
            component={EstimatePriceScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SummaryScreen"
            component={SummaryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Order"
            component={OrderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NeighborDelivery"
            component={NeighborDeliveryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScheduleScreen"
            component={ScheduleScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScanQr"
            component={ScanQr}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostmanLogin"
            component={PostmanLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostmanDashboard"
            component={PostmanDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DeliveryList"
            component={DeliveriesList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Overview"
            component={Overview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PickupList"
            component={PickupList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PickupDetails"
            component={PickupDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DeliveryDetails"
            component={DeliveryDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SenderDeliveryDetails"
            component={SenderDeliveryDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RouteNavigation"
            component={RouteNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DeliveryHistory"
            component={DeliveryHistory}
            options={{ title: "Delivery History" }}
          />
          <Stack.Screen
            name="Reshedule"
            component={Reshedule}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Phone"
            component={Phone}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reschedule"
            component={Reschedule}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
