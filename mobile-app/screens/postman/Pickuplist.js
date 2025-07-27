import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
const PickupsList = ({ navigation }) => {
  const pickups = [
    { id: '1', address: '123 Main Street, City', time: '10:00 AM', status: 'Scheduled' },
    { id: '2', address: '456 Elm Street, Town', time: '11:15 AM', status: 'Completed' },
    { id: '3', address: '789 Oak Avenue, Village', time: '12:30 PM', status: 'Scheduled' },
    { id: '4', address: '321 Pine Lane, Suburb', time: '02:45 PM', status: 'Reschedule' },
  ];

  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPickups = pickups.filter((item) => {
    const matchesStatus = filter === 'All' || item.status === filter;
    const matchesSearch = item.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);
  const renderPickupItem = ({ item }) => (
    <View style={styles.pickupCard}>
      <View style={styles.pickupInfo}>
        <Text style={styles.pickupId}>Pickup #{item.id}</Text>
        <View style={styles.addressContainer}>
          <Icon name="location-outline" size={16} color="#ff4d4d" />
          <Text style={styles.pickupAddress}>{item.address}</Text>
        </View>
        <Text style={styles.pickupTime}>Time: {item.time}</Text>
        <Text style={[styles.pickupStatus,
        item.status === 'Completed'
          ? styles.completed
          : item.status === 'Reschedule'
            ? styles.rescheduled
            : styles.scheduled
        ]}>
          Status: {item.status}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('PickupDetails', { pickupId: item.id })}
      >
        <Text style={styles.detailsButtonText}>Details</Text>
        <Icon name="chevron-forward-outline" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pickups</Text>
      <TextInput
        style={styles.searchBox}
        placeholder="Search by address..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'All' && styles.selectedFilter]}
          onPress={() => setFilter('All')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Scheduled' && styles.selectedFilter]}
          onPress={() => setFilter('Scheduled')}
        >
          <Text style={styles.filterText}>Scheduled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Completed' && styles.selectedFilter]}
          onPress={() => setFilter('Completed')}
        >
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Reschedule' && styles.selectedFilter]}
          onPress={() => setFilter('Reschedule')}
        >
          <Text style={styles.filterText}>Reschedule</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPickups}
        keyExtractor={(item) => item.id}
        renderItem={renderPickupItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchBox: {
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedFilter: {
    backgroundColor: '#ff4d4d',
    borderColor: '#ff4d4d',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  pickupCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickupInfo: {
    flex: 1,
    marginRight: 10,
  },
  pickupId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  pickupAddress: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  pickupTime: {
    fontSize: 14,
    color: '#888',
  },
  pickupStatus: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  completed: {
    color: '#4caf50',
  },
  scheduled: {
    color: '#ff9800',
  },
  rescheduled: {
    color: '#f44336',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#FFF',
    fontSize: 14,
    marginRight: 5,
  },
});

export default PickupsList;
