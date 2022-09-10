import { Button, Card, Divider, Layout, List, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Book } from '../core/entities/Book';
import { CartScreenProps } from './ScreenTypes';

const Header = (props: any) => (
    <Layout {...props}>
        <Text category='h3'>Cart</Text>
    </Layout>
);

const Footer = () => (
    <Layout style={styles.paymentLayout}>
        <Button style={styles.paymentButton} onPress={goToPayment}>Payment</Button>
    </Layout>
);

const renderBookItem = (allBooks: any) => (
    <Layout style={styles.bookLayout}>
        <Text style={styles.bookTitle}>
            {allBooks.item.getTitle()}
        </Text>
        <Text style={styles.bookIsbn}>
            {allBooks.item.getIsbn()}
        </Text>
        <Text style={styles.bookPrice}>
            $ {allBooks.item.getPrice()}
        </Text>
    </Layout>
);

let goToPayment: any;

const CartScreen = ({ route, navigation }: CartScreenProps) => {

    const navigatePayment = () => {
        navigation.navigate('Payment', { token: route.params.token, price: total });
    };

    goToPayment = navigatePayment;

    const priceCalculation = (books: Book[]): string => {
        return books.reduce((accumulator, book) => accumulator + book.getPrice(), 0).toFixed(2);
    }
    let total: string = priceCalculation(route.params.books);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={styles.container}>
                <Card
                    style={styles.card}
                    disabled={true}
                    focusable={false}
                    header={Header}
                    footer={Footer}
                >
                    <Layout style={styles.cardContent}>
                        <List
                            style={styles.listContainer}
                            contentContainerStyle={styles.listContentContainer}
                            ItemSeparatorComponent={Divider}
                            data={route.params.books}
                            renderItem={renderBookItem}
                            listKey={'books-cart'}
                        />
                        <Divider />
                        <Layout style={styles.total}>
                            <Text style={[styles.bookTitle, { width: '80%', fontSize: 24, fontStyle: 'normal', textAlign: 'right' }]}>Total: </Text>
                            <Text style={[styles.bookPrice, { color: 'darkred', fontSize: 18, fontStyle: 'italic', fontWeight: 'bold', textAlign: 'right' }]}>$ {total}</Text>
                        </Layout>
                    </Layout>
                </Card>
            </Layout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        width: '100%',
        borderColor: 'transparent',
        alignContent: 'center'
    },
    cardContent: {
        marginHorizontal: -20,
        marginVertical: -16,
        marginBottom: -200
    },
    listContainer: {
        maxHeight: '75%',
        backgroundColor: 'transparent'
    },
    listContentContainer: {
        justifyContent: 'space-evenly',
        alignContent: 'center'
    },
    bookLayout: {
        height: 80,
        flexDirection: 'row',
        borderRadius: 10,
    },
    bookTitle: {
        width: '50%',
        paddingLeft: 5,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    bookIsbn: {
        width: '30%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 10
    },
    bookPrice: {
        color: 'darkgreen',
        textAlign: 'right',
        textAlignVertical: 'center',
    },
    total: {
        height: 80,
        flexDirection: 'row',
        paddingRight: 25,
        borderRadius: 10
    },
    paymentLayout: {
        maxHeight: 80,
        alignItems: 'center'
    },
    paymentButton: {
        marginVertical: 10,
        width: '90%',
        backgroundColor: 'darkred',
        borderColor: 'white'
    }
});

export default CartScreen;