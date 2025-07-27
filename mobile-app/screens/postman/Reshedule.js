

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RescheduleScreen = ({ navigation }) => {
  const [isManualAddressVisible, setIsManualAddressVisible] = useState(false);
  const [selectedSaveAs, setSelectedSaveAs] = useState('');
  const [otherAddress, setOtherAddress] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    flat: '',
    area: '',
    pincode: '',
    city: '',
    state: '',
  });

  const handleManualAddressSubmit = () => {
    setIsManualAddressVisible(false);
    Alert.alert("Address Updated", "Your address has been updated successfully!");
  };

  const handleTimeSlotChange = (slot) => {
    setSelectedTimeSlot(slot);
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);
  const handleSaveChanges = () => {
    if (!selectedTimeSlot || !newAddress.name || !newAddress.phone) {
      Alert.alert('Error', 'Please fill in all the required fields.');
      return;
    }

    Alert.alert('Changes Saved', 'Your delivery address and time slot have been updated.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>Reschedule Delivery</Text>

      <View style={styles.card}>
        <Text style={styles.addressTitle}>Current Address</Text>
        <Text style={styles.addressLine}>John Doe</Text>
        <Text style={styles.addressLine}>123 Main St, Apt 4B</Text>
        <Text style={styles.addressLine}>New York, NY 10001</Text>
        <Text style={styles.addressLine}>
          <FontAwesome name="phone" size={14} /> +1 123-456-7890
        </Text>
        <TouchableOpacity
          style={styles.changeAddressText}
          onPress={() => setIsManualAddressVisible(true)}
        >
          <Text style={styles.changeAddressTextStyle}>Change Address</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Select Time Slot</Text>
        <Picker
          selectedValue={selectedTimeSlot}
          style={styles.picker}
          onValueChange={handleTimeSlotChange}
        >
          <Picker.Item label="9:00 AM - 12:00 PM" value="9:00 AM - 12:00 PM" />
          <Picker.Item label="12:00 PM - 3:00 PM" value="12:00 PM - 3:00 PM" />
          <Picker.Item label="3:00 PM - 6:00 PM" value="3:00 PM - 6:00 PM" />
          <Picker.Item label="6:00 PM - 9:00 PM" value="6:00 PM - 9:00 PM" />
        </Picker>
      </View>

      {isManualAddressVisible && (
        <View style={styles.addAddressScreen}>
          <ScrollView>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor="#aaa"
              value={newAddress.name}
              onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
            />

            <Text style={styles.label}>
              <FontAwesome name="phone" size={16} /> Mobile Number
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={newAddress.phone}
              onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
            />

            <Text style={styles.label}>Flat, Housing no., Building, Apartment</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Flat, Housing no., Building, Apartment"
              placeholderTextColor="#aaa"
              value={newAddress.flat}
              onChangeText={(text) => setNewAddress({ ...newAddress, flat: text })}
            />

            <Text style={styles.label}>Area, Street, Sector</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Area, Street, Sector"
              placeholderTextColor="#aaa"
              value={newAddress.area}
              onChangeText={(text) => setNewAddress({ ...newAddress, area: text })}
            />

            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pincode"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
              value={newAddress.pincode}
              onChangeText={(text) => setNewAddress({ ...newAddress, pincode: text })}
            />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter city"
                  placeholderTextColor="#aaa"
                  value={newAddress.city}
                  onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter state"
                  placeholderTextColor="#aaa"
                  value={newAddress.state}
                  onChangeText={(text) => setNewAddress({ ...newAddress, state: text })}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.addAddressButton}
              onPress={handleManualAddressSubmit}
            >
              <Text style={styles.addAddressText}>Update Address</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
      <TouchableOpacity
        style={styles.saveChangesButton}
        onPress={handleSaveChanges}
      >
        <Text style={styles.saveChangesButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    color: '#333',
  },
  addressLine: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  changeAddressText: {
    position: 'absolute',
    right: 20,
    bottom: 15,
  },
  changeAddressTextStyle: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 15,
    color: '#444',
    marginVertical: 5,
    fontWeight: '600',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  addAddressScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    padding: 20,
    zIndex: 10,
  },
  addAddressButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addAddressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveChangesButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  saveChangesButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RescheduleScreen;
