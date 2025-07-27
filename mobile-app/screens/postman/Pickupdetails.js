
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
const dummyPickupData = {
  pickupId: '67890',
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
  preferredTime: '10:00 AM - 12:00 PM',
  otherDetails: 'Handle with care. Fragile items included.',
  status: 'Scheduled',
};

const PickupDetails = ({ route, navigation }) => {
  const { pickupId } = route.params || { pickupId: dummyPickupData.pickupId };
  const [pickupData, setPickupData] = useState(dummyPickupData);

  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [actualOtp] = useState('1234');
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

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);
  const verifyOtp = () => {
    if (otp.join('') === actualOtp) {
      setOtpModalVisible(false);
      setSuccessModalVisible(true);
      setPickupData({ ...pickupData, status: 'Completed' });
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const handlePickup = () => {
    setOtpModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Pickup Details</Text>

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Pickup #{pickupData.pickupId}</Text>
        <Text style={styles.sectionHeader}>Sender Information</Text>
        {renderAddressDetails(pickupData.sender)}
        <Text style={styles.sectionHeader}>Receiver Information</Text>
        {renderAddressDetails(pickupData.receiver)}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Preferred Time:</Text>
          <Text style={styles.value}>{pickupData.preferredTime}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Other Details:</Text>
          <Text style={styles.value}>{pickupData.otherDetails}</Text>
        </View>
        <Text
          style={[styles.status, pickupData.status === 'Completed' ? styles.completed : styles.pending]}
        >
          Status: {pickupData.status}
        </Text>
      </View>
      {pickupData.status !== 'Completed' && (
        <TouchableOpacity style={styles.button} onPress={handlePickup}>
          <Icon name="checkmark-done-outline" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Confirm Pickup</Text>
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
            <Text style={styles.modalTitle}>Verify OTP</Text>
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
              <TouchableOpacity style={styles.modalButton} onPress={verifyOtp}>
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
            <Text style={styles.successText}>Pickup Successful!</Text>
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

export default PickupDetails;
