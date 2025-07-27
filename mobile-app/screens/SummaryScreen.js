import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateCreatingParcel } from "../redux/parcel/parcelSlice";

const SummaryScreen = () => {
  const navigation = useNavigation();
  const [selectedDeliveryType, setSelectedDeliveryType] = useState("surface");
  const dispatch = useDispatch();
  const creatingParcel = useSelector((state) => state.parcel.creatingParcel);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const handleDeliveryTypeSelection = () => {
    dispatch(
      updateCreatingParcel({
        deliveryType: selectedDeliveryType,
        price: selectedDeliveryType === "surface" ? 105.0 : 150.0,
      })
    );
    handleProceedToPay();
  };

  const handleProceedToPay = () => {
    navigation.navigate("PaymentScreen");
  };


  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressItem}>
          <View style={styles.completedStepCircle} />
          <Text style={styles.completedStepText}>ADDRESS</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressItem}>
          <View style={styles.completedStepCircle} />
          <Text style={styles.completedStepText}>PACKAGE</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressItem}>
          <View style={styles.completedStepCircle} />
          <Text style={styles.completedStepText}>SCHEDULE</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressItem}>
          <View style={styles.activeStepCircle} />
          <Text style={styles.activeStepText}>SUMMARY</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Address Details</Text>
            <TouchableOpacity style={styles.updateButtonContainer}>
              <Text style={styles.updateButtonText}>Update Address</Text>
              <Icon name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addressRow}>
            <View style={styles.addressLeft}>
              <Icon name="home" size={20} color="#d9534f" />
              <Text style={styles.addressType}>Home (Pickup)</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.addressText}>{creatingParcel?.pickupAddress?.state} - {creatingParcel?.pickupAddress?.pincode}</Text>
          <TouchableOpacity style={styles.addressRow}>
            <View style={styles.addressLeft}>
              <Icon name="briefcase" size={20} color="#FFA500" />
              <Text style={styles.addressType}>Work (Delivery)</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.addressText}>{creatingParcel?.deliveryAddress?.state} - {creatingParcel?.deliveryAddress?.pincode}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Package Details</Text>
          <TouchableOpacity style={styles.packageRow}>
            <Image source={{ uri: 'https://www.papercenter.eu/wp-content/uploads/envelop-ea5-diepgeel.jpg' }} style={styles.packageImage} />
            <View>
              <Text style={styles.packageType}>Envelope / Books & Docs</Text>
              <Text style={styles.packageInfo}>Upto 0.5 Kg</Text>
              <Text style={styles.packageInfo}>Pickup: 24 Nov</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Select Delivery Type</Text>
          <TouchableOpacity
            style={[styles.deliveryType, selectedDeliveryType === 'surface' && styles.selectedDeliveryType]}
            onPress={() => setSelectedDeliveryType('surface')}
          >
            <Icon name="truck-outline" size={20} color="#000" />
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryTitle}>SURFACE</Text>
              <Text style={styles.deliveryDetails}>Delivery in 2 days</Text>
            </View>
            <Text style={styles.deliveryPrice}>₹ 105.0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.deliveryType, selectedDeliveryType === 'express' && styles.selectedDeliveryType]}
            onPress={() => setSelectedDeliveryType('express')}
          >
            <Icon name="rocket-outline" size={20} color="#000" />
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryTitle}>EXPRESS</Text>
              <Text style={styles.deliveryDetails}>Delivery in 1 day</Text>
            </View>
            <Text style={styles.deliveryPrice}>₹ 150.0</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.totalPrice}>
          ₹ {selectedDeliveryType === 'surface' ? '105.0' : '150.0'}
        </Text>
        <TouchableOpacity style={styles.proceedButton} onPress={handleDeliveryTypeSelection}>
          <Text style={styles.proceedButtonText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', padding: 8 },
  progressItem: { alignItems: 'center' },
  progressLine: { flex: 1, height: 2, backgroundColor: 'green' },
  completedStepCircle: { width: 16, height: 16, backgroundColor: 'green', borderRadius: 8 },
  completedStepText: { fontSize: 12, color: 'green', marginTop: 4 },
  activeStepCircle: { width: 16, height: 16, backgroundColor: 'green', borderRadius: 8 },
  activeStepText: { fontSize: 12, color: 'blue', marginTop: 4 },
  scrollViewContent: { paddingHorizontal: 16 },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  updateButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 6,
    paddingHorizontal: 0,
    borderRadius: 6,
  },
  updateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007bff',
    marginRight: 6,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  addressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  addressLeft: { flexDirection: 'row', alignItems: 'center' },
  addressType: { marginLeft: 8, fontSize: 14 },
  addressText: { fontSize: 14, color: '#555' },
  packageRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  packageImage: { width: 50, height: 50 },
  deliveryType: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginVertical: 8 },
  deliveryInfo: { flex: 1, marginLeft: 16 },
  selectedDeliveryType: { borderColor: '#d9534f', backgroundColor: '#ffe6e6' },
  deliveryPrice: { fontSize: 14, fontWeight: 'bold' },
  bottomContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  totalPrice: { fontSize: 18, fontWeight: 'bold' },
  proceedButton: { backgroundColor: '#d9534f', padding: 12, borderRadius: 8 },
  proceedButtonText: { color: '#fff', fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SummaryScreen;
