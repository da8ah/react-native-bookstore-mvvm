import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@ui-kitten/components';
import AddBookScreen from './AddBookScreen';
import CartScreen from './CartScreen';
import HomeBooksScreen from './HomeBooksScreen';
import LoginScreen from './LoginScreen';
import PaymentScreen from './PaymentScreen';

const HomeIcon = (props: { color: string }) => (
    <Icon name='home-outline' {...props} />
);

const Tab = createBottomTabNavigator();

function MainBottomTabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#e91e63' }}>
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={
                    {
                        tabBarLabel: 'Home',
                        tabBarIcon: HomeIcon
                    }
                } />
            <Tab.Screen name="New" component={AddBookScreen} options={{ tabBarLabel: 'Add' }} />
        </Tab.Navigator>
    );
}

const { Navigator, Screen } = createNativeStackNavigator();

const HomeNavigator = () => (
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