
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';




const TrackListsScreen = ({navigation})=>{



  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          if(Platform.OS!='web'){
            await sendPushNotification(expoPushToken);
          }
        }}
      />
    </View>
  );
}
//const styles= StyleSheet.create({});


export default TrackListsScreen;