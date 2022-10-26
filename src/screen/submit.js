import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from "axios";
import { useTranslation } from 'react-i18next';


import {URL} from '@env'

const Submit = ({ route, navigation  }) => {
  const [un, setUn] = useState('');
  const { username,button,issue} = route.params;
  const {t,i18n}=useTranslation();

  const [dis,setdis] = useState('');

  useEffect(() => {
    getUn();
  }, []);

const getUn=async()=>{
  const user= await AsyncStorage.getItem('userName');
  if(user){
    setUn(user)
  }
}
const   save=async()=>{
  const jwt= await AsyncStorage.getItem('token');
 

axios({
  method: 'post',
  url: URL +'/api/choose',
  data: {
      "btn": issue,
      "text": dis
  },
  headers: {
    Authorization: "Bearer " + jwt
}
})  .then( async function (response) {

 if(response.status==202){


  alert("your issue is recorded.plase wait...");



  navigation.navigate('Home')
 

 }else{
  alert(response.data.msg);
 }

 
});
}
  return (
    <View style={{flex: 2}}>
      <View style={style.nav}>
        <Image style={style.tinyLogo} source={require('./assets/icon.png')} />

        <View>
          <Text style={style.hello}>{t('welcomeText')}</Text>
          <Text style={style.user}>{un}</Text>
        </View>
      </View>

      <View style={{width: '100%', height: '80%', padding: 20}}>
        <Text style={{fontWeight: '700', fontSize: 20, color: '#181818',paddingBottom:10}}>
          {t('issueType')}
        </Text>
        <Text
          style={{
            backgroundColor: '#3330E4',
            width: '40%',
            padding: 10,
            textAlign: 'center',
            borderRadius: 20,
            fontWeight: '700',
            fontSize: 15,
            color: '#F9F9F9',
          }}>
          {button}
        </Text>

        <Text style={{fontWeight: '700', fontSize: 20, color: '#181818',paddingTop:15,paddingBottom:10}}>
          {t('note')}
        </Text>

        <TextInput 
        multiline
        numberOfLines={8}
        maxLength={400}


        style={{
          
            padding:10,
            borderStyle:'solid',
            borderColor:'#EEEEEE',
            borderWidth:2,
            maxHeight:"40%",
            minWidth:"40%",
            fontWeight:'400',
            fontSize:14,
            color:'#181818'


        }}

        onChangeText={(dis) => setdis(dis)} value={dis}

        
        >
       
        </TextInput>

        <TouchableOpacity style={{backgroundColor:"#11468F",alignSelf:'flex-end',marginTop:10,padding:10,borderRadius:5}} onPress={save}>
                <View style={style.buttonInside}>
             
                    <Text style={{fontSize:20,color:'#D4F6CC',fontWeight:'700'}}>{t('submit')}</Text>
                </View>
             </TouchableOpacity>
        

      </View>
      
    </View>
  );
};
const style = StyleSheet.create({
  tinyLogo: {
    width: 60,
    height: 60,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    borderColor: '#EAE7E5',

    elevation: 5,
  },
  nav: {
    flex: 1,
    //backgroundColor:'#0000FF',
    paddingTop: 5,
    paddingLeft: 10,
    borderStyle: 'solid',
    shadowColor: '#000',
    flexDirection: 'row',
  },
  hello: {
    paddingLeft: 10,
    fontSize: 25,
    fontWeight: '600',
    color: '#050404',
  },
  user: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#050404',
    textAlign: 'justify',
  },
});

export default Submit;
