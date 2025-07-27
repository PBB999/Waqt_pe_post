import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getParcelById } from '../../redux/parcel/parcelActions';
import axios from 'axios';
const dummyDeliveryData = {
  deliveryId: '12345',
  sender: {
    name: 'John Doe',
    address: '789 Oak Avenue, Village',
    mobile: '9876543210',
    pincode: '411001',
    city: 'Pune',
    taluka: 'Haveli',
    district: 'Pune',
    state: 'Maharashtra',
  },
  receiver: {
    name: 'Jane Smith',
    address: '123 Pine Road, Town',
    mobile: '9123456780',
    pincode: '400001',
    city: 'Mumbai',
    taluka: 'Mumbai City',
    district: 'Mumbai',
    state: 'Maharashtra',
  },
  deliveryTime: '3:00 PM - 5:00 PM',
  specialInstructions: 'Leave at the doorstep if no one is available.',
  status: 'In Progress',
};

const DeliveryDetails = ({ route, navigation }) => {
  const { deliveryId } = route.params || { deliveryId: dummyDeliveryData.deliveryId };
  const dispatch = useDispatch();
  const currentParcel = useSelector((state) => state.parcel.currentParcel);
  useEffect(() => {
    dispatch(getParcelById(deliveryId));
  }, [deliveryId]);
  const [deliveryData, setDeliveryData] = useState(dummyDeliveryData);

  useEffect(() => {
    if (currentParcel) {
      setDeliveryData({
        deliveryId: currentParcel._id,
        sender: {
          name: currentParcel.senderId.name,
          address: `${currentParcel.pickupAddress.flat}, ${currentParcel.pickupAddress.city}`,
          mobile: currentParcel.pickupAddress.mobileNumber,
          pincode: currentParcel.pickupAddress.pincode,
          city: currentParcel.pickupAddress.city,
          taluka: currentParcel.pickupAddress.area,
          district: currentParcel.pickupAddress.city,
          state: currentParcel.pickupAddress.state,
        },
        receiver: {
          name: currentParcel.receiverId.name,
          address: `${currentParcel.deliveryAddress.flat}, ${currentParcel.deliveryAddress.city}`,
          mobile: currentParcel.deliveryAddress.mobileNumber,
          pincode: currentParcel.deliveryAddress.pincode,
          city: currentParcel.deliveryAddress.city,
          taluka: currentParcel.deliveryAddress.area,
          district: currentParcel.deliveryAddress.city,
          state: currentParcel.deliveryAddress.state,
        },
        deliveryTime: `${(new Date(currentParcel.timeSlot.startTime)).toLocaleTimeString()} - ${(new Date(currentParcel.timeSlot.endTime)).toLocaleTimeString()}`,
        specialInstructions: 'Leave at the doorstep if no one is available.',
        status: currentParcel.status,
      });
    }
  }, [currentParcel]);

  const [otpModalVisible, setOtpModalVisible] = useState(false);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [actualOtp] = useState('5678');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    setOtp(newOtp);
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);
  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    if (otp.join('') === actualOtp) {
      setOtpModalVisible(false);
      setSuccessModalVisible(true);
      setDeliveryData({ ...deliveryData, status: 'Delivered' });
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const sendOtp = async () => {
    const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.get(`${API_BASE_URL}/api/otp/send-otp`);
    return response;
  };

  const verifyOtp1 = async () => {
    const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.post(`${API_BASE_URL}/api/otp/verify-otp`, {
      phoneNumber: deliveryData.sender.mobile,
      otp: otp.join(''),
      deliveryId: deliveryData.deliveryId
    });

    console.log(response.data);

    if (response.data.success) {
      setOtpModalVisible(false);
      setSuccessModalVisible(true);
      setDeliveryData({ ...deliveryData, status: 'Delivered' });
    } else {
      Alert.alert('Error', response.data.message);
    }
  }

  const handleDelivery = async () => {
    console.log("handleDelivery");
    const response = await sendOtp();
    console.log(response);
    setOtpModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Delivery Details</Text>

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Delivery #{deliveryData.deliveryId}</Text>

        <Text style={styles.sectionHeader}>Sender Information</Text>
        {renderAddressDetails(deliveryData.sender)}

        <Text style={styles.sectionHeader}>Receiver Information</Text>
        {renderAddressDetails(deliveryData.receiver)}

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Delivery Time:</Text>
          <Text style={styles.value}>{deliveryData.deliveryTime}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Special Instructions:</Text>
          <Text style={styles.value}>{deliveryData.specialInstructions}</Text>
        </View>

        <Text
          style={[styles.status, deliveryData.status === 'Delivered' ? styles.completed : styles.pending]}
        >
          Status: {deliveryData.status}
        </Text>
      </View>

      {deliveryData.status !== 'Delivered' && (
        <TouchableOpacity style={styles.button} onPress={handleDelivery}>
          <Icon name="checkmark-done-outline" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Confirm Delivery</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#FFF" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={otpModalVisible}
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <KeyboardAvoidingView style={styles.modalContainer} behavior="padding">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verify Delivery OTP</Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  autoFocus={index === 0}
                />
              ))}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={verifyOtp1}>
                <Text style={styles.modalButtonText}>Verify</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setOtpModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.successModalContainer}>
          <View style={styles.successModalContent}>
            <Icon name="checkmark-circle-outline" size={80} color="#4CAF50" />
            <Text style={styles.successText}>Delivery Successful!</Text>
            <TouchableOpacity
              style={styles.successButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.successButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const renderAddressDetails = (details) => (
  <>
    <View style={styles.infoContainer}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{details.name}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.value}>{details.address}</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  completed: {
    color: '#4caf50',
  },
  pending: {
    color: '#ff9800',
  },
  button: {
    backgroundColor: '#ff4d4d',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: '#FF5722',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    width: '100%',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#FF5722',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  otpInput: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    textAlign: 'center',
    width: 50,
  },
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  successModalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  successButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  successButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeliveryDetails;