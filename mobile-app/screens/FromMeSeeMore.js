import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getParcelBySenderId } from '../redux/parcel/parcelActions';
const FromMe = ({ navigation }) => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null);
    const parcelState = useSelector(state => state.parcel);
    const senderParcels = parcelState.senderParcels;
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            navigation.goBack();
            return true;
        });
        return () => backHandler.remove();
    }, [navigation]);

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
        if (!userInfo || !userInfo._id) return;
        dispatch(getParcelBySenderId(userInfo._id));
    }, [userInfo])

    useEffect(() => {
        if (!senderParcels) return;
        setDeliveries(senderParcels.map((parcel, index) => (
            {
                id: parcel._id,
                name: parcel._id,
                address: `${parcel.deliveryAddress.flat}, ${parcel.deliveryAddress.city}`,
                time: `${(new Date(parcel.timeSlot.startTime)).toLocaleTimeString()} - ${(new Date(parcel.timeSlot.endTime)).toLocaleTimeString()}`,
                status: parcel.status,
                data: parcel
            }
        )))
    }, [parcelState.senderParcels]);

    const [filter, setFilter] = useState('All');

    const filteredDeliveries = deliveries.filter((item) => {
        if (filter === 'All') return true;
        return item.status === filter;
    });

    const renderDeliveryItem = ({ item }) => (
        <View style={styles.deliveryCard}>
            <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryId}>Delivery #{item.name}</Text>
                <View style={styles.addressContainer}>
                    <Icon name="location-outline" size={16} color="#FF5722" />
                    <Text style={styles.deliveryAddress}>{item.address}</Text>
                </View>
                <Text style={styles.deliveryTime}>Time: {item.time}</Text>
                <Text style={[styles.deliveryStatus, item.status === 'Delivered' ? styles.completed : item.status === 'Reschedule' ? styles.rescheduled : styles.pending]}>
                    Status: {item.status}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('DeliveryDetails', { deliveryId: item.id })}
            >
                <Text style={styles.detailsButtonText}>Details</Text>
                <Icon name="chevron-forward-outline" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Deliveries</Text>
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'All' && styles.selectedFilter]}
                    onPress={() => setFilter('All')}
                >
                    <Text style={styles.filterText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'Pending' && styles.selectedFilter]}
                    onPress={() => setFilter('Pending')}
                >
                    <Text style={styles.filterText}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'Delivered' && styles.selectedFilter]}
                    onPress={() => setFilter('Delivered')}
                >
                    <Text style={styles.filterText}>Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'Reschedule' && styles.selectedFilter]}
                    onPress={() => setFilter('Reschedule')}
                >
                    <Text style={styles.filterText}>Reschedule</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredDeliveries}
                keyExtractor={(item) => item.id}
                renderItem={renderDeliveryItem}
                contentContainerStyle={styles.listContainer}
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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
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
        backgroundColor: '#FF5722',
        borderColor: '#FF5722',
    },
    filterText: {
        fontSize: 14,
        color: '#333',
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    deliveryCard: {
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
    deliveryInfo: {
        flex: 1,
        marginRight: 10,
    },
    deliveryId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    deliveryAddress: {
        fontSize: 14,
        color: '#555',
        marginLeft: 5,
    },
    deliveryTime: {
        fontSize: 14,
        color: '#888',
    },
    deliveryStatus: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
    },
    completed: {
        color: '#4caf50',
    },
    pending: {
        color: '#ff9800',
    },
    rescheduled: {
        color: '#f44336',
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF5722',
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

export default FromMe;
