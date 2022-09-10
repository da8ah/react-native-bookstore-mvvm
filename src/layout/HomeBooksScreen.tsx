import { Divider, Layout, List, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { Book } from '../core/entities/Book';
import { ViewModelHomeBooks } from '../core/ports/viewmodels/ViewModelHomeBooks';
import { HomeBooksScreenProps } from './ScreenTypes';

const renderBookItem = (allBooks: any) => (
    <Pressable onPress={goToLogin}>
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
    </Pressable>
);

let goToLogin: any;
const viewModelHomeBooks = new ViewModelHomeBooks();

const HomeBooksScreen = ({ navigation }: HomeBooksScreenProps) => {

    const navigateLogin = () => {
        if (books) navigation.navigate('Login', { books });
    };
    goToLogin = navigateLogin;

    const [books, setBooks] = useState<Book[] | null>();
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const queryDataFromServer = () => {
        setTimeout(async () => {
            if (!viewModelHomeBooks.isLoading()) {
                await viewModelHomeBooks.getDataFromServer();
                setBooks(viewModelHomeBooks.getBooksStored());
            }
        }, 2000);
    };

    useEffect(() => {
        queryDataFromServer();
    }, [viewModelHomeBooks.isLoading()]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {!books ?
                (
                    <Layout style={styles.container}>
                        <Divider />
                        <ActivityIndicator />
                    </Layout>
                ) : (
                    <Layout style={styles.container}>
                        <Text category='h3' status='primary' style={styles.header}>Welcome to BOOKSTORE!</Text>
                        {viewModelHomeBooks.isLoading() ?
                            (
                                <ActivityIndicator style={styles.listContainer} />
                            ) : (
                                <List
                                    style={styles.listContainer}
                                    contentContainerStyle={styles.contentContainer}
                                    data={books}
                                    renderItem={renderBookItem}
                                    listKey={'books'}
                                    refreshing={refreshing}
                                    onRefresh={() => {
                                        setRefreshing(true);
                                        queryDataFromServer();
                                        setTimeout(() => setRefreshing(false), 1000);
                                    }}
                                />
                            )}
                    </Layout>
                )
            }
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
    listContainer: {
        flex: 1,
        width: '100%'
    },
    contentContainer: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        justifyContent: 'space-evenly',
        alignContent: 'center'
    },
    bookLayout: {
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    bookInfoLayout: {
        width: '70%'
    },
    bookPriceLayout: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    bookAuthorAndIsbnLayout: {
        flexDirection: 'row'
    },
    bookAuthor: {
        width: '60%'
    },
    bookIsbn: {
        width: '40%',
        textAlign: 'right',
        fontSize: 12
    },
    bookTitle: {
        paddingBottom: 4,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    bookPrice: {
        fontSize: 20,
        color: 'darkgreen'
    },
});

export default HomeBooksScreen;