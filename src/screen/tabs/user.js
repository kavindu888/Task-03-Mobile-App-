import React, {useState, useTransition } from 'react';
import { BackHandler } from 'react-native';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {URL} from '@env'
const User = () => {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

const {t,i18n}=useTranslation();

const sinhala=async()=>{
  await AsyncStorage.removeItem('language');
  i18n.changeLanguage('sn');

  await AsyncStorage.setItem('language','sn');

}
const english=async()=>{
  await AsyncStorage.removeItem('language');
  i18n.changeLanguage('en')
  await AsyncStorage.setItem('language','en');
}

  const handleLogout =  async() => {

    const dataToken = await AsyncStorage.getItem('token');

    axios({
      method: 'get',
      url: URL+'/api/logout',
      headers: {
        Authorization: 'Bearer ' + dataToken,
      },
    })

    AsyncStorage.clear();
    navigation.navigate('Login');
    BackHandler.exitApp();
    
  };
  return (
    <View style={{flex: 1}}>
      <Text style={style.text}>{t('user')}</Text>

      <View style={{padding: 10}}>
        <View style={style.main}>
          <View style={style.view}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={style.centeredView}>
                <View style={style.modalView}>
                  <Text style={style.modalText}>{t('selectLng')}</Text>
                  <Pressable
                    style={style.lanbutton}
                    onPress={english}
                   >
                    <Text style={style.textStyle}>English</Text>
                  </Pressable>

                  <Pressable 
                      style={style.lanbutton}
                      onPress={sinhala}
                  >
                    <Text style={style.textStyle}>සිංහල</Text>
                  </Pressable>

                </View>
                <Pressable
                    style={{width:'20%',backgroundColor:'#D2001A',alignItems:'center',padding:5,borderRadius:5}}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{color:'white',alignSelf:'center',fontSize:12}}>Close</Text>
                  </Pressable>
              </View>
            </Modal>
            <Pressable
              style={{width: '100%', padding: 12}}
              onPress={() => setModalVisible(true)}>
              <Text style={style.textStyle}>{t('selectLng')}</Text>
            </Pressable>
          </View>
          <View style={style.view}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                fontSize: 20,
                alignSelf: 'center',
              
              
                width:'100%',
                height:'100%',
                padding:10
                
              }}
              onPress={handleLogout}>
              <View style={style.buttonInside}>
                <Text
                  style={{
              
                    fontSize: 15,
                    fontWeight:'700',
                  color:'#000',
                    fontWeight: '700',
                    justifyContent:'center',

                   
                  }}>
                {t('logOut')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  text: {
    color: '#000000',
    padding: 20,
    alignSelf: 'flex-start',
    fontSize: 25,
    fontWeight: '700',
  },
  main: {
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  view: {
    width: '100%',
    height: '50%',
    borderStyle: 'solid',
    borderColor: '#5F939A',
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
  },
  onOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '80%',
    borderStyle:'solid',
    borderColor:'#2192FF',
    borderWidth:2,
    height:'50%',
    justifyContent:'center',

    padding: 35,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: '#000',
    fontSize: 15,
    padding: 10,
    fontWeight:'700'
  },
  lanbutton: {
    padding: 10,
    borderStyle: 'solid',
    borderColor: '#2192FF',
    borderWidth: 2,
    margin:5,
    width:'100%'
  },
});

export default User;
