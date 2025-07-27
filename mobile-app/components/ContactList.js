import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserByMobileNumber } from "../redux/parcel/parcelActions";

const ContactList = ({ contacts }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation();
    const [selectedContact, setSelectedContact] = useState(null);
    const dispatch = useDispatch();
    const parcelState = useSelector(state => state.parcel);
    const receiver = parcelState.creatingParcel.receiverId;
    const [isVerified, setIsVerified] = useState(false);

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const backHandler = (() => {
        navigation.navigate("SendPackage", { screen: "SendPackage" });
        return true;
    });

    useEffect(() => {
        if (receiver != null) {
            setIsVerified(true);
        } else {
            setIsVerified(false);
        }
    }, [parcelState]);

    const selectPhoneNumber = (contact) => {
        const sanitizedNumber = contact.number
            .replace(/^\+91/, '')
            .replace(/\s+/g, '')
            .replace(/[^\d]/g, '');
        const sanitizedContact = { ...contact, number: sanitizedNumber };
        setSelectedContact(sanitizedContact);
        dispatch(getUserByMobileNumber(sanitizedNumber));
    };

    return (
        <View style={styles.container}>
            {selectedContact && (
                <View style={styles.selectedContainer}>
                    <Image
                        source={{ uri: "https://img.icons8.com/ios-filled/50/user-male-circle.png" }}
                        style={styles.icon}
                    />
                    <View>
                        <Text style={styles.selectedName}>{selectedContact.name}</Text>
                        <Text style={styles.selectedNumber}>{selectedContact.number}</Text>
                    </View>
                </View>
            )}
            <TextInput
                style={styles.searchBar}
                placeholder="Search by name or number"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {filteredContacts.map(contact => (
                contact.phoneNumbers?.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.contactItem}
                        onPress={() => selectPhoneNumber({ name: contact.name, number: item.number })}
                    >
                        <Text style={styles.contactName}>{contact.name}</Text>
                        <Text style={styles.contactNumber}>{item.number}</Text>
                    </TouchableOpacity>
                ))
            ))}
            {isVerified && (
                <Button title="Select" onPress={() => backHandler()} ></Button>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        padding: 10,
    },
    searchBar: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 25,
        fontSize: 16,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    contactItem: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    contactName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    contactNumber: {
        fontSize: 16,
        color: "#555",
    },
    selectedContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    selectedName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    selectedNumber: {
        fontSize: 16,
        color: "#555",
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    VerifiedIcon: {
        color: "#00FF00",
        fontSize: 20,
        marginBottom: 5,
        position: "absolute",
        right: 0,
        top: 0

    },
});

export default ContactList;
