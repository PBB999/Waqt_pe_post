import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/auth/authSlice';
import { LogOut, User2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getParcelBySenderId } from '../redux/parcel/parcelActions';
import FromMe from './FromMe';
import ToMe from './ToMe';

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('To Me');
  const authState = useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const parcelState = useSelector(state => state.parcel);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const handleShipNowPress = () => {
    navigation.navigate('SendPackage', { initialStep: 'ADDRESS' });
  };

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
    getParcelData();
  }, [userInfo]);

  const getParcelData = () => {
    if (!userInfo?._id) return;
    dispatch(getParcelBySenderId(userInfo._id));
  }

  const handleOptionPress = async (option) => {
    if (option === 'Domestic Courier') {
      navigation.navigate('SendPackage');
    } else if (option === 'Estimate Price') {
      navigation.navigate('EstimatePrice');
    } else if (option === 'International Courier') {
      navigation.navigate('Phone');
    } else if (option === 'logout') {
      try {
        await dispatch(logoutUser()).unwrap();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } catch (error) {
        console.error('Logout failed:', error);
        Alert.alert('Error', 'Failed to logout. Please try again.');
      }
    } else {
      Alert.alert('Option Selected', option);
    }
  };

  if (!authState?.userInfo) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.time}>{(new Date()).getHours()} : {(new Date()).getMinutes()}</Text>
          <View style={styles.profileContainer}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileText}>
                {authState.userInfo?.name?.charAt(0) || 'U'}
              </Text>
            </View>
            <View>
              <Text style={styles.profileName}>
                {authState.userInfo?.name || 'User'}
              </Text>
              <Text style={styles.profileNumber}>
                {authState.userInfo?.phone || 'No phone'}
              </Text>
            </View>
          </View>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>Send Anything Anywhere</Text>
          <View style={styles.sendOptions}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress('Domestic Courier')}
            >
              <Ionicons name="paper-plane" size={40} color="#d9534f" />
              <Text style={styles.optionText}>Send Courier</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Track Your Orders</Text>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'To Me' && styles.activeTab]}
              onPress={() => setActiveTab('To Me')}
            >
              <Text style={[styles.tabText, activeTab === 'To Me' && styles.activeTabText]}>
                To Me
              </Text>
              {activeTab === 'To Me' && <View style={styles.underline} />}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'From Me' && styles.activeTab]}
              onPress={() => setActiveTab('From Me')}
            >
              <Text style={[styles.tabText, activeTab === 'From Me' && styles.activeTabText]}>
                From Me
              </Text>
              {activeTab === 'From Me' && <View style={styles.underline} />}
            </TouchableOpacity>
          </View>
          <View style={styles.trackOrders}>
            {activeTab === 'To Me' ? (
              <View style={styles.emptyOrdersContainer}>
                <ToMe />
              </View>
            ) : (
              <View style={styles.fromMeContainer}>
                <FromMe />
              </View>
            )}
          </View>
        </View>

        <View style={styles.additionalOptionsContainer}>
          <TouchableOpacity
            style={styles.additionalOption}
            onPress={() => handleOptionPress('logout')}
          >
            <LogOut name="help-circle-outline" size={30} color="#333" />
            <Text style={styles.additionalText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.additionalOption}
            onPress={() => {
              navigation.navigate('UserProfile')
            }}
          >
            <User2 name="user" size={30} color="#333" />
            <Text style={styles.additionalText}>User Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  time: {
    fontSize: 14,
    color: '#888',
    fontWeight: '300'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 15,
  },
  profileIcon: {
    backgroundColor: '#FF5722',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  profileText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333'
  },
  profileNumber: {
    fontSize: 12,
    color: '#888',
    letterSpacing: 1
  },

  mainContent: {
    padding: 20,
    flex: 1
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 22,
    marginVertical: 15,
    color: '#333',
    letterSpacing: 0.5
  },
  sendOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25
  },
  option: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    transform: [{ scale: 1 }],
    transition: 'transform 0.2s',
  },
  optionText: {
    marginTop: 15,
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    letterSpacing: 0.5
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    padding: 5
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 20
  },
  activeTab: {
    backgroundColor: '#FF5722',
  },
  tabText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500'
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold'
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#FF5722',
  },

  additionalOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  additionalOption: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 15,
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  additionalText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  scrollContent: {
    // paddingBottom: 20,
  },

  optionPressed: {
    transform: [{ scale: 0.95 }],
  }
});