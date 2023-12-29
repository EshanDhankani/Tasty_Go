import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetStartedScreen from './components/GetStartedScreen';
import WelomeScreen from './components/WelcomeScreen';
import SignUPScreen from './components/SignUpScreen';
import SignInScreen from './components/SignInScreen';
import HomeScreen from './components/HomeScreen';
import CategoryScreen from './components/CategoryScreen';
import FavouriteScreen from './components/FavouriteScreen';
import CartScreen from './components/CartScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import ProfileScreen from './components/ProfileScreen';
import ProductDetails from './components/ProductDetails';
import Checkout1 from './components/Checkout1';
import PaymentMethod from './components/PaymentMethod';
import ConfirmOrder from './components/ConfirmOrder';
import Checkout4 from './components/Checkout4';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabstack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: [
          {
            display: 'flex',
            backgroundColor: '#FED718',
            paddingBottom: 15,
            height: 70,
          },
          null,
        ],
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        style: {
          borderRadius: 15,
          height: 90,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'HomeScreen':
              iconName = 'home';
              break;
            case 'CategoryScreen':
              iconName = 'grid';
              break;
            case 'FavouriteScreen':
              iconName = 'heart';
              break;
            case 'CartScreen':
              iconName = 'shopping-cart';
              break;
            case 'ProfileScreen':
              iconName = 'user';
              break;
            default:
              break;
          }
          return <Icon name={iconName} color={color} size={24} />;
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#FED718',
            
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          title: 'Categories',
          headerStyle: {
            backgroundColor: '#FED718',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={{
          title: 'Favourites',
          headerStyle: {
            backgroundColor: '#FED718',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'Cart',
          headerStyle: {
            backgroundColor: '#FED718',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          headerStyle: {
            backgroundColor: '#FED718',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
};

const UserStack = () =>{
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
    <Stack.Screen name='Tab' component={Tabstack} />
    <Stack.Screen name='ProductDetails' component={ProductDetails}/>
    <Stack.Screen name='checkout1' component={Checkout1}/>
    <Stack.Screen name='payment' component={PaymentMethod}/>
    <Stack.Screen name='confirmorder' component={ConfirmOrder}/>
    <Stack.Screen name='checkout4' component={Checkout4}/>
  </Stack.Navigator>
    )
}

const AuthStack = () =>{
  return(

    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='GetStartedScreen' component={GetStartedScreen} />
    <Stack.Screen name='WelcomeScreen' component={WelomeScreen} />
    <Stack.Screen name='SignUpScreen' component={SignUPScreen} />
    <Stack.Screen name='SignInScreen' component={SignInScreen} />
  </Stack.Navigator>
    )
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='auth' component={AuthStack} />
      <Stack.Screen name='user' component={UserStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
