import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/auth/authActions';
import PostLogoImage from '../assets/postlogo.jpg';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword || !phoneNumber) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const user = { name: fullName, email, password, phone: phoneNumber };
      await dispatch(
        registerUser(user)
      ).unwrap();
      Alert.alert('Success', 'Your account has been created successfully!');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Registration Failed', err?.message || 'An error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Register</Text>

      <Image
        style={styles.logo}
        source={PostLogoImage}
        resizeMode="contain"
        accessible
        accessibilityLabel="Post Logo"
      />

      <Text style={styles.subtitle}>Create an account to get started</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="black" />
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          accessible
          accessibilityLabel="Full Name Input"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={24} color="black" />
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessible
          accessibilityLabel="Email Input"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="phone" size={24} color="black" />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          accessible
          accessibilityLabel="Phone Number Input"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="black" />
        <TextInput
          placeholder="Password (min. 6 characters)"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessible
          accessibilityLabel="Password Input"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="black" />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          accessible
          accessibilityLabel="Confirm Password Input"
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={handleRegister}
            accessible
            accessibilityLabel="Register Button"
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}
            accessible
            accessibilityLabel="Back to Login Button"
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: 'gray',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: '90%',
    backgroundColor: '#f9f9f9',
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  registerButton: {
    backgroundColor: '#d9534f',
  },
  loginButton: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
