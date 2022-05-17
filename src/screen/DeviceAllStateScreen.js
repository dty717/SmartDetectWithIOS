import React,{ useContext } from 'react'
import { TouchableOpacity, View,StyleSheet ,FlatList} from 'react-native'
import Spacer from '../components/Spacer'
import { Text } from 'react-native-elements'
import {Context as DeviceContext }from '../context/DeviceContext'
import { SafeAreaView } from 'react-navigation'

const  {dataState} = require('../common/config')

const DeviceAllStateScreen = () => {
    const {state} = useContext(DeviceContext);
    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1,margin:10,marginTop:-20 }}>
            <View style={styles.containerHeader}>
                <View style={styles.col1}>
                    <Text style={styles.textHeader }>名称</Text>
                </View>
                <View style={styles.col2}>
                    <Text style={styles.textHeader}>状态</Text>
                </View>
            </View>
            <FlatList data={state.deviceState} renderItem={({ index,item}) => {
                return <View style={styles.container}>
                    <View style={styles.col1}>
                        <Text style={styles.text}>{ dataState[index].name}</Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={styles.text}>{dataState[index].model(item)}</Text>
                    </View>
                </View>}}>
            </FlatList>
        </SafeAreaView>  
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        justifyContent: "flex-start",

        marginTop: 2
    },
    container: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: 2,
        borderTopWidth: 1
    },
    textHeader: {
        fontSize: 24
    },
    text: {
        fontSize: 20,
    },
    col1: {
        margin: 1,
        width: 120,
        flex: 2
    },
    col2: {
        margin: 1,
        width: 120,
        flex: 1,
    },
})
export default DeviceAllStateScreen