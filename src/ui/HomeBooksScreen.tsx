import { Button, Divider, Layout, List, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet } from 'react-native';
import { BookModel, ViewModelHomeBooks } from '../domain/ports/viewmodel/ViewModelHomeBook';
import { HomeBooksScreenProps } from './ScreenTypes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        textAlign: 'center'
    },
    listContainer: {
        flex: 1
    },
    contentContainer: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        justifyContent: 'space-evenly',
        alignContent: 'center'
    },
    bookLayout: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    bookInfoLayout: {
        width: '80%'
    },
    bookPriceLayout: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: 'grey'
    },
    bookAuthorAndIsbnLayout: {
        flexDirection: 'row'
    },
    bookAuthor: {
        width: '60%'
    },
    bookIsbn: {
        width: '40%',
        textAlign: 'right'
    },
    bookTitle: {
        // backgroundColor: 'darkred',
        // color: 'white'
    },
    bookPrice: {
        // backgroundColor: 'darkblue',
        // color: 'white',
        fontSize: 30
    },
});

const renderBookItem = (book: any) => (
    <Layout style={styles.bookLayout}>
        <Layout style={styles.bookInfoLayout}>
            <Layout style={styles.bookAuthorAndIsbnLayout}>
                <Text style={styles.bookAuthor}>
                    {book.item.getAuthor()}
                </Text>
                <Text style={styles.bookIsbn}>
                    {book.item.getIsbn()}
                </Text>
            </Layout>
            <Divider />
            <Text style={styles.bookTitle}>
                {book.item.getTitle()}
            </Text>
        </Layout>
        <Layout style={styles.bookPriceLayout}>
            <Text style={styles.bookPrice}>
                $ {book.item.getPrice()}
            </Text>
        </Layout>
    </Layout>
);

const homeBookController = () => {
    const data = new ViewModelHomeBooks().getDataToDisplay();
    return data;
}

const HomeBooksScreen = ({ navigation }: HomeBooksScreenProps) => {

    const navigateLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button style={{ width: '50%' }} onPress={navigateLogin}>Login</Button>
                <Button style={{ width: '50%' }} onPress={homeBookController}>Data</Button>
                <Text category='h3' status='success' appearance='hint' style={styles.header}>BOOKS</Text>
                <List
                    style={styles.listContainer}
                    contentContainerStyle={styles.contentContainer}
                    data={homeBookController()}
                    renderItem={renderBookItem}
                    listKey={'books'}
                />
            </Layout>
        </SafeAreaView>
    );

};

export default HomeBooksScreen;