import React,{useState} from 'react'
import {View,StyleSheet} from 'react-native'
import {Text,Input,Button} from 'react-native-elements'
import Spacer from '../components/Spacer'


const AuthForm = ({hearText,errorMessage,onSubmit,submitButtonText})=>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    return (
        <>
        <Spacer>
            <Text h3>{hearText}</Text>
        </Spacer>
        <Input 
            label="用户名"
            value={username}
            onChangeText = {setUsername}
            autoCapitalize = "none"
            autoCorrect = {false}/>
        <Input
            secureTextEntry
            label="密码"
            value={password}
            onChangeText = {setPassword}
            autoCapitalize = "none"
            autoCorrect = {false}/>
        {errorMessage?(<Text style={StyleSheet.flatten(styles.errorMessage)}>{errorMessage}</Text>):null}
        <Spacer>
        <Button title={submitButtonText} onPress={()=>{onSubmit({username,password})}}></Button>
        </Spacer>
        </>
    )
}
const styles= StyleSheet.create({
    errorMessage:{
        fontSize:16,
        color:'red',
        marginLeft:15,
        marginTop:15
    }
});

export default AuthForm;