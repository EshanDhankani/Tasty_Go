// Import necessary modules
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signup = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {

        console.log(cred)

        firestore()
          .collection('users')
          .doc(cred.user.uid)
          .set({
            name: username,
            email: email,
            id:cred.user.uid
          })
          .then(() => {
            console.log('User added!');
          });

        navigation.navigate('SignInScreen');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error creating user');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>
      <View style={styles.formContainer}>
        <Image
          style={{alignSelf: 'center', height: 80, width: 90}}
          source={require('../assets/logo.jpg')}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Eshan Kumar"
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="eshankumar@gmail.com"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="***********"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="***********"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.registerButton} onPress={signup}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    margin: 20,
    marginTop: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    padding: 40,
  },
  label: {
    color: 'black',
    fontSize: 16,
    marginTop: 12,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  input: {
    color: 'gray',
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    padding: 10,
  },
  registerButton: {
    backgroundColor: '#FFD718',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 250,
    height: 45,
    marginTop: 60,
  },
  registerButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
});

export default SignUpScreen;
