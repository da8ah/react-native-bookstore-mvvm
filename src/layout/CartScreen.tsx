import { Button, Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { CartScreenProps } from './ScreenTypes';

const CartScreen = ({ navigation }: CartScreenProps) => {

    const navigatePayment = () => {
        navigation.navigate('Payment');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button style={{ width: '50%' }} onPress={navigatePayment}>Payment</Button>
            </Layout>
        </SafeAreaView>
    );
};

export default CartScreen;