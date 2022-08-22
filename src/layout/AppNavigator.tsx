import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomNavigation, BottomNavigationTab, Icon, Text } from '@ui-kitten/components';
import AddBookScreen from './AddBookScreen';
import CartScreen from './CartScreen';
import HomeBooksScreen from './HomeBooksScreen';
import LoginScreen from './LoginScreen';
import PaymentScreen from './PaymentScreen';

const HomeIcon = (props: any) => (
    <Icon name='home' {...props} />
);

const TitleHome = () => (
    <Text style={{ color: 'black', fontSize: 10 }}>Home</Text>
);

const AddIcon = (props: any) => (
    <Icon name='plus' {...props} />
);

const TitleAdd = () => (
    <Text style={{ color: 'black', fontSize: 10 }}>Add</Text>
);

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
    <BottomNavigation
        style={{ height: '7%' }}
        indicatorStyle={{ backgroundColor: 'black', borderWidth: 0.1 }}
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title={TitleHome} icon={HomeIcon({ fill: 'black' })} />
        <BottomNavigationTab title={TitleAdd} icon={AddIcon({ fill: 'black' })} />
    </BottomNavigation>
);

const Tab = createBottomTabNavigator();

function MainBottomTabNavigator() {
    return (
        <Tab.Navigator
            tabBar={props => <BottomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={HomeToPaymentNavigator} />
            <Tab.Screen name="New" component={AddBookScreen} options={{ headerShown: true }} />
        </Tab.Navigator >
    );
}

const { Navigator, Screen } = createNativeStackNavigator();

const HomeToPaymentNavigator = () => (
    <Navigator>
        <Screen name='Books' component={HomeBooksScreen} />
        <Screen name='Login' component={LoginScreen} />
        <Screen name='Cart' component={CartScreen} />
        <Screen name='Payment' component={PaymentScreen} />
    </Navigator>
);

const AppNavigator = () => (
    <NavigationContainer>
        <MainBottomTabNavigator />
    </NavigationContainer>
);

export default AppNavigator;