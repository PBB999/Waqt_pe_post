import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressesByUser } from "../redux/address/addressActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateCreatingParcel } from "../redux/parcel/parcelSlice";
import { Contact } from "lucide-react-native";

const SendPackageScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState(null);
  const { addresses } = useSelector((state) => state.address);

  const [isPickupModalVisible, setPickupModalVisible] = useState(false);
  const [isDeliveryModalVisible, setDeliveryModalVisible] = useState(false);

  const [pickupAddress, setPickupAddress] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const parcelState = useSelector(state => state.parcel);
  const receiver = parcelState.creatingParcel.receiverId;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
    return () => backHandler.remove();
  }, [navigation]);

  const getUserInfo = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem("userInfo");
      if (userInfoString) {
        const userInfoObject = JSON.parse(userInfoString);
        setUserInfo(userInfoObject);
      } else {
        console.warn("No user info found in storage");
      }
    } catch (error) {
      console.error("Error retrieving user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!userInfo?._id) return;
    dispatch(fetchAddressesByUser(userInfo._id));
    dispatch(updateCreatingParcel({ senderId: userInfo._id }));
  }, [userInfo]);

  const handleSelectPickupAddress = (address) => {
    setPickupAddress(address);
    dispatch(updateCreatingParcel({ pickupAddress: address }));
    setPickupModalVisible(false);
  };

  const handleSelectDeliveryAddress = (address) => {
    setDeliveryAddress(address);
    dispatch(updateCreatingParcel({ deliveryAddress: address }));
    setDeliveryModalVisible(false);
  };

  const navigateToAddAddress = (type) => {
    navigation.navigate("DeliveryLocation", { type });
    if (type === "pickup") setPickupModalVisible(false);
    if (type === "delivery") setDeliveryModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressItem}>
          <View style={styles.activeStepCircle} />
          <Text style={styles.activeStepText}>ADDRESS</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressItem}>
          <View style={styles.inactiveStepCircle} />
          <Text style={styles.inactiveStepText}>PACKAGE</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressItem}>
          <View style={styles.inactiveStepCircle} />
          <Text style={styles.inactiveStepText}>SCHEDULE</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressItem}>
          <View style={styles.inactiveStepCircle} />
          <Text style={styles.inactiveStepText}>SUMMARY</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addressButton}
        onPress={() => navigation.navigate('Phone')}
        activeOpacity={0.8}
      >
        <Contact name="map-marker-alt" size={24} color="#d9534f" />
        <Text style={styles.buttonText}>
          {receiver ? receiver.name : "Select Contact"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addressButton}
        onPress={() => setPickupModalVisible(true)}
        activeOpacity={0.8}
      >
        <FontAwesome5 name="map-marker-alt" size={24} color="#d9534f" />
        <Text style={styles.buttonText}>
          {pickupAddress
            ? `Pickup: ${pickupAddress.city}`
            : "Add Pickup Address"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addressButton}
        onPress={() => setDeliveryModalVisible(true)}
        activeOpacity={0.8}
      >
        <FontAwesome5 name="map-marker-alt" size={24} color="#d9534f" />
        <Text style={styles.buttonText}>
          {deliveryAddress
            ? `Delivery: ${deliveryAddress.city}`
            : "Add Delivery Address"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.estimateText}>
        Want to know the shipping cost?{" "}
        <TouchableOpacity
          onPress={() => navigation.navigate("EstimatePrice")}
          activeOpacity={0.8}
        >
          <Text style={styles.estimateLink}>Get an Estimate</Text>
        </TouchableOpacity>
      </Text>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("PackageScreen")}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPickupModalVisible}
        onRequestClose={() => setPickupModalVisible(false)}
      >
        <AddressModal
          title="Select Pickup Address"
          addresses={addresses}
          onSelect={handleSelectPickupAddress}
          onAdd={() => navigateToAddAddress("pickup")}
          onClose={() => setPickupModalVisible(false)}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeliveryModalVisible}
        onRequestClose={() => setDeliveryModalVisible(false)}
      >
        <AddressModal
          title="Select Delivery Address"
          addresses={addresses}
          onSelect={handleSelectDeliveryAddress}
          onAdd={() => navigateToAddAddress("delivery")}
          onClose={() => setDeliveryModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const AddressModal = ({ title, addresses, onSelect, onAdd, onClose }) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.sheetHeader}>
          <Text style={styles.modalHeader}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.savedAddressesContainer}>
          {addresses?.map((address) => (
            <TouchableOpacity
              key={address._id}
              style={styles.savedAddressCard}
              onPress={() => onSelect(address)}
            >
              <Text style={styles.addressType}>{address.label}</Text>
              <Text style={styles.addressDetails}>
                {address.flat}, {address.city}, {address.state} - {address.pincode}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.addAddressButton} onPress={onAdd}>
          <Text style={styles.addAddressText}>+ Add New Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addressSelectionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 20,
  },
  addressSelectionText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    fontSize: 18,
    color: "#d9534f",
  },
  savedAddressesContainer: {
    maxHeight: 300,
  },
  savedAddressCard: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addressType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 5,
  },
  addressDetails: {
    fontSize: 14,
    color: "#555",
  },
  addAddressButton: {
    backgroundColor: "#d9534f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addAddressText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  progressItem: {
    alignItems: "center",
  },
  activeStepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#d9534f",
  },
  inactiveStepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  progressLine: {
    width: 45,
    height: 2,
    backgroundColor: "#ddd",
  },
  activeStepText: {
    fontSize: 12,
    color: "#000",
    marginTop: 5,
    fontWeight: "bold",
  },
  inactiveStepText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  addressButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#d9534f",
    fontWeight: "bold",
  },
  estimateText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  estimateLink: {
    color: "#d9534f",
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    color: "#d9534f",
  },
  addNewAddressOption: {
    marginVertical: 15,
    padding: 10,
  },
  addNewAddressText: {
    fontSize: 16,
    color: "#d9534f",
  },
  savedAddresses: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  nextButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SendPackageScreen;
