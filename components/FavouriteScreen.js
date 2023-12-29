import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FavouriteScreen() {
  const [FavouriteItems, setFavouriteItems] = useState([]);
  const [loading, setloading] = useState(false);

  const handlerefreshdata = async () => {
    setloading(true)
    try {
      const storedItems = await AsyncStorage.getItem('Favourite');
      const parsedItems = storedItems ? JSON.parse(storedItems) : [];
      setFavouriteItems(parsedItems);
      setloading(false);
    } catch (error) {
      console.error('Error retrieving Favourite items:', error);
    }
    setloading(false);
  };

  useEffect(() => {
    const fetchFavouriteItems = async () => {
      // await AsyncStorage.removeItem("Favourite")
      try {
        setloading(true)
        const storedItems = await AsyncStorage.getItem('Favourite');
        const parsedItems = storedItems ? JSON.parse(storedItems) : [];
        setFavouriteItems(parsedItems);
        setloading(false);
      } catch (error) {
        console.error('Error retrieving Favourite items:', error);
        setloading(false);
      }
      setloading(false);
    };

    fetchFavouriteItems();
  }, []);

  const removeItemFromFavourite = async index => {
    try {
      const updatedFavourite = [...FavouriteItems];
      updatedFavourite.splice(index, 1);
      await AsyncStorage.setItem('Favourite', JSON.stringify(updatedFavourite));
      setFavouriteItems(updatedFavourite);
    } catch (error) {
      console.error('Error removing item from Favourite:', error);
    }
  };

  const renderFavouriteItem = (item, index) => (
    <View key={index} style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: item.imageLink }} />
      <View style={styles.itemDetails}>
        <View style={styles.textContainer}>
          <Text style={{ color: 'black' }}>{item.name}</Text>
          <Text style={{ color: 'black' }}>Rs: {item.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() => removeItemFromFavourite(index)}
          style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl onRefresh={handlerefreshdata} refreshing={loading} />
      }>
      <View style={styles.fullScreen}>
        <View style={styles.bodyView}>
          {FavouriteItems.map((item, index) =>
            renderFavouriteItem(item, index),
          )}
        </View>
      </View>
    </ScrollView>
  );
}

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
    color: 'black',
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
    borderRadius: 10
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
    color: 'black',
  },
  textContainer: {
    marginLeft: 10,
    color: 'black',
  },
  closeButton: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    bottom:37,
    right: 5
  },
  closeButtonText: {
    color: 'white',
  },
});

export default FavouriteScreen;
