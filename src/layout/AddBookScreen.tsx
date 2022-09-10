import { Button, Card, Icon, Input, Layout, Text } from '@ui-kitten/components';
import { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ViewModelAddBook from '../core/ports/viewmodels/ViewModelAddBook';

const clearIcon = (props: any) => (
    <Icon {...props} name='trash-2' />
);

// Form Card Elements
const Header = (props: any) => (
    <Layout {...props} style={[props.style, styles.topContainer]}>
        <Text category='h6' style={{ width: '80%' }}>New Book</Text>
        <Button
            accessoryLeft={clearIcon}
            appearance='outline'
            status='basic'
            style={{ width: '15%' }}
            size='large'
            onPress={clearInputFields}
        ></Button>
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

// ViewModel and Data Management
const viewModelAddBook = new ViewModelAddBook();
let addBookButton: any;
let clearInputFields: any;

// Component
const AddBookScreen = () => {

    // Patterns to Check Inputs
    const isbnRegEx: RegExp = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    const authorRegEx: RegExp = /^([a-zA-Z0-9-_. ]+)([,\.]?)(\s[a-zA-Z0-9-_. ]+)*$/;
    const titleRegEx: RegExp = /\w+/;

    // Input Persistence
    let [isbn, setIsbn] = useState(viewModelAddBook.getIsbn());
    let [author, setAuthor] = useState(viewModelAddBook.getAuthor());
    let [title, setTitle] = useState(viewModelAddBook.getTitle());

    // Input Validation
    const inputValidation = () => {
        let isbnTrim = isbn.trim();
        let authorTrim = author.trim();
        let titleTrim = title.trim();

        viewModelAddBook.setInputsCheck(
            isbnRegEx.test(isbnTrim) && authorRegEx.test(authorTrim) && titleRegEx.test(titleTrim)
        );

        viewModelAddBook.setIsbn(isbnTrim);
        viewModelAddBook.setAuthor(authorTrim);
        viewModelAddBook.setTitle(titleTrim);
    };

    // Clear Inputs
    const clearInputs = () => {
        viewModelAddBook.setIsbn("");
        viewModelAddBook.setAuthor("");
        viewModelAddBook.setTitle("");
        setIsbn("");
        setAuthor("");
        setTitle("");
    }
    clearInputFields = clearInputs;

    // When Press Add Button
    const onAddBookButton = async () => {
        Keyboard.dismiss();
        console.log("areInputsValid: " + viewModelAddBook.getInputsCheckedStatus());
        viewModelAddBook.createNewBook();
        await viewModelAddBook.saveNewBook();
        if (viewModelAddBook.getBookSavedStatus()) {
            Alert.alert("Notification 🔔", "Book Saved!");
            clearInputs();
            return;
        }
        Alert.alert("Error ❌", "Error while saving Book!\n\nPlease check Book's details again or contact Support for further help.");
    };
    addBookButton = onAddBookButton;

    // Keyboard and Scroll
    const defaultScrollScreenHeight = '100%';
    const keyboardScrollScreenHeight = '170%';
    let [screenHeight, setScreenHeight] = useState(defaultScrollScreenHeight);
    let isbnInputRef = useRef<Input>();
    let authorInputRef = useRef<Input>();
    let titleInputRef = useRef<Input>();

    const setDefaultScrollHeight = () => {
        if (!isbnInputRef.current?.isFocused() &&
            !authorInputRef.current?.isFocused() &&
            !titleInputRef.current?.isFocused()) { setScreenHeight(defaultScrollScreenHeight) };
    }

    // DidMount, DidUpdate, WillUpdate
    useEffect(() => {
        // Data Persistence
        inputValidation();

        // Keyboard and Scroll
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setScreenHeight(defaultScrollScreenHeight);
        });

        return () => {
            keyboardDidHideListener.remove();
        };
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={styles.container}>
                <Text category='h3' status='primary' style={styles.header}>Welcome to BOOKSTORE!</Text>
                <ScrollView contentContainerStyle={[styles.formContainer, { height: screenHeight }]} keyboardShouldPersistTaps='handled'>
                    <Card
                        style={styles.card}
                        header={Header}
                        footer={Footer}
                        onBlur={() => setDefaultScrollHeight()}
                    >
                        <Input
                            ref={(component: Input) => isbnInputRef.current = component}
                            selectionColor='black'
                            style={styles.input}
                            label={'ISBN'}
                            value={isbn}
                            onChangeText={nextValue => setIsbn(nextValue)}
                            onFocus={() => {
                                if (screenHeight != keyboardScrollScreenHeight) setScreenHeight(keyboardScrollScreenHeight);
                            }}
                        />
                        <Input
                            ref={(component: Input) => authorInputRef.current = component}
                            selectionColor='black'
                            style={styles.input}
                            label={'Author'}
                            value={author}
                            onChangeText={nextValue => setAuthor(nextValue)}
                            onFocus={() => {
                                if (screenHeight != keyboardScrollScreenHeight) setScreenHeight(keyboardScrollScreenHeight);
                            }}
                        />
                        <Input
                            ref={(component: Input) => titleInputRef.current = component}
                            selectionColor='black'
                            style={styles.input}
                            label={'Title'}
                            value={title}
                            onChangeText={nextValue => setTitle(nextValue)}
                            onFocus={() => {
                                if (screenHeight != keyboardScrollScreenHeight) setScreenHeight(keyboardScrollScreenHeight);
                            }}
                        />
                    </Card>
                </ScrollView>
            </Layout>
        </SafeAreaView >
    );
};

// Styles
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4'
    },
    card: {
        width: '90%',
        minHeight: '70%',
        borderColor: 'transparent'
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
        borderColor: 'transparent',
        borderBottomColor: 'darkgrey',
        borderBottomWidth: 3,
        borderRadius: 0
    }
});

export default AddBookScreen;