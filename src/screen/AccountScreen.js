import React, { useState } from 'react'
import { useContext } from 'react'
import {View,StyleSheet,Text} from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import {Context as AuthContext} from "../context/AuthContext"
import {Context as DeviceContext} from "../context/DeviceContext"
import {Context as HistoryContext} from "../context/HistoryContext"
import ModalSelector from 'react-native-modal-selector'
import { Switch,Paragraph } from 'react-native-paper'
var {initLast,deviceType} = require('../common/config');
//TODO error log out
const AccountScreen = ()=>{
    const { state, signout ,setCurrentDeviceID,setNotificationLevel,updateNotificationLevel} = useContext(AuthContext);
    const {init} = useContext(DeviceContext);
    const {initHistory} = useContext(HistoryContext);
    let index = 0;
    const data = [
        { key: index++, section: true, label: '水站' },
        ...state.deviceID.map((e, index) => { return { label: e.label, key: index + 1, customKey: e.id } })
    ];
    var selectKey = state.deviceID.findIndex(e=>{return e.id==state.currentDeviceID.id})
    if(selectKey<0){
        selectKey = 0;
    }
    var [currentDeviceIDIndex,setCurrentDeviceIDIndex] =  useState(selectKey);
    return (
        <SafeAreaView forceInset={{top:'always'}} style={{flex:1,justifyContent:'center'}}>
            <Spacer>
                <Text style={{fontSize:48,marginBottom:30,textAlign:"center"}}>账号</Text>
                <Text style={{fontSize:28,marginBottom:40,textAlign:"center"}}>{state.username?("用户名     "+state.username):""}</Text>
                <Text style={{fontSize:16,marginTop:20,textAlign:"center"}}>当前设备</Text>                
                <ModalSelector style={{marginBottom:10,alignContent:"center"}}
                    data={data}
                    initValue={"暂无设备,请与管理员联系后添加"}
                    selectedKey = {selectKey+1}
                    onChange={(option)=>{
                        currentDeviceIDIndex = option.key-1;
                        setCurrentDeviceIDIndex(option.key-1);
                        setCurrentDeviceID({currentDeviceID:state.deviceID[option.key-1],currentDeviceIDIndex})
                        init();
                        initHistory();
                        //when change device,state time init
                        initLast();
                    }} />
                <Text style={{fontSize:16,marginTop:5,textAlign:"center"}}>通知选择</Text>                
                <View style={styles.row}>
                    <Paragraph>设备连接通知</Paragraph>
                    <Switch value={state.currentDeviceID.notificationLevel&&(state.currentDeviceID.notificationLevel.indexOf("open")!=-1)} onValueChange={(e) => {
                        var notificationLevel = state.currentDeviceID.notificationLevel||[];
                        if(!e){
                            notificationLevel.splice(notificationLevel.indexOf("open"),1);
                        }else{
                            notificationLevel.push('open');
                        }
                        setNotificationLevel(notificationLevel);
                        updateNotificationLevel({ deviceID: state.currentDeviceID.id, username: state.username, deviceType, notificationLevel },
                            state.deviceID, state.currentDeviceID, currentDeviceIDIndex)
                    }} />
                </View>
                <View style={styles.row}>
                    <Paragraph>设备断开通知</Paragraph>
                    <Switch value={state.currentDeviceID.notificationLevel && (state.currentDeviceID.notificationLevel.indexOf("close") != -1)} onValueChange={(e) => {
                        var notificationLevel = state.currentDeviceID.notificationLevel||[];
                        if (!e) {
                            notificationLevel.splice(notificationLevel.indexOf("close"), 1);
                        } else {
                            notificationLevel.push('close');
                        }
                        setNotificationLevel(notificationLevel);
                        updateNotificationLevel({ deviceID: state.currentDeviceID.id, username: state.username, deviceType, notificationLevel },
                            state.deviceID, state.currentDeviceID, currentDeviceIDIndex)
                    }} />
                </View>
                <View style={styles.row}>
                    <Paragraph>设备异样报警</Paragraph>
                    <Switch value={state.currentDeviceID.notificationLevel && (state.currentDeviceID.notificationLevel.indexOf("deviceError") != -1)} onValueChange={(e) => {
                        var notificationLevel = state.currentDeviceID.notificationLevel||[];
                        if (!e) {
                            notificationLevel.splice(notificationLevel.indexOf("deviceError"), 1);
                        } else {
                            notificationLevel.push('deviceError');
                        }
                        setNotificationLevel(notificationLevel);
                        updateNotificationLevel({ deviceID: state.currentDeviceID.id, username: state.username, deviceType, notificationLevel },
                            state.deviceID, state.currentDeviceID, currentDeviceIDIndex)
                    }} />
                </View>
                <View style={styles.row}>
                    <Paragraph>数据更新通知</Paragraph>
                    <Switch value={state.currentDeviceID.notificationLevel && (state.currentDeviceID.notificationLevel.indexOf("dataUpdate") != -1)} onValueChange={(e) => {
                        var notificationLevel = state.currentDeviceID.notificationLevel||[];
                        if (!e) {
                            notificationLevel.splice(notificationLevel.indexOf("dataUpdate"), 1);
                        } else {
                            notificationLevel.push('dataUpdate');
                        }
                        setNotificationLevel(notificationLevel);
                        updateNotificationLevel({ deviceID: state.currentDeviceID.id, username: state.username, deviceType, notificationLevel },
                            state.deviceID, state.currentDeviceID, currentDeviceIDIndex)
                    }} />
                </View>
                <View style={styles.row}>
                    <Paragraph>数据异样报警</Paragraph>
                    <Switch value={state.currentDeviceID.notificationLevel&&(state.currentDeviceID.notificationLevel.indexOf("dataError")!=-1)} onValueChange={(e) => {
                        var notificationLevel = state.currentDeviceID.notificationLevel||[];
                        if (!e) {
                            notificationLevel.splice(notificationLevel.indexOf("dataError"), 1);
                        } else {
                            notificationLevel.push('dataError');
                        }
                        setNotificationLevel(notificationLevel);
                        updateNotificationLevel({ deviceID: state.currentDeviceID.id, username: state.username, deviceType, notificationLevel },
                            state.deviceID, state.currentDeviceID, currentDeviceIDIndex)
                    }} />
                </View>
                <Button title="退出登录" onPress = {signout} />
            </Spacer>
        </SafeAreaView>
    )
}
const styles= StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
});

export default AccountScreen;