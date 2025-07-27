import React, { useState, useEffect ,useCallback} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation,BackHandler } from '@react-navigation/native';

const OrderScreen = () => {
  const orderID = "OD432954680381612100";
  const orderDetails = {
    productName: "T-Shirts",
    price: "₹359",
    status: [
      { step: "Parcel Confirmed", date: "Today, Wed 27th Nov", completed: true },
      { step: "Shipped", date: "Expected By Nov 28", completed: false },
      { step: "Out For Delivery", date: "", completed: false },
      { step: "Delivery", date: "Dec 01 By 11 PM", completed: false },
    ],
    shippingDetails: {
      recipientName: "John Doe",
      phone: "+91 9876543210",
      address: "123 Street, Apartment 456, Cityville, State, 123456",
      priceDetails: {
        itemPrice: "₹359",
        shippingFee: "Free",
        totalPrice: "₹359",
      },
    },
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);
  const handleShare = () => {
    Share.share({
      message: `Order ID: ${orderID}\nProduct: ${orderDetails.productName}\nPrice: ${orderDetails.price}\nDelivery Date: Dec 01 By 11 PM`,
    });
  };

  const handleLiveTracking = () => {
    alert("Live tracking feature is coming soon!");
  };

  const navigation = useNavigation();

  const handleRateExperience = () => {
    navigation.navigate('FeedbackScreen'); 
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.orderID}>Parcel ID: {orderID}</Text>

      <View style={styles.productContainer}>
        <Image
          source={{ uri: "https://teelabs.in/wp-content/uploads/2021/02/polo-red-and-white-10.png" }}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{orderDetails.productName}</Text>
          <Text style={styles.productPrice}>{orderDetails.price}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        {orderDetails.status.map((step, index) => (
          <View key={index} style={styles.statusWrapper}>
            {index < orderDetails.status.length - 1 && (
              <View style={styles.verticalLine} />
            )}
            <View style={styles.statusStep}>
              <Icon
                name={step.completed ? "check-circle" : "radio-button-unchecked"}
                size={24}
                color={step.completed ? "green" : "gray"}
              />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusStepTitle}>{step.step}</Text>
                <Text style={styles.statusStepDate}>{step.date}</Text>
              </View>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Reschedule</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.rateExperience} onPress={handleRateExperience}>
        <Text style={styles.rateText}>Rate Your Experience</Text>
        <Icon name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
        <Icon name="share" size={24} color="black" />
        <Text style={styles.shareText}>Share Parcel Details</Text>
        <Icon name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLiveTracking} style={styles.liveTrackingButton}>
        <Icon name="location-on" size={24} color="black" />
        <Text style={styles.liveTrackingText}>Live Tracking</Text>
        <Icon name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
      </TouchableOpacity>
      <View style={styles.shippingDetails}>
        <Text style={styles.sectionTitle}>Shipping Details</Text>
        <Text style={styles.detailRow}>
          <Text style={styles.detailLabel}>Recipient: </Text>
          {orderDetails.shippingDetails.recipientName}
        </Text>
        <Text style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone: </Text>
          {orderDetails.shippingDetails.phone}
        </Text>
        <Text style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address: </Text>
          {orderDetails.shippingDetails.address}
        </Text>
        <View style={styles.priceDetails}>
          <Text style={styles.priceRow}>
            Item Price: <Text style={styles.priceValue}>{orderDetails.shippingDetails.priceDetails.itemPrice}</Text>
          </Text>
          <Text style={styles.priceRow}>
            Shipping Fee: <Text style={styles.priceValue}>{orderDetails.shippingDetails.priceDetails.shippingFee}</Text>
          </Text>
          <Text style={styles.totalPriceRow}>
            Total: <Text style={styles.totalPriceValue}>{orderDetails.shippingDetails.priceDetails.totalPrice}</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  contentContainer: { padding: 16 },
  orderID: { fontSize: 14, marginBottom: 16, color: "#555" },
  productContainer: { flexDirection: "row", marginBottom: 16, backgroundColor: "#fff", padding: 12, borderRadius: 8 },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  productInfo: { marginLeft: 12, justifyContent: "center" },
  productName: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  productPrice: { fontSize: 14, color: "#888" },
  statusContainer: { marginBottom: 16, padding: 12, backgroundColor: "#fff", borderRadius: 8 },
  statusWrapper: { position: "relative", marginBottom: 24 },
  verticalLine: {
    position: "absolute",
    top: 28,
    left: 12,
    height: "110%",
    width: 2,
    backgroundColor: "#ddd",
    zIndex: -1,
  },
  statusStep: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  statusTextContainer: { marginLeft: 12 },
  statusStepTitle: { fontSize: 14, fontWeight: "bold" },
  statusStepDate: { fontSize: 12, color: "#555" },
  cancelButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#d9534f",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: { color: "white", fontSize: 16, fontWeight: "bold" },
  rateExperience: { marginTop: 16, padding: 16, backgroundColor: "white", borderRadius: 8, alignItems: "center", flexDirection: "row", },
  rateText: { color: "black", fontSize: 16, fontWeight: "bold" },
  shareButton: {
    marginTop: 16,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    padding: 16,
  },
  arrowIcon: { marginLeft: 'auto' },
  shareText: { color: "black", fontSize: 16, marginLeft: 8 },
  liveTrackingButton: {
    marginTop: 16,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    padding: 16,
  },
  liveTrackingText: { color: "black", fontSize: 16, marginLeft: 8 },
  shippingDetails: { marginTop: 16, padding: 12, backgroundColor: "#fff", borderRadius: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  detailRow: { fontSize: 14, marginBottom: 8, color: "#555" },
  detailLabel: { fontWeight: "bold", color: "#333" },
  priceDetails: { borderTopWidth: 1, borderTopColor: "#ddd", paddingTop: 8 },
  priceRow: { fontSize: 14, marginBottom: 4 },
  priceValue: { fontWeight: "bold" },
  totalPriceRow: { fontSize: 16, fontWeight: "bold", marginTop: 8 },
  totalPriceValue: { color: "green" },
});

export default OrderScreen;
