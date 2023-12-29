import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleAddToFavs = async () => {
    try {
      const existingItems = await AsyncStorage.getItem('Favourite');
      const parsedExistingItems = existingItems
        ? JSON.parse(existingItems)
        : [];
      const item = {
        name: route.params?.name,
        price: route.params?.price,
        imageLink: route.params?.imageLink || route.params?.imagelink
      }
      const updatedItems = [...parsedExistingItems, item];
      await AsyncStorage.setItem('Favourite', JSON.stringify(updatedItems));

      console.log('Item added to favourites:', updatedItems);
    } catch (error) {
      console.error('Error adding item to favourites:', error);
    }

  };

  return (
    <View>
      <View style={{ backgroundColor: '#FFD718', paddingBottom: 22 }}>
        <Text style={{ alignSelf: 'center', paddingTop: 10, marginTop: 1, color: 'black', fontSize: 20 }}>Product Details</Text>
      </View>
      <View style={{ marginRight: 35, marginTop: 15, paddingBottom: 30, marginLeft: 29, borderWidth: 1, borderRadius: 10, borderColor: '#FED718' }}>

        <Fontisto name='ellipse' color={'#FDF8DD'} size={37} marginLeft={244}></Fontisto>

        <TouchableOpacity onPress={handleAddToFavs}>
          <AntDesign name='heart' color={'red'} size={25} marginLeft={250} marginTop={-28} />
        </TouchableOpacity>

        <Image style={{ alignSelf: 'center', height: 165, width: 240, borderRadius: 10 }} source={{ uri: route.params?.imageLink }} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 28 }}>

        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>{route.params?.name}</Text>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>Rs: {route.params?.price}</Text>
      </View>
      <Text style={{ color: '#13B419', fontSize: 16, marginLeft: 28, marginTop: 6 }}>In Stock</Text>
      <View style={{ flexDirection: 'row' }}>
        <AntDesign name='star' color={'#FED718'} size={20} marginLeft={23} paddingTop={4} />
        <AntDesign name='star' color={'#FED718'} size={20} marginLeft={3} paddingTop={4} />
        <AntDesign name='star' color={'#FED718'} size={20} marginLeft={3} paddingTop={4} />
        <AntDesign name='star' color={'#FED718'} size={20} marginLeft={3} paddingTop={4} />
        <AntDesign name='star' color={'#FED718'} size={20} marginLeft={3} paddingTop={4} />
        <Text></Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 23, margin: 14 }}>Product Quantity </Text>
        <View style={{ flexDirection: 'row', backgroundColor: '#FED718', borderRadius: 5, width: 90, height: 30, marginLeft: 50, marginTop: 16 }}>
          <TouchableOpacity>
            <MaterialIcons name='add' color={'black'} size={20} fontWeight={'bold'} marginTop={4} marginRight={18} />
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginRight: 19 }}>1</Text>
          <TouchableOpacity>
            <FontAwesome6 name='minus' color={'black'} size={16} marginTop={6} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginLeft: 23 }}>Product Details</Text>
        <Text style={{ marginLeft: 23, marginTop: 10 }}>{route.params?.desc} </Text>

      </View>
      <View>
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginLeft: 23, marginTop: 6 }}>Related Prdouct</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>

          <Image style={{ height: 59, width: 102, marginTop: 9, marginLeft: 23 }} source={require("../assets/pizza.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>

          <Image style={{ marginTop: 9, marginLeft: 10 }} source={require("../assets/chicken.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>

          <Image style={{ marginTop: 9, marginLeft: 10 }} source={require("../assets/biryani.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ProductDetails;
