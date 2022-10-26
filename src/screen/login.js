import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CostemButton from '../componets/CostemButton';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {URL} from '@env'
import axios from 'axios';

const Login = () => {



  const [un, setun] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const signIn = async () => {

    let fcmToken=await AsyncStorage.getItem('fcmToken');
    axios({
      method: 'post',
      url:URL+'/api/login' ,
      data: {
        email: un,
        password: password,
        fcmToken:fcmToken
        
      },
    }).then(async function (response) {
      if (response.status == 202) {
        await AsyncStorage.setItem('token', response.data.token);
   
   
        navigation.navigate('Home');
      } else {
        alert(response.data.msg);
      }
    });
  };

  return (
    <View style={styles.body}>
      <View style={{flex: 1}}>
        <Text style={styles.text}>Login</Text>
      </View>

      <View style={{flex: 2, alignItems: 'center', paddingBottom: 10}}>
        <TextInput
          style={styles.textInput}
          placeholder="email"
          onChangeText={un => setun(un)}
          value={un}></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          value={password}></TextInput>
      </View>

      <View style={{flex: 1}}>
        <CostemButton text={'Sign In'} color={'#1a8cff'} onPress={signIn} />
        <CostemButton
          style={{paddingTop: 10}}
          text={'Registrar'}
          color={'#1a8cff'}
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',

    flex: 1,
  },
  text: {
    color: '#0099ff',
    fontSize: 40,
    paddingTop: 30,
    paddingLeft: 20,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#0884d1',
    borderRadius: 5,
    color: '#000000',
    width: '90%',
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 25,
    marginBottom: 20,
    textDecorationLine: 'none',
  },
});
export default Login;
