import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import {
    CheckCircle2,
    CreditCard,
    WalletCards,
    QrCode,
    ShieldCheck,
    MapPin
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateCreatingParcel } from '../redux/parcel/parcelSlice';
import { createParcel } from '../redux/parcel/parcelActions';

const PaymentPage = ({ navigation }) => {
    const dispatch = useDispatch();
    const creatingParcel = useSelector(state => state.parcel.creatingParcel);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [savePaymentMethod, setSavePaymentMethod] = useState(false);
    const [loading, setLoading] = useState(false);

    const paymentMethods = [
        {
            id: 'credit',
            name: 'Credit/Debit Card',
            icon: <CreditCard color="#4A4A4A" size={24} />,
            details: 'Add your card details'
        },
        {
            id: 'upi',
            name: 'UPI',
            icon: <QrCode color="#4A4A4A" size={24} />,
            details: 'Pay directly from your bank'
        },
        {
            id: 'wallet',
            name: 'Digital Wallets',
            icon: <WalletCards color="#4A4A4A" size={24} />,
            details: 'PayPal, Google Pay, Apple Pay'
        },
        {
            id: 'netbanking',
            name: 'Net Banking',
            icon: <ShieldCheck color="#4A4A4A" size={24} />,
            details: 'Pay through your bank portal'
        },
        {
            id: 'cashpickup',
            name: 'Cash on Pickup',
            icon: <MapPin color="#FFFFFF" size={24} />,
            details: 'Pay at home when picking up',
            isCashPickup: true
        }
    ];

    const handleConfirmPayment = async () => {
        if (!selectedPaymentMethod) {
            Alert.alert('Please select a payment method');
            return;
        }
        try {
            const parcelData = creatingParcel;
            setLoading(true);
            const result = await dispatch(createParcel(parcelData));
            if (result) {
                navigation.navigate('Dashboard');
                setLoading(false);
            }
        } catch (error) {
            Alert.alert('Payment Failed', error.message || 'Unable to create parcel');
            setLoading(false);
        }
    };
    const renderPaymentMethod = (method) => {
        const isSelected = selectedPaymentMethod === method.id;
        const containerStyle = [
            styles.paymentMethodContainer,
            method.isCashPickup && styles.cashPickupContainer,
            isSelected && styles.selectedPaymentMethod
        ];

        const textColor = method.isCashPickup ? '#FFFFFF' : '#000000';

        return (
            <TouchableOpacity
                key={method.id}
                style={containerStyle}
                onPress={() => setSelectedPaymentMethod(method.id)}
            >
                <View style={styles.paymentMethodContent}>
                    {method.icon}
                    <View style={styles.paymentMethodText}>
                        <Text style={[styles.paymentMethodTitle, { color: textColor }]}>
                            {method.name}
                        </Text>
                        <Text style={[styles.paymentMethodDetails, { color: textColor }]}>
                            {method.details}
                        </Text>
                    </View>
                    {isSelected && (
                        <CheckCircle2
                            color={method.isCashPickup ? '#FFFFFF' : '#d9534f'}
                            size={24}
                        />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Payment Options</Text>
                <Text style={styles.headerSubtitle}>
                    Choose your preferred method to complete your order.
                </Text>
            </View>
            <View style={styles.paymentMethodsSection}>
                {paymentMethods.map(renderPaymentMethod)}
            </View>
            <TouchableOpacity
                style={styles.savePaymentContainer}
                onPress={() => setSavePaymentMethod(!savePaymentMethod)}
            >
                <Text style={styles.savePaymentText}>
                    Save this payment method for future orders
                </Text>
                <View style={[
                    styles.toggleSwitch,
                    savePaymentMethod ? styles.toggleActive : styles.toggleInactive
                ]} />
            </TouchableOpacity>
            <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>
                        ₹{creatingParcel.price ? creatingParcel.price.toFixed(2) : '0.00'}
                    </Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax</Text>
                    <Text style={styles.summaryValue}>
                        ₹{creatingParcel.price ? (creatingParcel.price * 0.1).toFixed(2) : '0.00'}
                    </Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryTotal}>Total</Text>
                    <Text style={styles.summaryTotalValue}>
                        ₹{creatingParcel.price ? (creatingParcel.price * 1.1).toFixed(2) : '0.00'}
                    </Text>
                </View>
            </View>
            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                    style={[
                        styles.primaryButton,
                        (!selectedPaymentMethod || !creatingParcel.price) && styles.disabledButton
                    ]}
                    onPress={handleConfirmPayment}
                    disabled={!selectedPaymentMethod || !creatingParcel.price}
                >
                    <Text style={styles.primaryButtonText}>{loading ? "Loading..." : "Confirm Payment"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    contentContainer: {
        padding: 20
    },
    headerContainer: {
        marginBottom: 20
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333'
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5
    },
    paymentMethodsSection: {
        marginBottom: 20
    },
    paymentMethodContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    cashPickupContainer: {
        backgroundColor: '#d9534f',
    },
    selectedPaymentMethod: {
        borderWidth: 2,
        borderColor: '#d9534f'
    },
    paymentMethodContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    paymentMethodText: {
        flex: 1,
        marginLeft: 15
    },
    paymentMethodTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    paymentMethodDetails: {
        fontSize: 12,
        color: '#888'
    },
    savePaymentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    savePaymentText: {
        fontSize: 14
    },
    toggleSwitch: {
        width: 40,
        height: 20,
        borderRadius: 10
    },
    toggleActive: {
        backgroundColor: '#d9534f'
    },
    toggleInactive: {
        backgroundColor: '#CCCCCC'
    },
    summaryContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666'
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    summaryTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    summaryTotalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#d9534f'
    },
    actionButtonsContainer: {
        marginTop: 20
    },
    primaryButton: {
        backgroundColor: '#d9534f',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginBottom: 10
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    secondaryButton: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center'
    },
    secondaryButtonText: {
        color: '#333',
        fontSize: 16
    }
});

export default PaymentPage;