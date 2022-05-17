import React from 'react'
import { useContext } from 'react'
import { FlatList } from 'react-native'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import DeviceStateDate from '../components/DeviceStateData'
import Spacer from '../components/Spacer'
import {Context as DeviceContext }from '../context/DeviceContext'

import { Avatar, Card,Chip} from 'react-native-paper';

const DeviceInfoScreen = ({navigation}) => {
    var list = [1, 2, 3, 4, 1, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 4, 1, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 4, 1, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 4]
    const {state} = useContext(DeviceContext);
    return  (
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1,margin:10,marginTop:-20 }}>
            <DeviceStateDate navigation = {navigation} connectState = {state.connect} listState = {state.deviceState}></DeviceStateDate>
        </SafeAreaView>
    )
    // return (
    //     <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1,margin:10 }}>
    //         <DeviceStateDate index="名称" val="状态" header={true}>
    //             </DeviceStateDate>
    //         <FlatList data={state.deviceState} renderItem={({ index,item}) => {
    //             return <DeviceStateDate index={index} val={item}>
    //             </DeviceStateDate>
    //         }}>

    //         </FlatList>
    //     </SafeAreaView>
    // )
}
const styles = StyleSheet.create({});

export default DeviceInfoScreen;