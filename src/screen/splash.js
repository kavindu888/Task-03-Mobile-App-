import React, {useEffect}  from 'react';
import axios from 'axios';
import{
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    Image
  
   
  
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

const Splash= ({ navigation })=>{
    //const navigation=useNavigation();
    const {t,i18n}=useTranslation();
    useEffect(() => {
        setTimeout(() => {
          handleGetToken();
        }, 2000);
      });

      const handleGetToken = async () => {
        const dataToken = await AsyncStorage.getItem('token');
       
        

          
      

        if (!dataToken) {
          navigation.navigate("Login");
        } else {
        
          navigation.navigate("Home");
        }
      };
   return(
    <View style={styles.container}>
 <Image style={styles.tinyLogo} source={require('./assets/icon.png')} />
  </View>
   )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    text: {
      fontWeight: '800',
      fontSize: 30,
      color: 'black',
    },
    tinyLogo: {
      width: 120,
      height: 120,
      shadowOffset: {
        width: 2,
        height: 2,
      }
    },
  });

export default Splash;