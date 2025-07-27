
import React, { useState, useEffect ,useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: 'Joanna Josephina',
    bio: 'I love Rosa',
    email: 'john@gmail.com',
    phone: '408-278-248',
    address: {
      line: '123 Main Street',
      city: 'San Francisco',
      taluka: 'Central',
      district: 'Bay Area',
      state: 'California',
      pincode: '123456',
    },
    profilePicture:
      'https://example.com/profile.jpg', 
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true; 
    });
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={24}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Personal Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editButton}>EDIT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profilePicture}
        />
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name="person-outline" size={20} color="#FF6347" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>FULL NAME</Text>
            <Text style={styles.detailValue}>{user.name}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Icon name="mail-outline" size={20} color="#FF6347" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>EMAIL</Text>
            <Text style={styles.detailValue}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Icon name="call-outline" size={20} color="#FF6347" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>PHONE NUMBER</Text>
            <Text style={styles.detailValue}>{user.phone}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Icon name="location-outline" size={20} color="#FF6347" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>ADDRESS</Text>
            <Text style={styles.detailValue}>
              {`${user.address.line}, ${user.address.city}, ${user.address.taluka}, ${user.address.district}, ${user.address.state} - ${user.address.pincode}`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    color: '#FF6347',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    color: '#666',
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailText: {
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
