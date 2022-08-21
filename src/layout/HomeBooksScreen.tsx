import { Divider, Layout, List, Text, Button } from '@ui-kitten/components';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { Book } from '../core/entities/Book';
import { ViewModelHomeBooks } from '../core/ports/viewmodels/ViewModelHomeBook';
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
        paddingVertical: 10,
        marginVertical: 5
    },
    bookInfoLayout: {
        width: '60%'
    },
    bookPriceLayout: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center'
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
        paddingBottom: 4
    },
    bookPrice: {
        fontSize: 30
    },
});

const renderBookItem = (allBooks: any) => (
    <Layout style={styles.bookLayout}>
        <Layout style={styles.bookInfoLayout}>
            <Layout style={styles.bookAuthorAndIsbnLayout}>
                <Text style={styles.bookAuthor}>
                    {allBooks.item.getAuthor()}
                </Text>
                <Text style={styles.bookIsbn}>
                    {allBooks.item.getIsbn()}
                </Text>
            </Layout>
            <Divider />
            <Text style={styles.bookTitle}>
                {allBooks.item.getTitle()}
            </Text>
        </Layout>
        <Layout style={styles.bookPriceLayout}>
            <Text style={styles.bookPrice}>
                $ {allBooks.item.getPrice()}
            </Text>
        </Layout>
    </Layout>
);

const viewModelHomeBooks = new ViewModelHomeBooks();

const HomeBooksScreen = ({ navigation }: HomeBooksScreenProps) => {

    const navigateLogin = () => {
        navigation.navigate('Login');
    };

    const [books, setBooks] = useState<Book[]>();

    const comprobarData = () => {
        console.log(viewModelHomeBooks.isLoading());
        viewModelHomeBooks.getDataFromServer();
        console.log(viewModelHomeBooks.getBooksStored());
        setBooks(viewModelHomeBooks.getBooksStored());
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* 
                <Button style={{ width: '50%' }} onPress={navigateLogin}>Login</Button>
            {viewModelHomeBooks.isLoading() || !viewModelHomeBooks.getBooksStored() ?
                (
                    <Layout style={styles.container}>
                        <Text status='warning' appearance='hint'>Loading...</Text>
                        <ActivityIndicator />
                    </Layout>
                ) : (
                    )
            }
                */}
            <Layout style={styles.container}>
                <Button style={{ width: '50%' }} onPress={comprobarData}>Data</Button>
                <Text category='h3' status='primary' appearance='hint' style={styles.header}>Welcome to BOOKSTORE!</Text>
                <List
                    style={styles.listContainer}
                    contentContainerStyle={styles.contentContainer}
                    data={books}
                    renderItem={renderBookItem}
                    listKey={'books'}
                />
            </Layout>
        </SafeAreaView>
    );

};

export default HomeBooksScreen;