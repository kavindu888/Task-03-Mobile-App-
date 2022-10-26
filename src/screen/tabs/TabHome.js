import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  AccessibilityInfo,
} from 'react-native';
import {URL} from '@env'
import CostemButton from '../../componets/CostemButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Home = ({navigation}) => {
  const [show, setshow] = useState(false);
  const [que, setque] = useState('');


  const {t, i18n} = useTranslation();

  const MINUTE_MS = 10000;
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log('Tab Home');
      try {
        const dataToken = await AsyncStorage.getItem('token');

        axios({
          method: 'get',
          url: URL+'/api/checkQue',
          headers: {
            Authorization: 'Bearer ' + dataToken,
          },
        }).then(async function (response) {
          if (response.status == 202) {
            const snoNo = response.data.sno;
          
            await AsyncStorage.setItem('sno', snoNo.toString());

            setshow(true);
            setque(snoNo);
           
          } else {
           
            setshow(false);
            setque(null);
        
          }
        });
      } catch (e) {
        console.log(e);
      }
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          const dataToken = await AsyncStorage.getItem('token');

          axios({
            method: 'get',
            url:  URL+'/api/checkQue',
            headers: {
              Authorization: 'Bearer ' + dataToken,
            },
          }).then(async function (response) {
            if (response.status == 202) {
              const snoNo = response.data.sno;

              setshow(true);
              setque(snoNo);
            } else {
              setshow(false);
              setque(null);
            }
          });
        } catch (e) {
          console.log(e);
        }
      };

      fetchUser();
    }, []),
  );

  const newSim = () => {
    navigation.navigate('submit', {
 
      button: 'New SIM Request',
      issue: 'new sim',
    });
  };
  const notWorking = () => {
    navigation.navigate('submit', {
    
      button: 'Sim Not Working',
      issue: 'not working',
    });
  };
  const register = () => {
    navigation.navigate('submit', {
    
      button: 'Sim Register',
      issue: 'register',
    });
  };
  const other = () => {
    navigation.navigate('submit', {
       
      button: 'Other',
      issue: 'other',
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {show ? (
          <View
            style={{flexDirection: 'row', paddingTop: 40, paddingLeft: 20}}
            hidden={false}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 15,
                color: '#000',
                paddingTop: 15,
                paddingRight: 20,
              }}>
              {t('queText')}
            </Text>
            <Text
              style={{
                backgroundColor: '#FF1E1E',
                textAlign: 'center',
                width: 50,
                height: 50,
                justifyContent: 'center',
                textAlignVertical: 'center',
                borderRadius: 50,
                color: '#000',
                borderStyle: 'dotted',
                borderColor: '#31C6D4',
                borderWidth: 5,
                fontWeight: '700',
              }}>
              {que}
            </Text>
          </View>
        ) : null}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={
            show
              ? style.desible
              : {backgroundColor: '#36AE7C', width: '45%', height: '100%'}
          }
          onPress={newSim}
          disabled={show}>
          <View style={style.buttonInside}>
            <Text>
              <Icon name="sim-card" size={50} color="#D4F6CC" />
            </Text>
            <Text
              style={{
                paddingTop: 20,
                fontSize: 15,
                color: '#D4F6CC',
                fontWeight: '700',
              }}>
              {t('newSimBtn')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            show
              ? style.desibleRight
              : {
                  backgroundColor: '#C21010',
                  width: '45%',
                  height: '100%',
                  marginLeft: 30,
                }
          }
          onPress={notWorking}
          disabled={show}>
          <View style={style.buttonInside}>
            <Text>
              <Icon2 name="sim-alert" size={50} color="#E8F9FD" />
            </Text>
            <Text
              style={{
                paddingTop: 20,
                fontSize: 15,
                color: '#F6FBF4',
                fontWeight: '700',
              }}>
              {t('notWorkigBtn')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#F9F9F9',
          flexDirection: 'row',
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={
            show
              ? style.desible
              : {backgroundColor: '#1C3879', width: '45%', height: '100%'}
          }
          onPress={register}
          disabled={show}>
          <View style={style.buttonInside}>
            <Text>
              <Icon name="user-plus" size={50} color="#F9F5EB" />
            </Text>
            <Text
              style={{
                paddingTop: 20,
                fontSize: 15,
                color: '#F6FBF4',
                fontWeight: '700',
              }}>
              {t('regiterBtn')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            show
              ? style.desibleRight
              : {
                  backgroundColor: '#EF5B0C',
                  width: '45%',
                  height: '100%',
                  marginLeft: 30,
                }
          }
          onPress={other}
          disabled={show}>
          <View style={style.buttonInside}>
            <Text>
              <Icons name="question-circle-o" size={50} color="#F9F5EB" />
            </Text>
            <Text
              style={{
                paddingTop: 20,
                fontSize: 15,
                color: '#F6FBF4',
                fontWeight: '700',
              }}>
              {t('otherBtn')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <Text></Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  buttonInside: {
    alignItems: 'center',
    paddingTop: 20,
  },
  desible: {
    backgroundColor: '#CFD2CF',
    width: '45%',
    height: '100%',
  },
  desibleRight: {
    backgroundColor: '#CFD2CF',
    width: '45%',
    height: '100%',
    marginLeft: 30,
  },
});

export default Home;
