import { Button, Card, Icon, Input, Layout, Text } from '@ui-kitten/components';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { AddBookScreenProps } from './ScreenTypes';

const Header = (props: any) => (
    <Layout {...props} style={[props.style, styles.topContainer]}>
        <Text category='h6'>New Book</Text>
    </Layout>
);

const renderIcon = (props: any) => (
    <Icon {...props} name='plus-circle-outline' />
);

const Footer = (props: any) => (
    <Layout {...props} style={[props.style, styles.footerContainer]}>
        <Button
            accessoryLeft={renderIcon}
            status='control'
            style={styles.footerControl}
            size='large'
            onPress={addBookButton}
        ></Button>
    </Layout>
);


const viewModel = [];
const addBookButton = () => {
    console.log("Here addBookUseCase");
};

const AddBookScreen = ({ navigation }: AddBookScreenProps) => {

    const [isbn, setIsbn] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={styles.container}>
                <Text category='h3' status='primary' style={styles.header}>Welcome to BOOKSTORE!</Text>
                <ScrollView contentContainerStyle={styles.formContainer}>
                    <Card style={styles.card} header={Header} footer={Footer}>
                        <Input
                            selectionColor='black'
                            style={styles.input}
                            label='ISBN'
                            value={isbn}
                            onChangeText={nextValue => setIsbn(nextValue)}
                        />
                        <Input
                            selectionColor='black'
                            style={styles.input}
                            label='Author'
                            value={author}
                            onChangeText={nextValue => setAuthor(nextValue)}
                        />
                        <Input
                            selectionColor='black'
                            style={styles.input}
                            label='Title'
                            value={title}
                            onChangeText={nextValue => setTitle(nextValue)}
                        />
                    </Card>
                </ScrollView>
            </Layout>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        paddingVertical: 20,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'black'
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        width: '90%',
        height: '70%'
    },
    footerContainer: {
        padding: 0,
        margin: 0
    },
    footerControl: {
        borderColor: '#b4b4b4'
    },
    input: {
        marginVertical: 15,
        backgroundColor: 'transparent',
        borderColor: '#f4f4f4'
    }
});

export default AddBookScreen;