import { Button, Card, Icon, Input, Layout, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import ViewModelLogin from '../core/ports/viewmodels/ViewModelLogin';
import { LoginScreenProps } from './ScreenTypes';

const AlertIcon = (props: any) => (
    <Icon {...props} name='alert-circle-outline' />
);

const Header = (props: any) => (
    <Layout {...props}>
        <Text category='h3'>Login</Text>
    </Layout>
);

const Footer = (props: any) => (
    <Layout {...props} style={[props.style, styles.footerContainer]}>
        <Button
            style={styles.footerControl}
            size='large'
            onPress={login}
        >
            Login
        </Button>
    </Layout>
);

const viewModelLogin = new ViewModelLogin();
let login: any;

const LoginScreen = ({ route, navigation }: LoginScreenProps) => {

    const navigateCart = async () => {
        await viewModelLogin.login({ email, password });
        if (viewModelLogin.isLogged()) {
            const token = viewModelLogin.getAccessToken();
            if (token) navigation.navigate('Cart', { token, books: route.params.books });
        } else console.log("No token provided");
    };

    login = navigateCart;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props: any) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} />
        </TouchableWithoutFeedback>
    );

    const renderCaption = () => {
        return (
            <Layout style={styles.captionContainer}>
                {AlertIcon(styles.captionIcon)}
                <Text style={styles.captionText}>Credentials hard-coded to test only</Text>
            </Layout>
        )
    }

    useEffect(() => {
        setEmail('tiber@email.com');
        setPassword('tiber');
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={styles.container}>
                <Card style={styles.card} header={Header} footer={Footer}>
                    <Input
                        disabled={true}
                        editable={false}
                        value={email}
                        label='Email'
                        placeholder='email'
                        style={styles.input}
                        selectionColor='royalblue'
                    />
                    <Input
                        disabled={true}
                        editable={false}
                        value={password}
                        label='Password'
                        placeholder='password'
                        style={styles.input}
                        selectionColor='royalblue'
                        caption={renderCaption}
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setPassword(nextValue)}
                    />
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
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        width: '90%'
    },
    footerContainer: {
    },
    footerControl: {
    },
    input: {
        marginVertical: 15
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        color: "#8F9BB3",
    }
});

export default LoginScreen;