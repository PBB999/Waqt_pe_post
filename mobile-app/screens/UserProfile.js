import React, { use, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import {
    Ionicons,
    MaterialIcons,
    FontAwesome5,
    Feather
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    type: 'Premium User',
    profilePicture: null,
    addresses: [
        { id: 1, title: 'Home', description: '123 Main St, Anytown, USA' },
        { id: 2, title: 'Office', description: '456 Business Ave, Cityville, USA' }
    ],
    parcels: {
        sent: [
            { id: 'SP001', status: 'Delivered', date: '2024-02-15' },
            { id: 'SP002', status: 'In Transit', date: '2024-03-01' }
        ],
        received: [
            { id: 'RP001', status: 'Delivered', date: '2024-01-20' }
        ]
    },
    beneficiaries: [
        { id: 1, name: 'Jane Smith', profilePicture: null },
        { id: 2, name: 'Mike Johnson', profilePicture: null }
    ],
    notifications: [
        { id: 1, message: 'Parcel SP001 has been delivered', timestamp: '2h ago' },
        { id: 2, message: 'New beneficiary added', timestamp: '1d ago' }
    ]
};

const ProfilePage = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Addresses');
    const screenWidth = Dimensions.get('window').width;
    const authState = useSelector((state) => state.auth);
    console.log("authState", authState);

    const renderProfileHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.editIconContainer} onPress={() => navigation.navigate('UpdateUser')}>
                <Ionicons name="create-outline" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.nameText}>{authState.userInfo.name}</Text>
        </View>
    );

    const renderUserDetails = () => (
        <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
                <MaterialIcons name="email" size={20} color="#666" />
                <Text style={styles.detailText}>{authState.userInfo.email}</Text>
            </View>
            <View style={styles.detailRow}>
                <Ionicons name="phone-portrait" size={20} color="#666" />
                <Text style={styles.detailText}>{authState.userInfo.phone}</Text>
            </View>
            <View style={styles.detailRow}>
                <FontAwesome5 name="user-tag" size={20} color="#666" />
                <Text style={styles.detailText}>{authState.userInfo.type}</Text>
            </View>
        </View>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Addresses':
                return (
                    <View>
                        {authState.userInfo.addressIds.map(addressId => (
                            <View key={addressId} style={styles.cardContainer}>
                                <Text style={styles.cardTitle}>Address {addressId}</Text>
                            </View>
                        ))}
                        <TouchableOpacity style={styles.addButton}>
                            <Ionicons name="add" size={20} color="white" />
                            <Text style={styles.addButtonText}>Add New Address</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'Parcels':
                return (
                    <View>
                    </View>
                );
            case 'Beneficiaries':
                return (
                    <View>
                    </View>
                );
            case 'Notifications':
                return (
                    <View>
                    </View>
                );
        }
    };

    const renderTabNavigation = () => {
        const tabs = ['Addresses', 'Parcels', 'Beneficiaries', 'Notifications'];
        return (
            <View style={styles.tabNavigation}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabItem, activeTab === tab ? styles.activeTabItem : {}]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab ? styles.activeTabText : {}]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {renderProfileHeader()}
            {renderUserDetails()}
            {renderTabNavigation()}
            <View style={styles.tabContentContainer}>
                {renderTabContent()}
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    contentContainer: {
        paddingBottom: 20
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    editIconContainer: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10
    },
    nameText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: 15,
        marginTop: 10
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    detailText: {
        marginLeft: 10,
        fontSize: 16
    },
    tabNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingVertical: 10
    },
    tabItem: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    activeTabItem: {
        borderBottomWidth: 2,
        borderBottomColor: '#007bff'
    },
    tabText: {
        color: '#666'
    },
    activeTabText: {
        color: '#007bff',
        fontWeight: 'bold'
    },
    tabContentContainer: {
        padding: 15,
        backgroundColor: '#f4f4f4'
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    cardSubtitle: {
        color: '#666',
        marginTop: 5
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#007bff',
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold'
    },
    beneficiaryImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    removeButton: {
        position: 'absolute',
        right: 10,
        backgroundColor: 'red',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notificationContainer: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10
    },
    notificationText: {
        fontSize: 16
    },
    timestampText: {
        color: '#666',
        marginTop: 5,
        fontSize: 12
    },
    clearButton: {
        backgroundColor: '#f4f4f4',
        padding: 15,
        alignItems: 'center'
    },
    clearButtonText: {
        color: '#007bff'
    },
    footerContainer: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    footerButtonText: {
        marginLeft: 10,
        fontSize: 16
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center'
    },
    logoutButtonText: {
        color: 'white',
        textAlign: 'center',
        marginLeft: 10,
        fontWeight: 'bold'
    }
});

export default ProfilePage;