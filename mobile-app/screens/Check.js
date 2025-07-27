import React, { useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/auth/authSlice';

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate('Login');
            return true;
        });
        return () => backHandler.remove();
    }, [navigation]);

    const getUserInfo = async () => {
        try {
            const userInfoString = await AsyncStorage.getItem("userInfo");
            const userToken = await AsyncStorage.getItem('userToken');
            if (!userInfoString || !userToken) {
                navigation.navigate('Login');
                console.warn("No user info found in storage");
            }
            if (userInfoString) {
                const userInfo = JSON.parse(userInfoString);
                if (userToken != null && userInfo) {
                    if (userInfo.type === 'postman') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'PostmanDashboard' }],
                        });
                    } else {
                        dispatch(setCredentials({data: {user: userInfo}}));
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Dashboard' }],
                        });
                    }
                }
            }
        } catch (error) {
            console.error("Error retrieving user info:", error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <View>
            <Loader />
        </View>
    );
}


const styles = StyleSheet.create({
});