import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { User, Mail, Phone, Hash } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/auth/authActions';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const { userInfo, updateUserLoading, error, success, msg } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        phone: userInfo?.phone || '',
        age: userInfo?.age || '',
        married: userInfo?.married || 'No',
        working: userInfo?.working || 'No',
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.email || !formData.phone) {
            Alert.alert('Validation Error', 'Name, email, and phone are required.');
            return;
        }
        const updatedData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            age: formData.age,
            married: formData.married,
            working: formData.working,
        };
        console.log("id", userInfo._id);
        dispatch(updateUser({ id: userInfo._id, updatedData }));

        if (success) {
            Alert.alert('Success', msg);
        } else if (error) {
            Alert.alert('Error', error.message || 'Failed to update user details.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Update User Details</Text>

            <View style={styles.inputGroup}>
                <User style={styles.icon} size={24} />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Mail style={styles.icon} size={24} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Phone style={styles.icon} size={24} />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Hash style={styles.icon} size={24} />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    keyboardType="numeric"
                    value={formData.age}
                    onChangeText={(value) => handleInputChange('age', value)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Married:</Text>
                <Picker
                    selectedValue={formData.married}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('married', value)}
                >
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                </Picker>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Working:</Text>
                <Picker
                    selectedValue={formData.working}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('working', value)}
                >
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={updateUserLoading}>
                <Text style={styles.buttonText}>
                    {updateUserLoading ? 'Updating...' : 'Update'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UpdateUser;