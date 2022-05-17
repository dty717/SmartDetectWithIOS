import React from 'react'
import { TextInput } from 'react-native'
import {View,StyleSheet} from "react-native"
import { Button, Text} from 'react-native-elements'
import Spacer from './Spacer'

const Text_Input_Button = ({text,textInput,textInputChange,textEndEditing,buttonText,buttonColor,buttonCall})=>{
    return (<View style ={styles.container}>
        <View style = {styles.text}>
            <Text style={{fontSize:18}}>{text}</Text>
        </View>
        < TextInput  style = {styles.textInput} value ={textInput} onChangeText={textInputChange} onEndEditing = {textEndEditing} />
        {buttonText?(<View style={styles.button}>
            {buttonColor?
                <Button title={buttonText} onPress={buttonCall} buttonStyle = {{backgroundColor:buttonColor}}></Button>
                :<Button title={buttonText} onPress={buttonCall}></Button>
            }
        </View>):null}
    </View>)
}
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        flexDirection:'row',
        margin :10
    },
    text:{
        marginHorizontal:2,
        justifyContent:'center',
        textAlignVertical:'center',
        flex:2
    },
    textInput:{
        marginHorizontal:2,
        borderWidth:2,
        fontSize:17,
        paddingHorizontal:4,
        paddingVertical:0,
        width:80,
        flex:2
    },
    button:{
        justifyContent:'center',
        marginHorizontal:5,
        flex:1
    }
})

export default Text_Input_Button