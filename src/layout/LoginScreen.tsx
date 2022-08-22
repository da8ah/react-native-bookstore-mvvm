import { Button, Card, Icon, Input, Layout, Text } from '@ui-kitten/components';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AddBookScreenProps, LoginScreenProps } from './ScreenTypes';

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
            onPress={props.navigateCart}
        >
            Login
        </Button>
    </Layout>
);

const LoginScreen = ({ navigation }: LoginScreenProps) => {

    const navigateCart = () => {
        navigation.navigate('Cart');
    };

    const [value, setValue] = useState('');
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
                <Text style={styles.captionText}>Should contain at least 8 symbols</Text>
            </Layout>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={styles.container}>
                <Card style={styles.card} header={Header} footer={Footer(navigateCart)}>
                    <Input
                        label='Email'
                        placeholder='email'
                    />
                    <Input
                        value={value}
                        label='Password'
                        placeholder='password'
                        caption={renderCaption}
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setValue(nextValue)}
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