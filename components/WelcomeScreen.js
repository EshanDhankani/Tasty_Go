import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const WelomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/welcome.png')} style={styles.image} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '52%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  button: {
    backgroundColor: '#FED718',
    marginBottom: 25,
    borderRadius: 70,
    width: 300,
    height: 50,
    marginHorizontal: -100,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    position: 'absolute',
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
    alignSelf: 'center',
  },
});

export default WelomeScreen;
