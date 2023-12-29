import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

export default function Checkout4() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#FED718', paddingBottom: 25 }}>
                <Text style={styles.headerText}>Checkout</Text>
            </View>

            <View style={{ marginTop: 65, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../assets/Image.png')}></Image>
            </View>
            <View style={{ marginTop: 36 }}>
                <Text style={{ fontWeight: 700, fontSize: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}> Your order has been </Text>
                <Text style={{ fontWeight: 700, fontSize: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}> placed successfully </Text>
                <Text style={{ fontWeight: 600, fontSize: 15, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginLeft: 6, marginTop: 13 }}> Thank you for choosing us Feel free to continue order and explore our wide rande of products </Text>

            </View>
            <TouchableOpacity style={styles.LoginButton} onPress={() => navigation.navigate("Tab", { screen: "HomeScreen" })}>
                <Text style={styles.LoginButtonText}>Continue</Text>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 15,
    },
    LoginButton: {
        backgroundColor: '#FFD718',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 250,
        height: 40,
        marginTop: 90,

    },
    LoginButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },

});