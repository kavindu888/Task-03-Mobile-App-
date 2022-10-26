import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import messaging from '@react-native-firebase/messaging';
import {useTranslation} from 'react-i18next';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';


import {URL} from '@env'

const Notify = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const {t, i18n} = useTranslation();

  const getnotification = async () => {
    try {

      const snoToken = await AsyncStorage.getItem('sno');
if(!snoToken){

}else{

let queNo= parseInt(snoToken);


      const dataToken = await AsyncStorage.getItem('token');
let url=URL+'/api/notification?sno='+queNo
      axios({
        method: 'get',
        url:url ,
        headers: {
          Authorization: 'Bearer ' + dataToken,
          
        

        },
      }).then(async function (response) {
        if (response.status == 200) {
          const snoNo = response.data.notifi;
          setData(snoNo);
          setLoading(true);
        } else {
          setData(null);
          setLoading(false);
        }
      });
    }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          getnotification();
        } catch (e) {
          console.log(e);
        }
      };

      fetchUser();
    }, []),
  );

  const MINUTE_MS = 10000;
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('notificatipon');
      getnotification();
    }, MINUTE_MS);

    return () => clearInterval(interval); 
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text style={style.text}>{t('notification')}</Text>

      <View style={{paddingBottom: 20}}>
        {isLoading ? (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={{padding: 10}}>
                <View style={style.view}>
                  <View>
                    <Text>
                      <Icon2
                        name="format-list-checks"
                        size={50}
                        color="#346751"
                      />
                    </Text>
                  </View>
                  <Text style={style.notiText}>{item.notification}</Text>
                </View>
              </View>
            )}
          />
        ) : null}
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
  view: {
    maxWidth: '100%',
    padding: 10,

    borderStyle: 'solid',
    borderColor: '#B20600',
    borderWidth: 2,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  notiText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default Notify;
