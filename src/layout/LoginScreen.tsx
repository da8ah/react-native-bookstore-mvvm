import { Button, Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { LoginScreenProps } from './ScreenTypes';

const LoginScreen = ({ navigation }: LoginScreenProps) => {

    const navigateCart = () => {
        navigation.navigate('Cart');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button style={{ width: '50%' }} onPress={navigateCart}>Cart</Button>
            </Layout>
        </SafeAreaView>
    );
};

export default LoginScreen;