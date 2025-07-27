import React, { useState, useEffect ,useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,ScrollView
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as LocationGeocoding from 'expo-location';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const PickupLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [selectedSaveAs, setSelectedSaveAs] = useState(null);

  const navigation = useNavigation();
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [region, setRegion] = useState({
    latitude: 19.8897,
    longitude: 74.4785,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isAddAddressScreenVisible, setAddAddressScreenVisible] = useState(false);

  const [otherAddress, setOtherAddress] = useState('');

  const [manualAddress, setManualAddress] = useState('');
  const [isManualAddressVisible, setManualAddressVisible] = useState(false);
  const openAddAddressScreen = () => {
    closeSecondSheet();
    setAddAddressScreenVisible(true);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
    return () => backHandler.remove();
  }, [navigation]);

  const closeAddAddressScreen = () => {
    setAddAddressScreenVisible(false);
    setSelectedSaveAs(null); 
    setOtherAddress(''); 
    navigation.navigate('SendPackage'); 
  };
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    };

    getLocation();
  }, []);
  useFocusEffect(
    useCallback(() => {
      setSelectedSaveAs(null);
      setMarkerCoordinates(null);
      setAddress('');
      setSearchQuery('');
      setRegion({
        latitude: 19.8897,
        longitude: 74.4785,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setAddAddressScreenVisible(false);
      setOtherAddress('');
      setManualAddress('');
      setManualAddressVisible(false);

      return () => {
      };
    }, [])
  );
  const handleSearch = async () => {
    try {
      const results = await LocationGeocoding.geocodeAsync(searchQuery);
      if (results.length > 0) {
        const { latitude, longitude } = results[0];
        setRegion({
          ...region,
          latitude,
          longitude,
        });
        setMarkerCoordinates({ latitude, longitude });
        await fetchAddress(latitude, longitude);
      } else {
        alert('Location not found!');
      }
    } catch (error) {
      console.error('Error while searching location:', error);
    }
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerCoordinates({ latitude, longitude });
    await fetchAddress(latitude, longitude);
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const addressResults = await LocationGeocoding.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResults.length > 0) {
        console.log('Full Address Details:', addressResults[0]);
        setAddress(JSON.stringify(addressResults[0], null, 2));
      } else {
        alert('Unable to fetch address!');
      }
    } catch (error) {
      console.error('Error while fetching address:', error);
    }
  };

  const handleManualAddressSubmit = () => {
    setAddress(manualAddress); 
    setManualAddressVisible(false); 
    closeAddAddressScreen(); 
  };


  if (!location) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        region={region}
        onPress={handleMapPress}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {markerCoordinates && (
          <Marker
            coordinate={markerCoordinates}
            title="Selected Location"
            description={address ? 'Tap Save to log address' : 'Fetching address...'}
          />
        )}
      </MapView>

      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          console.log('Final Selected Coordinates:', markerCoordinates);
          console.log('Final Address:', address);
        }}
      >
        <Text style={styles.saveButtonText}>Save Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addAddressButton}
        onPress={() => setManualAddressVisible(true)}
      >
        <Text style={styles.addAddressText}>Add Address Manually</Text>
      </TouchableOpacity>

      {isManualAddressVisible && (
        <View style={styles.addAddressScreen}>
          <ScrollView>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>
              <FontAwesome name="phone" size={16} /> Mobile Number
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
            />
            <Text style={styles.label}>Flat, Housing no., Building, Apartment</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Flat, Housing no., Building, Apartment"
              placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>Area, Street, Sector</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Area, Street, Sector"
              placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pincode"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
            />
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter city"
                  placeholderTextColor="#aaa"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter state"
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>
            <Text style={styles.label}>Save as</Text>
            <View style={styles.saveAsContainer}>
              {['Home', 'Work', 'Other'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.saveAsButton, selectedSaveAs === option && styles.selectedSaveAsButton]}
                  onPress={() => setSelectedSaveAs(option)}>
                  <Text>
                    {option === 'Home' && <MaterialIcons name="home" size={16} />}
                    {option === 'Work' && <MaterialIcons name="work" size={16} />}
                    {option === 'Other' && <MaterialIcons name="location-on" size={16} />}  {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedSaveAs === 'Other' && (
              <>
                <Text style={styles.label}>Other Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Friend's home, New office"
                  placeholderTextColor="#aaa"
                  value={otherAddress}
                  onChangeText={setOtherAddress}
                />
              </>
            )}
            <TouchableOpacity style={styles.addAddressButton} onPress={handleManualAddressSubmit}>
              <Text style={styles.addAddressText}>Add Pickup Address</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )} 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  addressContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addAddressButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  addAddressText: {
    color: '#fff',
    fontWeight: 'bold',
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
  label: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveAsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  saveAsButton: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
 
  selectedSaveAsButton: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  addAddressButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    width: '80%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addAddressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PickupLocationScreen;
