import React,{useState,useContext} from 'react'
import {View,StyleSheet} from 'react-native'
import {Text,Input,Button} from 'react-native-elements'
import Spacer from '../components/Spacer'
import {Context as AuthContext} from "../context/AuthContext"
import AuthForm from '../components/AuthForm'
import { TouchableOpacity } from 'react-native'
import NavLink from '../components/NavLink'
import { NavigationEvents } from 'react-navigation'
import { useEffect } from 'react'

const SigninScreen = ({navigation})=>{
    const {state,signin,clearErrorMessage,tryLocalSignin} = useContext(AuthContext);
    // useEffect(()=>{
    //     tryLocalSignin();
    // },[]);
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={clearErrorMessage}/>
            <AuthForm
                hearText = "登录德林Smart系统平台"
                errorMessage = {state.errorMessage}
                submitButtonText = "登录"
                onSubmit = {signin}
            />
            <NavLink
                text="没有账号,申请注册"
                navigation={navigation}
                routeName = {"Signup"} 
            />
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
        borderColor:'red',
        flex:1,
        justifyContent:"center",
        marginBottom:200
    },
    errorMessage:{
        fontSize:16,
        color:'red',
        marginLeft:15,
        marginTop:15
    }
});

SigninScreen.navigationOptions=()=>{
    return {
        headerShown: false,
        
    };
}

export default SigninScreen;