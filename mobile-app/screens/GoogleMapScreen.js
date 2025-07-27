import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const GoogleMapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
    return () => backHandler.remove();
  }, [navigation]);
  const handleRegionChange = async (newRegion) => {
    setRegion(newRegion);
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
    setAddress(`${reverseGeocode[0].street}, ${reverseGeocode[0].city}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select the Pickup Location</Text>
      {region ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={handleRegionChange}
          >
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              draggable
              onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
            />
            <Circle
              center={region}
              radius={100}
              strokeColor="rgba(0,0,255,0.5)"
              fillColor="rgba(0,0,255,0.2)"
            />
          </MapView>
          <View style={styles.addressContainer}>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter address manually"
              value={address}
              onChangeText={setAddress}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => alert(`Address Saved: ${address}`)}
            >
              <Text style={styles.saveButtonText}>Save Location</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading Map...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: '70%',
  },
  addressContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GoogleMapScreen;
