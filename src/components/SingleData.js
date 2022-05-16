import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Spacer from './Spacer'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native-elements'

import { DataTable } from 'react-native-paper';

const SingleData = ({ 时间, 送检样品, 样品号, 水样状态, 消解管号, 滴定剂消耗量, COD值, 快速滴定体积, 慢速滴定时间, 备注 ,header}) => {
    if(header){
        return(
            <DataTable.Header style={styles.containerHeader}>
                <DataTable.Title  style={styles.col1}><Text style={styles.textHeader}>{时间}</Text></DataTable.Title>
                <DataTable.Title  style={styles.col2}><Text style={styles.textHeader}>{送检样品}</Text></DataTable.Title>
                <DataTable.Title  style={styles.col7}><Text style={styles.textHeader}>{COD值}</Text></DataTable.Title>
                <DataTable.Title  style={styles.col4}><Text style={styles.textHeader}>{水样状态}</Text></DataTable.Title>
                <DataTable.Title  style={styles.col5}><Text style={styles.textHeader}>{消解管号}</Text></DataTable.Title>
                <DataTable.Title  style={styles.col6}><Text style={styles.textHeader}>{滴定剂消耗量}</Text></DataTable.Title>
                <DataTable.Title  style={styles.col8}><Text style={styles.textHeader}>{快速滴定体积}</Text></DataTable.Title>
                <DataTable.Title  style={styles.col9}><Text style={styles.textHeader}>{慢速滴定时间}</Text></DataTable.Title>
                <DataTable.Title  style={styles.col10}><Text style={styles.textHeader}>{备注}</Text></DataTable.Title>
            </DataTable.Header>
        )
    }
    时间 = 时间.replace('T',' ').substring(0,时间.length-5);
    return (
        <DataTable.Row style={styles.containerHeader}>
            <DataTable.Cell  style={styles.col3}><Text style={styles.text} numeric>{样品号}</Text></DataTable.Cell>
            <DataTable.Cell  style={styles.col1}><Text style={styles.text}>{时间}</Text></DataTable.Cell>
            <DataTable.Cell  style={styles.col2}><Text style={styles.text} >{送检样品}</Text></DataTable.Cell>
            <DataTable.Cell  style={styles.col7}><Text style={styles.text} numeric>{COD值}</Text></DataTable.Cell>
            <DataTable.Cell  style={styles.col4}><Text style={styles.text}>{水样状态}</Text></DataTable.Cell>
            <DataTable.Cell  style={styles.col5}><Text style={styles.text} numeric>{消解管号}</Text></DataTable.Cell>
            <DataTable.Cell  style={styles.col6}><Text style={styles.text} numeric>{滴定剂消耗量}</Text></DataTable.Cell>
            <DataTable.Cell  style={styles.col8}><Text style={styles.text} numeric>{快速滴定体积}</Text></DataTable.Cell>
            <DataTable.Cell  style={styles.col9}><Text style={styles.text} numeric>{慢速滴定时间}</Text></DataTable.Cell>
            <DataTable.Cell  style={styles.col10}><Text style={styles.text}>{备注}</Text></DataTable.Cell>
        </DataTable.Row>

    )
}
const paramVal = 1;

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: paramVal
    },
    container: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: 2,
        borderTopWidth:1,
    },
    textHeader:{
        fontSize: 21
    },
    text:{
        fontSize: 18
    },
    col1: {
        marginHorizontal: 1,
        width: 180,
        marginLeft:120
    },
    col2: {
        marginHorizontal: 1,
        width: 160
    },
    colHeader:{
        width: 98,
        borderColor: "#BFBF1F",
        position:"absolute",
        justifyContent: "flex-start",
        marginTop: paramVal,
        top:0,
        left:7,
    },
    col3: {
        width: 98,
        borderColor: "#BFBF1F",
        position:"absolute",
        justifyContent: "flex-start",
        marginTop: paramVal,
        top:10,
        left:-9,
        // marginTop: 10,
        // marginBottom: 1,
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

})

export default SingleData