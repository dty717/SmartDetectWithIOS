import React from 'react'
import {View,StyleSheet, TextInput} from "react-native"
import { Button, Text } from 'react-native-elements'

const MainHeader = ({text1,textChange1,text2,textChange2,text3,textChange3})=>{
    
    return (
        <View style = {{flex:1,justifyContent:"flex-end"}}>
        <View style={styles.row}>
            <View style = {styles.text}>
                <Text style={{fontSize:16}}>状态</Text>
            </View>
            <Text  style={styles.textInput} onChangeText = {textChange1}>{text1}</Text>
            <View style = {styles.text2}>
                <Text style={{fontSize:16}}></Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style = {styles.text}>
                <Text style={{fontSize:16}}>滴定数据</Text>
            </View>
            <Text  style={styles.textInput} onChangeText = {textChange2}>{text2}</Text>
            <View style = {styles.text2}>
                <Text style={{fontSize:16}}>mg/L</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style = {styles.text}>
                <Text style={{fontSize:16}}>蒸馏水光电压</Text>
            </View>
            <Text  style={styles.textInput}  onChangeText = {textChange3}>{text3}</Text>
            <View style = {styles.text2}>
                <Text style={{fontSize:16}}></Text>
            </View>
        </View>
        </View>
    )
}
const styles=StyleSheet.create({
    row:{
        flexDirection:'row',
        marginTop:10,
        justifyContent:"flex-end",
    },
    text:{
        justifyContent:'flex-start',
        textAlignVertical:'center',
        marginHorizontal:20,
        flex:4
    },
    text2:{
        justifyContent:'flex-start',
        textAlignVertical:'center',
        marginHorizontal:10,
        flex:2
    },
    textInput:{
        borderWidth:1,
        fontSize:16,
        justifyContent:'flex-end',
        alignContent:'center',
        width:70,
        paddingHorizontal:4,
        alignSelf:'center',
        flex:4
    }
})

export default MainHeader

/*

<View style = {styles.stateBox}>
<View style={{flexDirection:"row"}}>
    <Text>状态</Text>
    <TextInput style={styles.input} ></TextInput>
</View>
<View style={{flexDirection:"row"}}>
    <Text>滴定数据</Text>
    <TextInput style={styles.input} ></TextInput>
    <Text>  mg/L</Text>
</View>
<View style={{flexDirection:"row"}}>
    <Text>蒸馏水光电压</Text>
    <TextInput style={styles.input} value={param.state.蒸馏水光电压}></TextInput>
</View>
</View>
<LineChart_data data1 = {state.data.dataFlow1} 
data2 = {state.data.dataFlow2} data3 = {state.data.dataFlow3}>
</LineChart_data>
*/