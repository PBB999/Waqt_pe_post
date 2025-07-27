import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
    Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressesByUser } from "../redux/address/addressActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateCreatingParcel } from "../redux/parcel/parcelSlice";
import { updateParcelScheduleAndAddress } from "../redux/parcel/parcelActions";

const RescheduleScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const currentParcel = useSelector((state) => state.parcel.currentParcel);
    const [userInfo, setUserInfo] = useState(null);
    const { addresses } = useSelector((state) => state.address);

    const [isPickupModalVisible, setPickupModalVisible] = useState(false);
    const [isDeliveryModalVisible, setDeliveryModalVisible] = useState(false);

    const [pickupAddress, setPickupAddress] = useState(currentParcel?.pickupAddress || null);
    const [deliveryAddress, setDeliveryAddress] = useState(currentParcel?.deliveryAddress || null);

    const [selectedDate, setSelectedDate] = useState(new Date(currentParcel?.timeSlot?.startTime || new Date()));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(currentParcel?.timeSlot || null);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userInfoString = await AsyncStorage.getItem("userInfo");
                if (userInfoString) {
                    setUserInfo(JSON.parse(userInfoString));
                }
            } catch (error) {
                console.error("Error retrieving user info:", error);
            }
        };
        getUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo?._id) {
            dispatch(fetchAddressesByUser(userInfo._id));
        }
    }, [userInfo]);

    const generateTimeSlots = (date) => {
        const slots = [];
        let startTime = new Date(date);
        startTime.setHours(9, 0, 0, 0);
        const endTime = new Date(date);
        endTime.setHours(18, 0, 0, 0);

        while (startTime < endTime) {
            const slotStart = new Date(startTime);
            const slotEnd = new Date(startTime);
            slotEnd.setMinutes(slotStart.getMinutes() + 30);

            slots.push({ start: slotStart, end: slotEnd });
            startTime.setMinutes(startTime.getMinutes() + 30);
        }

        return slots;
    };

    useEffect(() => {
        setTimeSlots(generateTimeSlots(selectedDate));
    }, [selectedDate]);

    const handleSelectPickupAddress = (address) => {
        setPickupAddress(address);
        setPickupModalVisible(false);
    };

    const handleSelectDeliveryAddress = (address) => {
        setDeliveryAddress(address);
        setDeliveryModalVisible(false);
    };

    const handleTimeSlotSelect = (slot) => {
        setSelectedTimeSlot(slot);
        Alert.alert(
            "Selected Slot",
            `You selected ${slot.start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })} - ${slot.end.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`
        );
    };

    const handleReschedule = () => {
        if (!pickupAddress) {
            Alert.alert("Please select a pickup address");
            return;
        }
        if (!deliveryAddress) {
            Alert.alert("Please select a delivery address");
            return;
        }
        if (!selectedTimeSlot) {
            Alert.alert("Please select a time slot");
            return;
        }

        dispatch(
            updateParcelScheduleAndAddress({
                parcelId: currentParcel._id,
                timeSlot: {
                    startTime: selectedTimeSlot.start.toISOString(),
                    endTime: selectedTimeSlot.end.toISOString(),
                },
                pickupAddress: pickupAddress._id,
                deliveryAddress: deliveryAddress._id,
            })
        );

        Alert.alert("Success", "Parcel rescheduled successfully", [
            { text: "OK", onPress: () => navigation.goBack() },
        ]);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity
                    style={styles.addressButton}
                    onPress={() => setPickupModalVisible(true)}
                >
                    <FontAwesome5 name="map-marker-alt" size={24} color="#d9534f" />
                    <Text style={styles.buttonText}>
                        {pickupAddress
                            ? `Pickup: ${pickupAddress.city}`
                            : "Add Pickup Address"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.addressButton}
                    onPress={() => setDeliveryModalVisible(true)}
                >
                    <FontAwesome5 name="map-marker-alt" size={24} color="#d9534f" />
                    <Text style={styles.buttonText}>
                        {deliveryAddress
                            ? `Delivery: ${deliveryAddress.city}`
                            : "Add Delivery Address"}
                    </Text>
                </TouchableOpacity>
                <View style={styles.datePickerContainer}>
                    <Text style={styles.sectionTitle}>Pickup Date</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={styles.datePickerButton}
                    >
                        <Text style={styles.datePickerButtonText}>
                            {selectedDate.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="calendar"
                        onChange={(event, date) => {
                            setShowDatePicker(false);
                            if (date) setSelectedDate(date);
                        }}
                    />
                )}
                <Text style={styles.sectionTitle}>Pickup Time Slots</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.timeSlotsScrollView}
                >
                    {timeSlots.map((slot, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.timeSlot,
                                selectedTimeSlot === slot && styles.selectedTimeSlot,
                            ]}
                            onPress={() => handleTimeSlotSelect(slot)}
                        >
                            <Text style={styles.timeSlotText}>
                                {`${slot.start.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })} - ${slot.end.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}`}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ScrollView>
            <TouchableOpacity style={styles.nextButton} onPress={handleReschedule}>
                <Text style={styles.nextButtonText}>Reschedule</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isPickupModalVisible}
                onRequestClose={() => setPickupModalVisible(false)}
            >
                <AddressModal
                    title="Select Pickup Address"
                    addresses={addresses}
                    onSelect={handleSelectPickupAddress}
                    onAdd={() => navigation.navigate("DeliveryLocation", { type: "pickup" })}
                    onClose={() => setPickupModalVisible(false)}
                />
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDeliveryModalVisible}
                onRequestClose={() => setDeliveryModalVisible(false)}
            >
                <AddressModal
                    title="Select Delivery Address"
                    addresses={addresses}
                    onSelect={handleSelectDeliveryAddress}
                    onAdd={() => navigation.navigate("DeliveryLocation", { type: "delivery" })}
                    onClose={() => setDeliveryModalVisible(false)}
                />
            </Modal>
        </View>
    );
};

const AddressModal = ({ title, addresses, onSelect, onAdd, onClose }) => {
    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <View style={styles.sheetHeader}>
                    <Text style={styles.modalHeader}>{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>✕</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.savedAddressesContainer}>
                    {addresses?.map((address) => (
                        <TouchableOpacity
                            key={address._id}
                            style={styles.savedAddressCard}
                            onPress={() => onSelect(address)}
                        >
                            <Text style={styles.addressType}>{address.label}</Text>
                            <Text>{address.city}, {address.state}</Text>
                            <Text>{address.zipCode}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                    <Text style={styles.addButtonText}>Add New Address</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollViewContent: {
        padding: 20,
        paddingBottom: 100,
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
        justifyContent: "space-between",
    },
    progressItem: {
        alignItems: "center",
    },
    activeStepCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#d9534f",
    },
    inactiveStepCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#ddd",
    },
    progressLine: {
        width: 45,
        height: 2,
        backgroundColor: "#ddd",
    },
    activeStepText: {
        fontSize: 12,
        color: "#000",
        marginTop: 5,
        fontWeight: "bold",
    },
    inactiveStepText: {
        fontSize: 12,
        color: "#666",
        marginTop: 5,
    },
    addressButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        marginVertical: 10,
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#d9534f",
        fontWeight: "bold",
    },
    datePickerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    datePickerButton: {
        backgroundColor: "#d9534f",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    datePickerButtonText: {
        color: "#fff",
        fontSize: 14,
    },
    timeSlotsScrollView: {
        marginTop: 10,
    },
    timeSlot: {
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
    },
    selectedTimeSlot: {
        backgroundColor: "#d9534f",
    },
    timeSlotText: {
        fontSize: 14,
        color: "#333",
    },
    nextButton: {
        backgroundColor: "#d9534f",
        paddingVertical: 15,
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        backgroundColor: "#fff",
        width: "100%",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    sheetHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    closeButton: {
        fontSize: 18,
        color: "#d9534f",
    },
    savedAddressesContainer: {
        maxHeight: 300,
    },
    savedAddressCard: {
        padding: 15,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    addressType: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#d9534f",
        marginBottom: 5,
    },
    addressDetails: {
        fontSize: 14,
        color: "#555",
    },
    addAddressButton: {
        backgroundColor: "#d9534f",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    addAddressText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
        justifyContent: "space-between",
    },
    progressItem: {
        alignItems: "center",
    },
    activeStepCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#d9534f",
    },
    inactiveStepCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#ddd",
    },
    progressLine: {
        width: 45,
        height: 2,
        backgroundColor: "#ddd",
    },
    activeStepText: {
        fontSize: 12,
        color: "#000",
        marginTop: 5,
        fontWeight: "bold",
    },
    inactiveStepText: {
        fontSize: 12,
        color: "#666",
        marginTop: 5,
    },
    addressButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        marginVertical: 10,
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#d9534f",
        fontWeight: "bold",
    },
    estimateText: {
        marginTop: 20,
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
    estimateLink: {
        color: "#d9534f",
        fontWeight: "bold",
    },
    modalContainer: {
        backgroundColor: "white",
        width: "100%",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    sheetHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: "bold",
    },
    closeButton: {
        fontSize: 18,
        color: "#d9534f",
    },
    addNewAddressOption: {
        marginVertical: 15,
        padding: 10,
    },
    addNewAddressText: {
        fontSize: 16,
        color: "#d9534f",
    },
    savedAddresses: {
        fontSize: 14,
        color: "#666",
        marginVertical: 5,
    },
    nextButton: {
        backgroundColor: "#d9534f",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    nextButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default RescheduleScreen;
