import React from 'react'
import {View,StyleSheet, TextInput} from "react-native"
import { Button, Icon, Text } from 'react-native-elements'

const Text_State_Button_Button = ({text,stateColor,buttonText1,buttonText2,buttonCall1,buttonCall2})=>{
    return (<View style ={styles.container}>
        <View style = {styles.text}>
            <Text style={{fontSize:18}}>{text}</Text>
        </View>
        <View  style={styles.icon}>
            <Icon name='circle' size={40}
                color={stateColor} />
        </View>
        <View  style={styles.button}>
            <Button style={styles.button} title={buttonText1} onPress={buttonCall1}></Button>
        </View>
        <View  style={styles.button}>
            <Button style={styles.button} title={buttonText2} onPress={buttonCall2}></Button>
        </View>
    </View>)
}
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        flexDirection:'row',
        marginTop:40,
    },
    icon:{
        justifyContent:'center',
        textAlignVertical:'center',
        marginHorizontal:20
    },
    text:{
        justifyContent:'center',
        textAlignVertical:'center',
    },
    button:{
        justifyContent:'center',
        marginHorizontal:5,
        margin:1,
    }
})

export default Text_State_Button_Button