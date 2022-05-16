import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Dimensions, FlatList, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import { Text, Input } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import { Context as HistoryContext } from "../context/HistoryContext"
import { Context as DeviceContext } from "../context/DeviceContext"
import { Context as AuthContext } from "../context/AuthContext"
import LineChart_data from "../components/LineChart_data"
import MainHeader from '../components/MainHeader'
import { Image } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Dialog, Portal, Button, List } from 'react-native-paper';
import DeviceStateCard from '../components/DeviceStateCard';

//TODO improve UI
const MainScreen = ({ navigation }) => {
    var history = useContext(HistoryContext);

    var currentHistoryData = history.state.currentHistoryData;
    var showHistory = function (deviceID, sampleType) {
        navigation.navigate("历史数据", { _deviceID: deviceID, _sampleType: sampleType, _currentHistoryData: currentHistoryData})
    }
    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            {/* Added this scroll view to enable scrolling when list gets longer than the page */}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
                keyboardShouldPersistTaps='handled'
            >
                {/* Today's Tasks */}
                <View style={styles.tasksWrapper}>
                    <Text style={styles.sectionTitle}>仪器状态</Text>
                    <View style={styles.items}>
                        {/* This is where the tasks will go! */}
                        {
                            currentHistoryData.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => showHistory(item.deviceID, item.sampleType)}>
                                        <DeviceStateCard item={item} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {},
});

export default MainScreen;