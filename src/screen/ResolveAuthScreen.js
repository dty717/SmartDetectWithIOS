import React, { useCallback, useRef, useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext'
import { Context as ParamContext } from '../context/ParamContext'
import { Context as DeviceContext } from '../context/DeviceContext'
import { Context as HistoryContext } from '../context/HistoryContext'
import { AsyncStorage } from 'react-native';
import trackerApi from '../api/tracker';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

if (Device.isDevice) {
  if (Platform.OS == 'ios') {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }
}

var storage;
if (typeof AsyncStorage == 'undefined') {
  try {
    storage = localStorage;
  } catch (error) {
    storage = AsyncStorage
  }
} else {
  storage = AsyncStorage
}

var { deviceType,getLoginState, setPid_And_PTtye, getCurrentDeviceID, setLastHistoryTime, setLastParamTime, getLastHistoryTime, getLastParamTime, elementAddr, valueShift, getDeviceID } = require('../common/config');

var _updateDeviceData;
var updateDeviceTimer = 0
// var lastHistoryTime =new Date(0);
// var lastParamTime = new Date(0);
const ResolveAuthScreen = () => {
  const authContext = useContext(AuthContext);
  const { initParam, getParamData } = useContext(ParamContext);
  const { state, updateDeviceData, init } = useContext(DeviceContext);
  const { updateHistoryData, updatePage } = useContext(HistoryContext);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  var callback = useCallback(
    () => {
      alert(JSON.stringify(authContext.state.currentDeviceID))
    },
    [authContext.state.currentDeviceID]
  );
  useEffect(() => {
    if (Device.isDevice) {
      if (Platform.OS == 'ios') {
        registerForPushNotificationsAsync().then(token => {
          setPid_And_PTtye(token, "ios")
        });
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
      }
    }
    callback;
    // useEffect(()=>{
    //     async function res(){
    //         return response = await trackerApi.post('/Historys',{deviceID:"COD_A_00001",time:new Date()});
    //     }
    //     console.log(res());
    //     //_updateDeviceData(response.data.deviceState);
    // })
    //var deviceID = authContext.state.deviceID[0];
    //"COD_A_00001";
    // var time = new Date();
    // updateHistoryData("COD_A_00001",time);
    storage.getItem("@param", (err, res) => {
      // firebase.initializeApp({
      //     apiKey: "AIzaSyBhWBoxP-CsBV_PbD0iH68w9-5V6W87x04",
      //     authDomain: "delincod.firebaseapp.com",
      //     projectId: "delincod",
      //     storageBucket: "delincod.appspot.com",
      //     messagingSenderId: "865920726070",
      //     appId: "1:865920726070:web:52d64e086642a7b6549497",
      //     measurementId: "G-2W2MN0E83B"
      //   })
      initParam(res);
      //getParamData("COD_A_00001");
      clearInterval(updateDeviceTimer)
      async function updateDeviceFunction() {
        if (!getLoginState()) {
          return
        }
        var deviceID = getDeviceID()//authContext.state.currentDeviceID;
        // alert( JSON.stringify({ deviceID,deviceType }))
        try {
          response = await trackerApi.post('/getDeviceState', { deviceID:deviceID.map(e=>e.id),deviceType });
        } catch (error) {
          init()
          return
        }
        if (response.data.state == "error") {
          init()
        } else {
          if (getLastParamTime() < new Date(response.data.lastParam)) {
            if (deviceID) {
              getParamData(deviceID);
              setLastParamTime(new Date(response.data.lastParam))
            }
          }
          if (getLastHistoryTime() < new Date(response.data.lastHistory)) {
            if (deviceID) {
              if (getLastHistoryTime() > new Date(0)) {
                updatePage();
              }
              setLastHistoryTime(new Date(response.data.lastHistory))
              // alert( JSON.stringify({deviceID:deviceID.map(e=>e.id)}))
              updateHistoryData({deviceID:deviceID.map(e=>e.id)},
                (data) => {
                  for(var item of data){
                    var _deviceID = deviceID.find(d => d.id == item.deviceID);
                     if (_deviceID) {
                        item.name = _deviceID.label
                      }
                  }
                  return data;
                }
              );
            }
          }
          updateDeviceData(response.data);
          // var elements = Object.keys(elementAddr);
          // var historyDatas = []
          // var deviceState = response.data.deviceState
          // for (let element of elements) {
          //   var yearShift = elementAddr[element] + valueShift.year;
          //   var time = new Date(deviceState[yearShift], deviceState[yearShift + 1] - 1, deviceState[yearShift + 2], deviceState[yearShift + 3], deviceState[yearShift + 4], deviceState[yearShift + 5]);
          //   if (time.getFullYear() < 2000) {
          //     continue;
          //   }
          //   time = time.toJSON();
          //   var value = deviceState[elementAddr[element] + valueShift.value];
          //   var errorFlag = deviceState[elementAddr[element] + valueShift.errorFlag];
          //   var systemFlag = deviceState[elementAddr[element] + valueShift.systemFlag];
          //   var temperature = deviceState[elementAddr[element] + valueShift.temperature];
          //   historyDatas.push(
          //     {
          //       sampleType: element,
          //       value,
          //       time,
          //       errorFlag,
          //       systemFlag,
          //       temperature
          //     }
          //   );
          // }
          // updateHistoryData(historyDatas);
        }
      }
      updateDeviceFunction();
      updateDeviceTimer = setInterval(updateDeviceFunction, 5000)
      authContext.tryLocalSignin();
    });
    _updateDeviceData = updateDeviceData;
  }, [authContext.state.currentDeviceID, callback]);
  return null;
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default ResolveAuthScreen
