import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import axios from 'axios';
const Tab = createMaterialBottomTabNavigator();

import menu from './tabs/TabHome';
import User from './tabs/user';
import notify from './tabs/notification';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {color} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {URL} from '@env'
const Home = ({navigation, route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [un, setUn] = useState('');
  const {t, i18n} = useTranslation();
  const getnotification = async () => {
    try {
      const dataToken = await AsyncStorage.getItem('token');

      axios({
        method: 'get',
        url: URL+'/api/getUserName',
        headers: {
          Authorization: 'Bearer ' + dataToken,
        },
      }).then(async function (response) {
        if (response.status == 202) {
          const user = response.data.fn;
          await AsyncStorage.setItem('userName', user);

          setUn(user);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getnotification();
  }, []);

  //
  const MINUTE_MS = 10000;
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log('Home');
      try {
        const dataToken = await AsyncStorage.getItem('token');

        axios({
          method: 'get',
          url: URL+'/api/notificationNo',
          headers: {
            Authorization: 'Bearer ' + dataToken,
          },
        }).then(async function (response) {
          if (response.status == 200) {
            const snoNo = response.data.notifi;

            setData(snoNo);
            setLoading(true);
          } else {
            setLoading(false);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  //
  let show = false;

  return (
    <View style={{flex: 2}}>
      <View style={style.nav}>
        <Image style={style.tinyLogo} source={require('./assets/icon.png')} />

        <View>
          <Text style={style.hello}>{t('welcomeText')}</Text>
          <Text style={style.user}>{un}</Text>
        </View>
      </View>

      <View style={{flex: 10}}>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#0096FF"
          inactiveColor="#3e2465"
          barStyle={{backgroundColor: '#FEFBF6'}}>
          <Tab.Screen
            name={t('home')}
            Icon="fonticons"
            component={menu}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="home" size={30} color={color} />
              ),
              fontSize: 10,
            }}
          />
          <Tab.Screen
            name={t('notification')}
            component={notify}
            options={{
              tabBarBadge: data,

              tabBarIcon: ({color, size}) => (
                <Icon2 name="notifications-active" size={30} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name={t('user')}
            component={User}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="user" size={30} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
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

export default Home;
