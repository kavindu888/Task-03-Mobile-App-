import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken=async()=>{
  try{
let fcmToken=await AsyncStorage.getItem('fcmToken');
console.log(fcmToken,"the old token");
if(!fcmToken){
  const fcmToken=await messaging().getToken();

  if(fcmToken){
    console.log(fcmToken,"the new token");
    await AsyncStorage.setItem('fcmToken',fcmToken)
  }
}
}catch(err){
  console.log(err)
 }

}
PushNotification.createChannel(
  {
    channelId: 'fcm_fallback_notification_channel', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel returned '${created}'`),
);



export const notificationListner=async()=>{

  
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );

  });

  messaging().onMessage(async remoteMessage=>{
    console.log("recived in froground",remoteMessage)
    PushNotification.localNotification({
      channelId: 'fcm_fallback_notification_channel', // (required)
      channelName: 'My channel',
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      bigPictureUrl: remoteMessage.notification.android.imageUrl,
      smallIcon: remoteMessage.notification.android.imageUrl,
    });

  })


  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification
      );

    }

  });

}