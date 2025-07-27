import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const App = ({ navigation }) => {
  const features = [
    { id: '1', name: 'Todays Deliveries', icon: 'cash-outline', screen: 'DeliveryList' },
    { id: '2', name: 'Overview', icon: 'grid-outline', screen: 'Overview' },
    { id: '3', name: 'PickupList', icon: 'cube-sharp', screen: 'PickupList' },
    { id: '4', name: 'Route', icon: 'navigate', screen: 'RouteNavigation' },
    { id: '5', name: 'Scan', icon: 'scan', screen: 'ScanQr' },
    { id: '6', name: 'Logout', icon: 'exit', screen: 'Logout' },
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
        <Text style={styles.greeting}>Good Morning 👋</Text>
        <Icon name="notifications-outline" size={24} color="#333" />
      </View>
      <View style={styles.deliveryCard}>
        <Text style={styles.cardTitle}>Today's Assigned Deliveries</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <CircularProgress
              value={0}
              radius={40}
              activeStrokeWidth={10}
              inActiveStrokeWidth={10}
              activeStrokeColor="#4caf50"
              inActiveStrokeColor="#e0e0e0"
              maxValue={100}
            />
            <Text style={styles.progressLabel}>Completed</Text>
          </View>
          <View style={styles.progressItem}>
            <CircularProgress
              value={7}
              radius={40}
              activeStrokeWidth={10}
              inActiveStrokeWidth={10}
              activeStrokeColor="#ffc107"
              inActiveStrokeColor="#e0e0e0"
              maxValue={100}
            />
            <Text style={styles.progressLabel}>Pending</Text>
          </View>
          <View style={styles.progressItem}>
            <CircularProgress
              value={7}
              radius={40}
              activeStrokeWidth={10}
              inActiveStrokeWidth={10}
              activeStrokeColor="#f44336"
              inActiveStrokeColor="#e0e0e0"
              maxValue={100}
            />
            <Text style={styles.progressLabel}>Assigned</Text>
          </View>
        </View>
      </View>
      <View style={styles.nextDeliveryCard}>
        <Text style={styles.nextDeliveryTitle}>Next Delivery</Text>
        <View style={styles.nextDeliveryDetails}>
          <Icon name="location-outline" size={24} color="#FF5722" />
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryAddress}>123 Main Street, City</Text>
            <Text style={styles.deliveryTime}>Delivery Time: 10:30 AM</Text>
          </View>
          <TouchableOpacity style={styles.deliverButton}>
            <Text style={styles.deliverButtonText}>Deliver</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.sectionHeader}>Features</Text>
      <FlatList
        data={features}
        numColumns={3}
        columnWrapperStyle={styles.featureRow}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate(item.screen, { screenName: item.name })}
          >
            <Icon name={item.icon} size={32} color="#FF5722" />
            <Text style={styles.featureText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deliveryCard: {
    backgroundColor: '#CF1020',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  featureRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  featureCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  featureText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  nextDeliveryCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  nextDeliveryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  nextDeliveryDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  deliveryAddress: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#888',
  },
  deliverButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deliverButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

});

export default App;

