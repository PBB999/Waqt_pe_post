import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodaysDeliveriesByPostmanId } from '../../redux/parcel/parcelActions';

const { height } = Dimensions.get('window');

const RouteNavigation = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const parcelState = useSelector((state) => state.parcel);
  const loading = parcelState.loading;
  const dispatch = useDispatch();
  const [deliveries, setDeliveries] = useState([]);

  const getUserInfo = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfoObject = JSON.parse(userInfoString);
        setUserInfo(userInfoObject);
      } else {
        console.warn('No user info found in storage');
      }
    } catch (error) {
      console.error('Error retrieving user info:', error);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };
  
  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!userInfo || !userInfo.postmanId) return;
    dispatch(getTodaysDeliveriesByPostmanId(userInfo.postmanId));
  }, [userInfo]);

  useEffect(() => {
    if (!parcelState.parcelsToday) return;
    setDeliveries(
      parcelState.parcelsToday.map((parcel, index) => ({
        name: `Delivery ${index + 1}`,
        latitude: parcel.deliveryAddress.location.latitude,
        longitude: parcel.deliveryAddress.location.longitude,
        id: parcel._id,
        address: `${parcel.deliveryAddress.flat}, ${parcel.deliveryAddress.city}`,
      }))
    );
    if (parcelState.parcelsToday.length > 0) {
      setInitialRegion({
        latitude: parcelState.parcelsToday[0].deliveryAddress.location.latitude,
        longitude: parcelState.parcelsToday[0].deliveryAddress.location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [parcelState.parcelsToday]);

  const translateY = useSharedValue(height * 0.25);
  const isScrolling = useSharedValue(false);
  const isDragging = useSharedValue(false);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startY = translateY.value;
      isDragging.value = true;
    },
    onActive: (event, context) => {
      if (!isScrolling.value) {
        translateY.value = Math.max(
          height * 0.1,
          Math.min(height, context.startY + event.translationY)
        );
      }
    },
    onEnd: () => {
      const snapPoints = [height * 0.1, height * 0.25, height * 0.5, height * 0.9];
      const nearestSnapPoint = snapPoints.reduce((prev, curr) =>
        Math.abs(curr - translateY.value) < Math.abs(prev - translateY.value) ? curr : prev
      );
      translateY.value = withSpring(nearestSnapPoint, {
        damping: 25,
        stiffness: 200,
      });
      isDragging.value = false;
    },
  });

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const openNavigation = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  const renderItem = ({ item }) => (
    <View style={styles.deliveryCard}>
      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryName}>{item.name}</Text>
        <Text style={styles.deliveryAddress}>{item.address}</Text>
      </View>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => openNavigation(item.latitude, item.longitude)}
      >
        <Text style={styles.actionButtonText}>Navigate</Text>
      </TouchableOpacity>
    </View>
  );

  const handleListScrollBegin = () => {
    isScrolling.value = true;
  };

  const handleListScrollEnd = () => {
    isScrolling.value = false;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <MapView
            style={styles.map}
            region={initialRegion}
            showsUserLocation
            loadingEnabled
          >
            {deliveries.map((delivery) => (
              <Marker
                key={delivery.id}
                coordinate={{
                  latitude: delivery.latitude,
                  longitude: delivery.longitude,
                }}
                title={delivery.name}
                description={delivery.address}
              />
            ))}
          </MapView>)}

        <PanGestureHandler onGestureEvent={gestureHandler} enabled={!isScrolling.value}>
          <Animated.View style={[styles.bottomSheet, bottomSheetStyle]}>
            <View style={styles.handle} />
            <FlatList
              ListHeaderComponent={
                <View style={styles.searchContainer}>
                  <TextInput style={styles.searchInput} placeholder="Search Location" />
                </View>
              }
              data={deliveries}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={true}
              scrollEventThrottle={16}
              onScrollBeginDrag={handleListScrollBegin}
              onScrollEndDrag={handleListScrollEnd}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  handle: {
    width: 100,
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  deliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    elevation: 2,
  },
  deliveryInfo: { flex: 1 },
  deliveryName: { fontSize: 16, fontWeight: 'bold' },
  deliveryAddress: { fontSize: 14, color: '#555' },
  deliveryDistance: { fontSize: 14, color: '#888' },
  actionButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});

export default RouteNavigation;