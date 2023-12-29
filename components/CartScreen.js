import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [loading, setloading] = useState(false);

  const handlerefreshdata = async () => {
    setloading(true);
    try {
      const storedItems = await AsyncStorage.getItem('cart');
      const parsedItems = storedItems ? JSON.parse(storedItems) : [];
      setCartItems(parsedItems);

      const initialQuantityMap = {};
      parsedItems.forEach(item => {
        initialQuantityMap[item.id] = 1;
      });
      setQuantityMap(initialQuantityMap);
      setloading(false);
    } catch (error) {
      console.error('Error retrieving cart items:', error);
      Alert.alert('Error', 'Failed to retrieve cart items. Please try again.');
    }
    setloading(false);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      setloading(true);
      try {
        const storedItems = await AsyncStorage.getItem('cart');
        const parsedItems = storedItems ? JSON.parse(storedItems) : [];
        setCartItems(parsedItems);

        const initialQuantityMap = {};
        parsedItems.forEach(item => {
          initialQuantityMap[item.id] = 1;
        });
        setQuantityMap(initialQuantityMap);
        setloading(false);
      } catch (error) {
        console.error('Error retrieving cart items:', error);
        Alert.alert(
          'Error',
          'Failed to retrieve cart items. Please try again.',
        );
      }
      setloading(false);
    };
    fetchCartItems();
  }, []);

  const removeItemFromCart = async itemId => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      const updatedQuantityMap = { ...quantityMap };
      delete updatedQuantityMap[itemId];

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      await AsyncStorage.setItem(
        'quantityMap',
        JSON.stringify(updatedQuantityMap),
      );

      setCartItems(updatedCart);
      setQuantityMap(updatedQuantityMap);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      Alert.alert(
        'Error',
        'Failed to remove item from cart. Please try again.',
      );
    }
  };

  const handleIncrement = itemId => {
    setQuantityMap(prevQuantityMap => ({
      ...prevQuantityMap,
      [itemId]: (prevQuantityMap[itemId] || 1) + 1,
    }));
  };

  const handleDecrement = itemId => {
    setQuantityMap(prevQuantityMap => ({
      ...prevQuantityMap,
      [itemId]: Math.max((prevQuantityMap[itemId] || 1) - 1, 1),
    }));
  };

  const calculateSubtotal = item => {
    const itemPrice = item.price;
    const itemQuantity = quantityMap[item.id] || 1;
    return itemQuantity * itemPrice;
  };

  const calculateDiscount = () => {
    return 0;
  };

  const calculateTotal = () => {
    if (cartItems.length === 0) {
      return 0;
    }

    const subtotal = cartItems.reduce(
      (total, item) => total + calculateSubtotal(item),
      0,
    );
    const discount = calculateDiscount();
    return subtotal - discount;
  };

  const handleBuyNow = () => {
    console.log('Buy Now clicked!');
    navigation.navigate('checkout1');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        style={styles.image}
        source={{ uri: item.imageLink || item.imagelink }}
      />

      <View style={styles.itemDetails}>
        <View style={styles.textContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Rs: {item.price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleDecrement(item.id)}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantityMap[item.id] || 1}</Text>
          <TouchableOpacity
            onPress={() => handleIncrement(item.id)}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => removeItemFromCart(item.id)}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handlerefreshdata} />
        }>
        <View>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Subtotal</Text>
          <Text style={styles.footerText}>
            Rs: {calculateTotal().toFixed(2)}
          </Text>
        </View>
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Discount</Text>
          <Text style={styles.footerText}>
            Rs: {calculateDiscount().toFixed(2)}
          </Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Total</Text>
          <Text style={styles.footerText}>
            Rs: {calculateTotal().toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    backgroundColor: '#FED718',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    marginTop: 10,
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
  },
  textContainer: {
    marginLeft: 10,
  },
  itemName: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    fontWeight: 'bold',
    marginRight: 10,
  },
  quantityButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  quantityButtonText: {
    color: 'black',
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 8,
    color: 'black',
    fontSize: 16,
  },
  closeButton: {
    width: 20,
    height: 20,
    backgroundColor: '#FF0000',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 3,
    right: 3,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  footerText: {
    color: 'black',
    fontSize: 16,
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

export default CartScreen;
