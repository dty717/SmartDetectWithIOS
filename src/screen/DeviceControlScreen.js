
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import DeviceControl from '../components/DeviceControl'
import Spacer from '../components/Spacer'
import {Context as HistoryContext }from '../context/HistoryContext'
import {Context as AuthContext }from '../context/AuthContext'

const DeviceControlScreen = ({ navigation }) => {
    const {state:{currentHistoryData}} = useContext(HistoryContext);
    const { state: { username, password } } = useContext(AuthContext);
    
    var deviceID = navigation.getParam('_deviceID');
    var label = ""
    if(!deviceID){
        if(currentHistoryData[0]){
            deviceID = currentHistoryData[0].deviceID;
            label = currentHistoryData[0].name;
        }

    }
    // useEffect(()=>{
    //     async function res(){
    //         return response = await trackerApi.post('/Historys',{deviceID:"COD_A_00001",time:new Date()});
    //     }
    //     console.log(res());
    //     //_updateDeviceData(response.data.deviceState);
    // })
    
    // useEffect(()=>{ 
    //     var deviceID = "COD_A_00001";
    //     var time = new Date();
    //     updateHistoryData(deviceID,time)
    //     //_updateDeviceData = updateDeviceData;
    // },[]);

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style = {{flex:1,marginTop:20}}>
            <DeviceControl deviceID={deviceID} label={label} username={username} password={password} currentHistoryData={currentHistoryData}>
            </DeviceControl>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({});

export default DeviceControlScreen;
