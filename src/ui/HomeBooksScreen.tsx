import { Button, Layout, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ViewModelHomeBooks } from '../domain/ports/viewmodel/ViewModelHomeBook';
import { HomeBooksScreenProps } from './ScreenTypes';

const styles = StyleSheet.create({
    BookLayout: {
        flexDirection: 'row'
    }
});

const BookItem = () => (
    <Layout>
        <Layout>
            <Text>
            </Text>
        </Layout>
        <Layout>

        </Layout>
    </Layout>
);

const HomeBookController = () => {
    const vm = new ViewModelHomeBooks();
    const data = vm.getDataToDisplay();
}

const HomeBooksScreen = ({ navigation }: HomeBooksScreenProps) => {

    const navigateLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button style={{ width: '50%' }} onPress={navigateLogin}>Login</Button>
                <Button style={{ width: '50%' }} onPress={HomeBookController}>Data</Button>
            </Layout>
        </SafeAreaView>
    );

};

export default HomeBooksScreen;