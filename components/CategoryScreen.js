import React, { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { biryaniData } from '../Data/BiryaniData';
import { BurgerData } from '../Data/BurgerData';
import { SaladData } from '../Data/SaladData';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { PizzaData } from '../Data/PizzaData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState([]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    let newData = [];
    switch (selectedCategory) {
      case 'Pizza':
        newData = PizzaData;
        break;
      case 'Biryani':
        newData = biryaniData;
        break;
      case 'Burger':
        newData = BurgerData;
        break;
      case 'Salad':
        newData = SaladData;
        break;
      default:
        newData = [];
    }
    setData(newData);
  }, [selectedCategory]);

  const onPressAddCart = async (item) => {
    try {
      const existingItems = await AsyncStorage.getItem('cart');
      const parsedExistingItems = existingItems ? JSON.parse(existingItems) : [];
      const updatedItems = [...parsedExistingItems, item];
      await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));

      console.log('Item added to cart:', item);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity style={styles.searchIcon}>
          <Feather name="search" size={25} color={'#3D3D3D'} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ marginTop: 15 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {['Pizza', 'Burger', 'Biryani', 'Salad'].map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryItem,
              {
                backgroundColor: selectedCategory === category ? '#FFD718' : '#FFFFFF',
              },
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => {
          console.log('Item:', item);
          return <RenderComponent item={item} onPressAddCart={onPressAddCart} />;
        }}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const RenderComponent = ({ item, onPressAddCart }) => {
  return (
    <View key={item.id} style={styles.productItem}>
      <Image style={styles.productImage} source={{ uri: item.imageLink || item.imagelink }} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productPrice}>Rs: {item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => onPressAddCart(item)} style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD718',
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
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
  categoryScroll: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  categoryItem: {
    borderWidth: 1,
    borderColor: '#FFD718',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 16,
  },
  productList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  productItem: {
    borderColor: '#FED718',
    borderWidth: 1,
    height: 240,
    width: 156,
    marginLeft: 10,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    alignItems: 'center'
  },
  productImage: {
    width: '90%',
    height: 105,
    borderRadius: 10,
    marginTop: 20
  },
  productTitle: {
    fontWeight: '400',
    color: '#000000',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontWeight: '400',
    color: '#000000',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: '#FFD718',
    width: '80%',
    height: 30,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 5,
    justifyContent: 'center',
  },
  addToCartText: {
    fontWeight: '400',
    color: '#000000',
    fontSize: 15,
    alignSelf: 'center',
  },
});

export default CategoryScreen;
