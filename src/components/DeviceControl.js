import React, { useContext, useEffect, useRef, useState } from 'react'
import { FlatList, Linking } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Text, Input } from 'react-native-elements'
import Spacer from './Spacer'
// import SingleData from './SingleData'
import { Button, DataTable, TextInput } from 'react-native-paper';
import { Context as HistoryContext } from '../context/HistoryContext'
import { Context as AuthContext } from "../context/AuthContext"
import { Animated } from 'react-native'
import axios from 'axios'
import { WebView } from 'react-native-webview';
const { uploadIP } = require('../common/config')
var ismoving = false;
var movingEvent;
var movingValue = 0;
const label = {
    "": "全部",
    COD: "化学需氧量",
    CODMN: "高锰酸盐",
    ELE: "电导率",
    N: "总氮",
    NH3: "氨氮",
    O2: "溶解氧",
    P: "总磷",
    PH: "PH",
    TEM: "温度",
    TUR: "浊度",
    CL: "余氯",
    O3: "臭氧"
}
const DeviceControl = ({ deviceID, label, username, password,currentHistoryData }) => {
    const { state } = useContext(HistoryContext);
    const authContext = useContext(AuthContext)

    //TODO improve UI scroll end to end(ios has the problem)
    return (
        <View style={{ flex: 1 }}>
            <WebView
                originWhitelist={['*']}
                onMessage={(event) => {
                    Linking.openURL(uploadIP + "/SmartDetectHistory?" + new URLSearchParams(JSON.parse(event.nativeEvent.data)).toString());
                }}
                source={{
                    uri: 
                    axios.getUri({
                        url:'https://test.dty71719dfd.site:3443/web/chat-rtc/',
                        params:{
                            deviceID,
                            label,
                            username,
                            password,
                            currentHistoryData
                        }
                    })
                    // `?deviceID=${deviceID}&label=${encodeURI(label)}&username=${username}&password=${password}`
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: "row",
        flex: 1,
        padding: 0,
    },
    root: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    text: {
        fontSize: 18
    },

    containerHeader: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: 1,
        // backgroundColor:"white"
    },
    textHeader: {
        fontSize: 21,
    },
    col3: {
        width: 98,
        borderColor: "#BFBF1F",
        position: "absolute",
        justifyContent: "flex-start",
        marginTop: 1,
        top: 10,
        left: 0,
        // marginTop: 10,
        // marginBottom: 1,
    },

    col1: {
        marginHorizontal: 1,
        width: 180,
        marginLeft: 120,
    },
    col2: {
        marginHorizontal: 1,
        width: 160
    },
    col4: {
        marginHorizontal: 1,
        width: 100
    },
    col5: {
        marginHorizontal: 1,
        width: 100
    },
    col6: {
        marginHorizontal: 1,
        width: 150
    },
    col7: {
        marginHorizontal: 1,
        width: 100
    },
    col8: {
        marginHorizontal: 1,
        width: 150
    },
    col9: {
        marginHorizontal: 1,
        width: 150
    },
    col10: {
        marginHorizontal: 1,
        width: 200
    },
});

export default DeviceControl;