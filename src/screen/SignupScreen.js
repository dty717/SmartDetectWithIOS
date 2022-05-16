import React,{useContext} from 'react'
import {View,StyleSheet} from 'react-native'
import {Context as AuthContext} from "../context/AuthContext"
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { NavigationEvents } from 'react-navigation'

const SignupScreen = ({navigation})=>{
    const {state,signup,clearErrorMessage} = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={clearErrorMessage}/>
            <AuthForm
                hearText = "注册账号"
                errorMessage = {state.errorMessage}
                submitButtonText = "注册"
                onSubmit = {signup}
            />

            <NavLink
                text="已有账号,进行登录"
                navigation={navigation}
                routeName = {"Signin"} 
            />
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
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

SignupScreen.navigationOptions=()=>{
    return {
        headerShown: false,
        
    };
}
export default SignupScreen;