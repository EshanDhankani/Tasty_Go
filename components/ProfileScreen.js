import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      const user = JSON.parse(data);
      setname(user.name);
      setemail(user.email);
    });
  });

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('user logged out');
        AsyncStorage.clear().then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'auth' }],
          });
        });
      });
  };
  return (
    <View>
      <View style={styles.container}>
        <Ionicons
          name="person"
          color={'black'}
          size={80}
          style={{ marginLeft: 23, paddingTop: 4, marginTop: 20 }}
        />
        <View style={styles.itemDetails}>
          <View style={styles.textContainer}>
            <Text style={{ color: 'black', marginLeft: 15, marginTop: 50 }}>
              {name}
            </Text>
            <Text style={{ color: 'green', marginLeft: 15 }}>{email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.BelowContainer}>
        <View>
          <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, marginTop: 20, color: 'black' }}>My orders</Text>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, marginTop: 20, color: 'black' }}>Payment Method</Text>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, marginTop: 20, color: 'black' }}>Update Information</Text>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, marginTop: 20, color: 'black' }}>Notification</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={logout} style={{ flexDirection: "row", marginTop: 20, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: 'black' }}>Log Out</Text>
            <View style={{ flexDirection: 'row' }}>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  itemDetails: {
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
    flex: 1,
  },
  textContainer: {
    justifyContent: 'space-between',
  },
  BelowContainer: {
    margin: 25,
    marginTop: 50,
  },
});

export default ProfileScreen;
