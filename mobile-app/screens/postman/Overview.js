import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
const OverviewPage = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;

  const deliveryStats = {
    total: 500,
    delivered: 400,
    pending: 50,
    rescheduled: 50,
  };

  const pieChartData = [
    { name: 'Delivered', population: 400, color: '#4CAF50', legendFontColor: '#4CAF50' },
    { name: 'Pending', population: 50, color: '#FFC107', legendFontColor: '#FFC107' },
    { name: 'Rescheduled', population: 50, color: '#F44336', legendFontColor: '#F44336' },
  ];

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ data: [50, 80, 70, 100, 90, 120] }],
  };

  const [selectedStat, setSelectedStat] = useState('total');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [deliveries, setDeliveries] = useState([
    { id: '1', name: 'John Doe', status: 'Delivered', date: '2024-11-20' },
    { id: '2', name: 'Jane Smith', status: 'Pending', date: '2024-11-21' },
    { id: '3', name: 'Mark Wilson', status: 'Rescheduled', date: '2024-11-22' },
  ]);
  const [searchText, setSearchText] = useState('');

  const filteredDeliveries = deliveries.filter((delivery) =>
    delivery.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const statistics = [
    { key: 'total', label: 'Total', value: deliveryStats.total, color: '#2196F3' },
    { key: 'delivered', label: 'Delivered', value: deliveryStats.delivered, color: '#4CAF50' },
    { key: 'pending', label: 'Pending', value: deliveryStats.pending, color: '#FFC107' },
    { key: 'rescheduled', label: 'Rescheduled', value: deliveryStats.rescheduled, color: '#F44336' },
  ];
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Overview</Text>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Icon name="filter-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.statsRow}>
        {statistics.map((stat) => (
          <TouchableOpacity
            key={stat.key}
            style={[
              styles.statButton,
              selectedStat === stat.key && { backgroundColor: stat.color },
            ]}
            onPress={() => setSelectedStat(stat.key)}
          >
            <Text style={[styles.statValue, selectedStat === stat.key && styles.selectedValue]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, selectedStat === stat.key && styles.selectedLabel]}>
              {stat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.analyticsContainer}>
        {selectedStat === 'total' ? (
          <PieChart
            data={pieChartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        ) : (
          <BarChart
            data={barChartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
          />
        )}
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search deliveries"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={() => setSearchText('')}>
          <Icon name="close-circle-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredDeliveries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deliveryCard}>
            <View>
              <Text style={styles.deliveryText}>{item.name}</Text>
              <Text style={styles.deliveryStatus}>{item.status}</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.deliveryDate}>{item.date}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Deliveries</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Icon name="close-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.filterOption}>By Week</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.filterOption}>By Month</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.filterOption}>By Date Range</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 5 },
  selectedValue: { color: '#FFF' },
  selectedLabel: { color: '#FFF' },
  analyticsContainer: { marginBottom: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 5,
  },
  searchInput: { flex: 1, fontSize: 16 },
  deliveryCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
  },
  deliveryText: { fontSize: 14, color: '#333', fontWeight: 'bold' },
  deliveryStatus: { fontSize: 12, color: '#666' },
  deliveryDate: { fontSize: 12, color: '#888' },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  filterOption: { fontSize: 16, color: '#333', marginBottom: 15 },
});

export default OverviewPage;
