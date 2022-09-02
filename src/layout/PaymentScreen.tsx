import { CardField, CardFieldInput, CardForm, initPaymentSheet, PaymentMethodCreateParams, presentPaymentSheet, StripeProvider, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import { Button, Card, Divider, Layout, Modal, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet } from 'react-native';
import ViewModelPayment from '../core/ports/viewmodels/ViewModelPayment';
import { PaymentScreenProps } from './ScreenTypes';

const PaymentScreen = ({ route, navigation }: PaymentScreenProps) => {

    const [visible, setVisible] = useState(false);
    const [publishableKey, setPublishableKey] = useState<string>('');
    const { confirmPayment, loading } = useConfirmPayment();
    const viewModelPayment = new ViewModelPayment(route.params.token, route.params.price);

    const getPublishableKey = async () => {
        await viewModelPayment.createNewPayment();
        if (viewModelPayment.isGenerated()) {
            const payment = viewModelPayment.getPaymentID();
            if (payment) setPublishableKey(payment.publishableKey);
        }
    }

    const openPaymentSheet = async () => {
        console.log("Opening payment Sheet!");
        const { error } = await presentPaymentSheet();

        if (error) console.error(`Error Code: ${error.code}`, error.message);
        else console.log("Success! Your payment has been confirmed!");
    };

    const executePayment = async () => {
        if (!viewModelPayment.isGenerated()) {
            console.log("No Payment Generated!");
            return
        }

        console.log("Payment in Progress!");

        const payment = viewModelPayment.getPaymentID();
        if (payment) {
            const billingDetails: PaymentMethodCreateParams.BillingDetails = {
                email: 'email@stripe.com',
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
                    `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
                );
                console.log('Success from promise', paymentIntent);
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
                                console.log(cardDetails);
                            }}
                        />
                        <Layout style={{ alignItems: 'center' }}>
                            <Button style={{ width: '90%' }} status={'warning'} onPress={() => setVisible(true)}>
                                CONFIRM PAYMENT
                            </Button>
                            <Modal
                                visible={visible}
                                backdropStyle={styles.backdrop}
                                onBackdropPress={() => setVisible(false)}>
                                <Card disabled={true}>
                                    <Text style={{ marginBottom: 15 }}>Are you sure you want to Continue? 🔔</Text>
                                    <Button status={'success'} onPress={() => {
                                        setVisible(false);
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