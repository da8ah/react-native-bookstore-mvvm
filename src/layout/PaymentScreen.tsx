import { CardForm, CardFormView, PaymentMethodCreateParams, StripeProvider, useConfirmPayment } from '@stripe/stripe-react-native';
import { Button, Card, Divider, Layout, Modal, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet } from 'react-native';
import ViewModelPayment from '../core/ports/viewmodels/ViewModelPayment';
import { PaymentScreenProps } from './ScreenTypes';

const PaymentScreen = ({ route, navigation }: PaymentScreenProps) => {

    const [modalVisibility, setModalVisibility] = useState(false);
    const [publishableKey, setPublishableKey] = useState<string>('');
    const [confirmDisabled, setConfirmDisabledState] = useState<boolean>(true);
    const { confirmPayment } = useConfirmPayment();
    const viewModelPayment = new ViewModelPayment(route.params.token, route.params.price);

    const getPublishableKey = async () => {
        await viewModelPayment.createNewPayment();
        if (viewModelPayment.isGenerated()) {
            const payment = viewModelPayment.getPaymentID();
            if (payment) setPublishableKey(payment.publishableKey);
        }
    }

    const validateCardInputs = (cardDetails: CardFormView.Details) => {
        const postalCode = cardDetails.postalCode;
        const postalCodeRegEx: RegExp = /^\d{6}$/;
        if (postalCode) return postalCodeRegEx.test(postalCode);
        else return false;
    }

    const executePayment = async () => {
        if (!viewModelPayment.isGenerated()) {
            Alert.alert("Error ❌", "No Payment Generated!\n\nPlease check Book's details again or contact Support for further help.");
            return
        }

        Alert.alert("Status 🔔", "Payment in Progress!");

        const payment = viewModelPayment.getPaymentID();
        if (payment) {
            const billingDetails: PaymentMethodCreateParams.BillingDetails = {
                email: 'tiber@email.com',
                // phone: '',
                // addressCity: '',
                // addressCountry: '',
                // addressLine1: '',
                // addressLine2: '',
                // addressPostalCode: '',
            }; // mocked data for tests

            // 3. Confirm payment with card details
            // The rest will be done automatically using webhooks
            const { error, paymentIntent } = await confirmPayment(payment.clientSecret, {
                type: 'Card',
                billingDetails
            });

            if (error) {
                Alert.alert(`Error code: ${error.code}`, error.message);
                console.log('Payment confirmation error', error.message);
            } else if (paymentIntent) {
                Alert.alert(
                    'Success',
                    `Payment was confirmed successfully!\nCurrency: $ ${route.params.price} ${paymentIntent.currency.toUpperCase()}\nThank you, have a great day!`
                );
                console.log('Status: ' + paymentIntent.status);
                setModalVisibility(false);
                navigation.navigate('Books');
            }
        }
    }

    useEffect(() => {
        getPublishableKey();
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {!publishableKey ? (
                <Layout style={styles.container}>
                    <Divider />
                    <ActivityIndicator />
                </Layout>
            ) : (
                <Layout style={styles.paymentLayout}>
                    <Text category='h3' status='primary' style={styles.header}>Welcome to BOOKSTORE!</Text>
                    <StripeProvider
                        publishableKey={publishableKey}
                    // merchantIdentifier="merchant.identifier" // required for Apple Pay
                    // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
                    >
                        <CardForm
                            autofocus={true}
                            style={styles.paymentCardForm}
                            cardStyle={styles.paymentCardContent}
                            onFormComplete={(cardDetails) => {
                                const completed = cardDetails.complete;
                                if (completed && validateCardInputs(cardDetails)) setConfirmDisabledState(false);
                                else setConfirmDisabledState(true);
                            }}
                        />
                        <Layout style={{ alignItems: 'center' }}>
                            <Button style={{ width: '90%' }} status={'warning'} disabled={confirmDisabled} onPress={() => setModalVisibility(true)}>
                                CONFIRM PAYMENT
                            </Button>
                            <Modal
                                visible={modalVisibility}
                                backdropStyle={styles.backdrop}
                                onBackdropPress={() => setModalVisibility(false)}>
                                <Card disabled={true}>
                                    <Text style={{ marginBottom: 25 }}>Press ACCEPT to proceed with Payment 💲</Text>
                                    <Button status={'success'} onPress={() => {
                                        setModalVisibility(false);
                                        executePayment();
                                    }}>
                                        ACCEPT
                                    </Button>
                                </Card>
                            </Modal>
                        </Layout>
                    </StripeProvider>
                </Layout>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        paddingVertical: 20,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'black'
    },
    paymentLayout: {
        flex: 1
    },
    paymentCardForm: {
        minHeight: '70%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paymentCardContent: {
        backgroundColor: 'white',
        color: 'black'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});

export default PaymentScreen;