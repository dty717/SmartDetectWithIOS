import React from 'react'
import {View,StyleSheet, TextInput} from "react-native"
import { Button, Text } from 'react-native-elements'

const 质控样样式 = ({text,textInput,textInputChange,textEndEditing,text2,textInput2,textInputChange2,textEndEditing2,buttonText,buttonColor,buttonCall})=>{
    return (<View style ={styles.container}>
        <View style = {styles.text}>
            <Text style={{fontSize:18}}>{text}</Text>
        </View>
        
        <TextInput  style={styles.textInput} value ={textInput} onChangeText={textInputChange} onEndEditing = {textEndEditing} />
        <View style = {styles.text}>
            <Text style={{fontSize:18}}>{text2}</Text>
        </View>
        <TextInput  style={styles.textInput} value ={textInput2} onChangeText={textInputChange2} onEndEditing = {textEndEditing2}/>
        <View style={styles.button}>

        {buttonColor?
            <Button title={buttonText} onPress={buttonCall} buttonStyle = {{backgroundColor:buttonColor}}  ></Button>
            :<Button title={buttonText} onPress={buttonCall}></Button>
        }
        </View>
    </View>)
}
const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop:20,
        marginRight:10,
        justifyContent:'space-around',
    },
    text:{
        justifyContent:'center',
        textAlignVertical:'center',
        marginLeft:10,
        marginHorizontal:2,
    },
    textInput:{
        borderWidth:2,
        fontSize:17,
        justifyContent:'flex-end',
        alignContent:'center',
        width:70,
        paddingHorizontal:4,
        paddingVertical:0,
        alignSelf:"center",
        marginHorizontal:10,
        flex:4
    },
    button:{
        marginHorizontal:4
    }
})

export default 质控样样式