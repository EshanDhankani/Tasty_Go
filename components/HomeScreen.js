import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { biryaniData } from '../Data/BiryaniData';
import { BurgerData } from '../Data/BurgerData';
import { SaladData } from '../Data/SaladData';
import { PizzaData } from '../Data/PizzaData';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlipInEasyX } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const [biryani, setBiryani] = useState([]);
  const [pizza, setPizza] = useState([]);
  const [salad, setSalad] = useState([]);
  const [burger, setburger] = useState([]);

  const onPressAddCart = async item => {
    try {
      const existingItems = await AsyncStorage.getItem('cart');
      const parsedExistingItems = existingItems
        ? JSON.parse(existingItems)
        : [];
      const updatedItems = [...parsedExistingItems, item];
      await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));

      console.log('Item added to cart:', item);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const getproducts = async () => {
    setloading(true);
    const products = await firestore().collection('products').get();
    let burgers = [];
    let biryanis = [];
    let pizzas = [];
    let salads = [];

    products.docs.forEach(doc => {
      const data = doc.data();
      if (data.category == 'burger') {
        burgers.push(data);
      }

      if (data.category == 'salad') {
        salads.push(data);
      }

      if (data.category == 'biryani') {
        biryanis.push(data);
      }

      if (data.category == 'pizza') {
        pizzas.push(data);
      }
    });
    setPizza(pizzas);
    setburger(burgers);
    setBiryani(biryanis);
    setSalad(salads);
    setloading(false)
  };

  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    getproducts();
    setloading(false);
  }, []);

  return (
    <View>
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity style={styles.searchIcon}>
          <Feather name="search" size={25} color={'#3D3D3D'} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ marginBottom: 80 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getproducts} />
        }>
        <TouchableOpacity>
          <Feather
            name="search"
            size={25}
            color={'#3D3D3D'}
            style={{ marginLeft: 298, marginTop: -35 }}></Feather>
        </TouchableOpacity>

        <View>
          <Text
            style={{
              fontWeight: 400,
              color: '#000000',
              fontSize: 20,
              marginLeft: 15,
              marginTop: 8,
            }}>
            Burgers
          </Text>
          <FlatList
            data={burger}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <DisplayComponent
                imageLink={item.imageLink}
                name={item.name}
                price={item.price}
                desc={item.description}
                onPress={() => {
                  onPressAddCart(item);
                }}
              />
            )}
            horizontal
          />
        </View>

        <View>
          <Text
            style={{
              fontWeight: 400,
              color: '#000000',
              fontSize: 20,
              marginLeft: 15,
              marginTop: 8,
            }}>
            Pizza
          </Text>

          <FlatList
            data={pizza}
            keyExtractor={item => item.name.toString()}
            renderItem={({ item }) => (
              <DisplayComponent
                imageLink={item?.imagelink}
                name={item.name}
                price={item.price}
                desc={item.description}
                onPress={() => {
                  onPressAddCart(item);
                }}
              />
            )}
            horizontal
          />
        </View>

        <View>
          <Text
            style={{
              fontWeight: 400,
              color: '#000000',
              fontSize: 20,
              marginLeft: 15,
              marginTop: 8,
            }}>
            Biryani
          </Text>

          <FlatList
            data={biryani}
            keyExtractor={item => item.name.toString()}
            renderItem={({ item }) => (
              <DisplayComponent
                imageLink={item?.imageLink}
                name={item.name}
                price={item.price}
                desc={item.description}
                onPress={() => {
                  onPressAddCart(item);
                }}
              />
            )}
            horizontal
          />
        </View>

        <View>
          <Text
            style={{
              fontWeight: 400,
              color: '#000000',
              fontSize: 20,
              marginLeft: 15,
              marginTop: 8,
            }}>
            Salad
          </Text>
          <FlatList
            data={salad}
            keyExtractor={item => item.name.toString()}
            renderItem={({ item }) => (
              <DisplayComponent
                imageLink={item?.imagelink}
                name={item.name}
                price={item.price}
                desc={item.description}
                onPress={() => {
                  onPressAddCart(item);
                }}
              />
            )}
            horizontal
          />
        </View>
      </ScrollView>
    </View>
  );
};

const DisplayComponent = ({ imageLink, name, price, onPress, desc }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderColor: '#FED718',
        borderWidth: 1,
        height: 200,
        width: 156,
        marginLeft: 15,
        marginTop: 19,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('user', { screen: 'ProductDetails', params: { imageLink, name, price, desc } });
        }}>
        <Image
          style={{
            width: 135,
            height: 105,
            marginTop: 10,
            alignSelf: 'center',
            borderRadius: 10,
          }}
          source={{ uri: imageLink }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: 400,
          color: '#000000',
          fontSize: 15,
          alignSelf: 'center',
        }}>
        {name}
      </Text>
      <Text
        style={{
          fontWeight: 400,
          color: '#000000',
          fontSize: 15,
          alignSelf: 'center',
          marginTop: 5,
        }}>
        {price}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: '#FFD718',
          width: 100,
          height: 23,
          borderRadius: 6,
          alignSelf: 'center',
          marginTop: 5,
        }}>
        <Text
          style={{
            fontWeight: 400,
            color: '#000000',
            fontSize: 15,
            alignSelf: 'center',
          }}>
          Add to Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
  },
  searchIcon: {
    marginLeft: 10,
  },
});

export default HomeScreen;
