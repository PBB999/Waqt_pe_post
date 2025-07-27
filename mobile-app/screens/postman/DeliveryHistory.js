
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
const DeliveryHistory = ({ navigation }) => {
  const [deliveries, setDeliveries] = useState([
    { id: '1', date: '2024-11-22', status: 'Delivered', from: '123 Main St', to: '456 Elm St', person: 'John Doe' },
    { id: '2', date: '2024-11-21', status: 'Rescheduled', from: '789 Pine St', to: '321 Oak St', person: 'Jane Smith' },
    { id: '3', date: '2024-11-20', status: 'Delivered', from: '654 Maple St', to: '987 Birch St', person: 'Alice Johnson' },
    { id: '4', date: '2024-11-19', status: 'Rescheduled', from: '100 Cedar St', to: '200 Spruce St', person: 'Bob Brown' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch = searchQuery
      ? delivery.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.to.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesStatus = statusFilter ? delivery.status === statusFilter : true;

    const matchesDateRange =
      (!startDate || new Date(delivery.date) >= startDate) &&
      (!endDate || new Date(delivery.date) <= endDate);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter(null);
    setStartDate(null);
    setEndDate(null);
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delivery History</Text>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#333" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by address"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Icon name="filter-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredDeliveries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deliveryCard}>
            <View style={styles.deliveryHeader}>
              <Text style={styles.personName}>{item.person}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('DeliveryDetails', { deliveryId: item.id })}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.deliveryDate}>{item.date}</Text>
            <Text style={styles.deliveryAddress}>From: {item.from}</Text>
            <Text style={styles.deliveryAddress}>To: {item.to}</Text>
            {item.status === 'Delivered' ? (
              <Icon name="checkmark-circle-outline" size={20} color="#4caf50" />
            ) : (
              <Icon name="reload-outline" size={20} color="#ff9800" />
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noDeliveriesText}>No deliveries found.</Text>}
      />

      <Modal visible={showFilterModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Filters</Text>

            <Text style={styles.filterLabel}>Status</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  statusFilter === 'Delivered' && styles.activeFilter,
                ]}
                onPress={() => setStatusFilter('Delivered')}
              >
                <Text
                  style={[
                    styles.filterText,
                    statusFilter === 'Delivered' && styles.activeFilterText,
                  ]}
                >
                  Delivered
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  statusFilter === 'Rescheduled' && styles.activeFilter,
                ]}
                onPress={() => setStatusFilter('Rescheduled')}
              >
                <Text
                  style={[
                    styles.filterText,
                    statusFilter === 'Rescheduled' && styles.activeFilterText,
                  ]}
                >
                  Rescheduled
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.filterLabel}>Date Range</Text>
            <TouchableOpacity onPress={() => setShowStartPicker(true)}>
              <Text style={styles.dateFilterText}>
                Start: {startDate ? startDate.toLocaleDateString() : 'Select'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
              <Text style={styles.dateFilterText}>
                End: {endDate ? endDate.toLocaleDateString() : 'Select'}
              </Text>
            </TouchableOpacity>

            {showStartPicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                onChange={(event, date) => {
                  setShowStartPicker(false);
                  if (date) setStartDate(date);
                }}
              />
            )}
            {showEndPicker && (
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                onChange={(event, date) => {
                  setShowEndPicker(false);
                  if (date) setEndDate(date);
                }}
              />
            )}
            <View style={styles.modalActions}>
              <Button title="Apply" onPress={() => setShowFilterModal(false)} />
              <Button title="Clear Filters" color="red" onPress={clearFilters} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  deliveryCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsButton: {
    padding: 5,
    backgroundColor: '#FF5722',
    borderRadius: 5,
  },
  detailsButtonText: {
    fontSize: 12,
    color: '#FFF',
  },
  noDeliveriesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  filterOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
  },
  activeFilterText: {
    color: '#FFF',
  },
  dateFilterText: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 5,
  },
  modalActions: {
    marginTop: 20,
  },
});

export default DeliveryHistory;
