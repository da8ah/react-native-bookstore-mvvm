import { Button, Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { HomeBooksScreenProps } from './ScreenTypes';

const HomeBooksScreen = ({ navigation }: HomeBooksScreenProps) => {

    const navigateLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button style={{ width: '50%' }} onPress={navigateLogin}>Login</Button>
            </Layout>
        </SafeAreaView>
    );

};

export default HomeBooksScreen;