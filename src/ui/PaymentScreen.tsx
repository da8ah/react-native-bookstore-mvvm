import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

const PaymentScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Stripe Here!</Text>
            </Layout>
        </SafeAreaView>
    );
};

export default PaymentScreen;