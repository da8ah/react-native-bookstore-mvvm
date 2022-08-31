import { CardField, CardFieldInput, CardForm, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { Layout } from '@ui-kitten/components';
import React, { useEffect, useState } from "react";
import ViewModelPayment from '../core/ports/viewmodels/ViewModelPayment';
import { PaymentScreenProps } from './ScreenTypes';

const PaymentScreen = ({ route, navigation }: PaymentScreenProps) => {

    const [publishableKey, setPublishableKey] = useState<string>('');
    const { confirmPayment } = useStripe();
    const viewModelPayment = new ViewModelPayment(route.params.token, route.params.price);

    const getPublishableKey = async () => {
        const key = (await viewModelPayment.createPayment()).publishableKey;
        if (key) setPublishableKey(key);
    }

    useEffect(() => {
        getPublishableKey();
        // setPublishableKey();
    });

    return (
        <StripeProvider
            publishableKey={publishableKey}
        // merchantIdentifier="merchant.identifier" // required for Apple Pay
        // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
            <Layout style={{ flex: 1 }}>
                <CardForm
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onFormComplete={(cardDetails) => {
                        console.log('card details', cardDetails);
                    }}
                />
            </Layout>
        </StripeProvider>
    );
};

export default PaymentScreen;