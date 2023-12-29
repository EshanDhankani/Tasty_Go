import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetStartedScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const getuser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        navigation.replace("user")
      }
    }
    getuser();
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Started.jpg')} style={{ height: '100%', width: '100%' }} />


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WelcomeScreen')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 160,
    backgroundColor: '#FED718',
    padding: 10,
    borderRadius: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
  },
});

export default GetStartedScreen;
