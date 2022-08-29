import { Button, Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { CartScreenProps } from './ScreenTypes';

const CartScreen = ({ route, navigation }: any) => {

    const navigatePayment = () => {
        console.log(route);
        // navigation.navigate('Payment');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{route.params.token}</Text>
                <Button style={{ width: '50%' }} onPress={navigatePayment}>Payment</Button>
            </Layout>
        </SafeAreaView>
    );
};

export default CartScreen;