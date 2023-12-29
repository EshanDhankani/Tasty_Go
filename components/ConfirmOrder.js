import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ConfirmOrder = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calculateSubtotal = () => {
    const itemPrice = 200;
    return quantity * itemPrice;
  };

  const calculateDelivery = () => {
    return 50;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const delivery = calculateDelivery();
    return subtotal + delivery;
  };

  const handleBuyNow = () => {
    console.log('Buy Now clicked!');
    navigation.navigate("checkout4")
  };

  return (
    <View style={styles.fullScreen}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Checkout</Text>
        </View>
        <Image style={{ marginTop: 16, alignSelf: 'center' }} source={require("../assets/Vector.png")}></Image>
        <View style={styles.bodyView}>
          <View style={styles.itemContainer}>
            <Image
              style={styles.image}
              source={require('../assets/download.jpeg')}
            />
            <View style={styles.itemDetails}>
              <View style={styles.textContainer}>
                <Text style={{ color: 'black' }}>Chicken Burger</Text>
                <Text style={{ color: 'black' }}>Rs: 200</Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.footerRow}>
          <Text style={{ color: 'black' }}>Total</Text>
          <Text style={{ color: 'black' }}>Rs: {calculateSubtotal().toFixed(2)}</Text>
        </View>
        <View style={styles.footerRow}>
          <Text style={{ color: 'black' }}>Delivery Fee</Text>
          <Text style={{ color: 'black' }}>Rs: {calculateDelivery().toFixed(2)}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.footerRow}>
          <Text style={{ color: 'black', fontWeight: 700, fontSize: 19 }}>Subtotal</Text>
          <Text style={{ color: 'black', fontWeight: 700, fontSize: 19 }}>Rs: {calculateTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FED718',
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  bodyView: {
    borderRadius: 10,
    margin: 10,
  },
  itemContainer: {
    backgroundColor: '#FED718',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30
   },
  image: {
    margin: 10,
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black'
  },
  textContainer: {
    marginLeft: 10,
    color: 'black'
  },
  quantityContainer: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    fontWeight: 'bold',
    marginRight: 10
  },
  quantityButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  quantityButtonText: {
    color: 'black',
  },
  quantityText: {
    marginHorizontal: 8,
    color: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'black',
  },
  footerContainer: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
    color: 'black',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  buyNowButton: {
    backgroundColor: '#FED718',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buyNowButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConfirmOrder;
