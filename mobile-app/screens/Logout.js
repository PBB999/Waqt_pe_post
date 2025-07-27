import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/authSlice";

const Logout = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      await dispatch(logoutUser());
      navigation.navigate("Login");
    };

    handleLogout();
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Text>Logging out...</Text>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});