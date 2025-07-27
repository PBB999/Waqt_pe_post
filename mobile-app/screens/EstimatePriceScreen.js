import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, BackHandler } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EstimatePriceScreen = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="location-outline" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Pickup pincode"
            placeholderTextColor="#C7C7CD"
          />
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.inputWrapper}>
          <Ionicons name="location" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Delivery pincode"
            placeholderTextColor="#C7C7CD"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backIcon: {
    marginRight: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    fontSize: 16,
    color: "#000",
    paddingHorizontal: 10,
  },
  lineSeparator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 10,
  },
});

export default EstimatePriceScreen;