import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

export default function PaymentMethod() {

  const navigation = useNavigation();

  const [paymenMethod, setPaymentMethod] = React.useState('easyPaisa'); // Default selection
  const [username, setUsername] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <View>

      <View style={styles.headerView}>
        <Text style={styles.headerText}>Checkout</Text>
      </View>

      <Image style={{ marginTop: 16, alignSelf: 'center' }} source={require("../assets/Group3.png")}></Image>

      <View>
        <Text style={{ color: 'black', fontWeight: 500, fontSize: 16, marginTop: 23, alignSelf: 'center' }}>Choose Payment Method</Text>
      </View>
      <RadioButton.Group onValueChange={newValue => setPaymentMethod(newValue)} value={paymenMethod}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 45, marginLeft: 30 }}>
          <Image style={{ marginLeft: 39 }} source={require("../assets/easypaisa.png")}></Image>
          <Text style={{ color: 'black', fontWeight: 600, marginLeft: 95 }}>Easy Paisa</Text>
          <RadioButton value="easyPaisa" />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginLeft: 30 }}>
          <Image style={{ marginLeft: 39 }} source={require("../assets/money.png")}></Image>
          <Text style={{ marginLeft: 137 }}>Cash</Text>
          <RadioButton value="cash" />
        </View>
      </RadioButton.Group>

      <Text style={{ color: 'black', fontSize: 17, marginRight: 12, fontWeight: 600, marginTop: 60, marginLeft: 54 }}> Account Title</Text>
      <TextInput
        style={{
          height: 40,
          width: 280,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10, alignSelf: 'center', marginTop: 4
        }}
        placeholder="Enter account holder name"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={{ color: 'black', fontSize: 17, fontWeight: 600, marginTop: 25, marginLeft: 59 }}>Account Number</Text>
      <TextInput
        style={{
          height: 40,
          width: 280,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10, alignSelf: 'center'
        }}
        placeholder="Enter account number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TouchableOpacity style={styles.LoginButton} onPress={() => navigation.navigate("confirmorder")}>
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
    marginTop: 149,
    // marginBottom: 50

  },
  LoginButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },


});