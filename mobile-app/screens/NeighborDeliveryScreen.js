import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView, BackHandler
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const generateTimeSlots = () => {
  const slots = [];
  const startTime = 9;
  const endTime = 18;

  for (let hour = startTime; hour <= endTime; hour++) {
    const start = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    const end = `${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour >= 12 ? 'PM' : 'AM'}`;
    const nextStart = `${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour >= 12 ? 'PM' : 'AM'}`;
    const nextEnd = `${(hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12}:00 ${hour + 1 >= 12 ? 'PM' : 'AM'}`;

    slots.push({
      label: `${start} - ${end}`,
      value: `${start} - ${end}`,
    });
    slots.push({
      label: `${nextStart} - ${nextEnd}`,
      value: `${nextStart} - ${nextEnd}`,
    });
  }

  return slots;
};

const NeighborDeliveryScreen = () => {
  const [location, setLocation] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);

  const timeSlots = generateTimeSlots();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);
  const handleGetOtp = () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a valid phone number');
    } else {
      setOtpRequested(true);
      Alert.alert('OTP Sent', `OTP sent to ${phoneNumber}`);
    }
  };

  const handleConfirm = () => {
    if (!location || !phoneNumber || !deliveryTime || !otp) {
      Alert.alert('Error', 'Please fill all the fields');
    } else {
      Alert.alert(
        'Delivery Confirmed',
        `Parcel will be delivered to ${location} at ${deliveryTime}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Select Location</Text>
          <RNPickerSelect
            onValueChange={(value) => setLocation(value)}
            items={[
              { label: 'Neighbor A', value: 'Neighbor A' },
              { label: 'Neighbor B', value: 'Neighbor B' },
              { label: 'Neighbor C', value: 'Neighbor C' },
            ]}
            style={{
              inputAndroid: styles.input,
              inputIOS: styles.input,
            }}
            placeholder={{ label: 'Choose a location...', value: null }}
          />
          <Text style={styles.label}>Delivery Time</Text>
          <RNPickerSelect
            onValueChange={(value) => setDeliveryTime(value)}
            items={timeSlots}
            style={{
              inputAndroid: styles.input,
              inputIOS: styles.input,
            }}
            placeholder={{ label: 'Select a time slot...', value: null }}
          />
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.flexInput]}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity style={styles.otpButton} onPress={handleGetOtp}>
              <Text style={styles.otpButtonText}>Get OTP</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
        </ScrollView>
        <TouchableOpacity
          style={[styles.button, styles.confirmButton, styles.fixedConfirmButton]}
          onPress={handleConfirm}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  timeButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeButtonText: {
    color: 'black',
    fontSize: 16,
  },
  arrowIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  flexInput: {
    flex: 1,
    marginRight: 10,
  },
  otpButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  otpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fixedConfirmButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default NeighborDeliveryScreen;
