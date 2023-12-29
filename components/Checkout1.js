import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

export default function Checkout1() {
    const navigation = useNavigation();

    const [paymenMethod, setPaymentMethod] = React.useState('easyPaisa');
    const [username, setUsername] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [province, setProvince] = React.useState('');
    const [city, setPCity] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [code, setCode] = React.useState('');



    return (
        <View>

            <View style={styles.headerView}>
                <Text style={styles.headerText}>Checkout</Text>
            </View>

            <Image style={{ marginTop: 16, alignSelf: 'center' }} source={require("../assets/Icons.png")}></Image>

            <View>
                <Text style={{ color: 'black', fontWeight: 500, fontSize: 16, marginTop: 23, alignSelf: 'center' }}>Enter Your Details</Text>
            </View>

            <Text style={{ color: 'black', fontSize: 17, marginRight: 12, fontWeight: 600, marginTop: 20, marginLeft: 54 }}> Full Name</Text>
            <TextInput
                style={{
                    height: 40,
                    width: 280,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10, alignSelf: 'center', marginTop: 4,
                    paddingRight: 8
                }}
                placeholder="Enter full Name"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <Text style={{ color: 'black', fontSize: 17, fontWeight: 600, marginTop: 15, marginLeft: 59 }}>Phone Number</Text>
            <TextInput
                style={{
                    height: 40,
                    width: 280,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10, alignSelf: 'center'
                }}
                placeholder="Enter phone number"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />

            <Text style={{ color: 'black', fontSize: 17, fontWeight: 600, marginTop: 15, marginLeft: 59 }}>Province</Text>
            <TextInput
                style={{
                    height: 40,
                    width: 280,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10, alignSelf: 'center'
                }}
                placeholder="Enter your province"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />

            <Text style={{ color: 'black', fontSize: 17, fontWeight: 600, marginTop: 15, marginLeft: 59 }}>City</Text>
            <TextInput
                style={{
                    height: 40,
                    width: 280,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10, alignSelf: 'center'
                }}
                placeholder="Enter your city"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />

            <Text style={{ color: 'black', fontSize: 17, fontWeight: 600, marginTop: 15, marginLeft: 59 }}>Street Address</Text>
            <TextInput
                style={{
                    height: 40,
                    width: 280,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10, alignSelf: 'center'
                }}
                placeholder="Enter your street address"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />

            <Text style={{ color: 'black', fontSize: 17, fontWeight: 600, marginTop: 15, marginLeft: 59 }}>Postal Code</Text>
            <TextInput
                style={{
                    height: 40,
                    width: 280,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10, alignSelf: 'center'
                }}
                placeholder="Enter postal code"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <TouchableOpacity style={styles.LoginButton} onPress={() => navigation.navigate("payment")}>
                <Text style={styles.LoginButtonText}>Confirm</Text>
            </TouchableOpacity>

        </View>
    );
}
const styles = StyleSheet.create({
    headerView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FED718',
        padding: 14,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black'
    },
    LoginButton: {
        backgroundColor: '#FFD718',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 250,
        height: 40,
        marginTop: 40,

    },
    LoginButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',

    },


});