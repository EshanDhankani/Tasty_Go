import * as React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signin = () => {
    auth().signInWithEmailAndPassword(username, password).then(async (data) => {
      console.log("yes")
      const curruser = await firestore().collection('users').doc(data.user.uid).get();
      console.log(data.user)
      console.log(curruser.data())
      AsyncStorage.setItem("user", JSON.stringify(curruser.data())).then(() => {
        // Alert.alert("User Logged in");
        navigation.reset({
          index: 0,
          routes: [{ name: "user" }]
        });
      })
    })
      .catch((err) => {
        console.log(err)
        Alert.alert("Invalid Email");
      })


  }
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign in</Text>
      </View>
      <View style={styles.formContainer}>
        <Image
          style={{ alignSelf: 'center', height: 80, width: 90 }}
          source={require('../assets/logo.jpg')}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        
        <TouchableOpacity onp style={styles.LoginButton}
          onPress={(signin)}
        >
          <Text style={styles.LoginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginTop: 30,
              fontSize: 18,
              fontWeight: '600',
              color: 'black',
            }}>
            Don't have account
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                marginTop: 30,
                fontWeight: '600',
                fontSize: 18,
                color: '#FED718',
              }}>
              {' '}
              Sign Up Now!
            </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 120,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    margin: 20,
    marginTop: 60,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    padding: 40,
  },
  label: {
    color: 'black',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 5,
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
    marginBottom: 5,
    alignSelf: 'center',
  },
  LoginButton: {
    backgroundColor: '#FFD718',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 250,
    height: 45,
    marginTop: 60,
  },
  LoginButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 60,
    flexDirection: 'row',
  },
});

export default SignInScreen;



