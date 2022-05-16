import trackerApi from '../api/tracker';
import createDataContext from './createDataContext'
import "../navigationRef"
import { navigate } from '../navigationRef';
import { AsyncStorage } from 'react-native';
var  {setLoginState,setPid_And_PTtye,getPid_And_PTtye,setDeviceID, setCurDeviceID,deviceType} = require('../common/config')

var storage;
if(typeof AsyncStorage=='undefined'){
    try {
        storage = localStorage;
    } catch (error) {
        storage = AsyncStorage
    }
}else{
    storage = AsyncStorage
}

import { NativeModules } from 'react-native';

const { TokenModule } = NativeModules;

if(TokenModule){
  var constants = TokenModule.getConstants();
  if(constants){
    if(constants.pid&&constants.pType){
        setPid_And_PTtye(constants.pid,constants.pType)
    }
  }
}

const authReducer = (state,action)=>{
    switch(action.type){
        case 'add_error':
            return{...state,errorMessage:action.payload}
        case 'signup':
            return {errorMessage:"",token:action.payload.token,username:action.payload.username}
        case 'signin':
            setDeviceID(action.payload.deviceID);
            if (action.payload.deviceID[0] && (!action.payload.currentDeviceID || !action.payload.currentDeviceID.id)) {
                setCurDeviceID(action.payload.deviceID[0]);
                return { errorMessage: "", token: action.payload.token, username: action.payload.username, deviceID: action.payload.deviceID, currentDeviceID: {...action.payload.deviceID[0]} }
            } else {
                setCurDeviceID(action.payload.currentDeviceID);
                return { errorMessage: "", token: action.payload.token, username: action.payload.username, deviceID: action.payload.deviceID, currentDeviceID: {...action.payload.currentDeviceID} }
            }
        case 'signout':
            return {errorMessage:""};
        case 'clear_error_message':
            return {...state,errorMessage:""};
        case 'currentDeviceIDIndex':
            return {...state,currentDeviceID:{...state.deviceID[action.payload]}};
        case 'setNotificationLevel':
            var _state = state;
            _state.currentDeviceID.notificationLevel = action.payload;
            return {..._state};
        case 'setDeviceID':
            return {...state,deviceID:action.payload};
        default:
            return state;
    }
};

const signup = (dispatch) => async ({ username, password }) => {
    try {
        var  {pid,pType}= getPid_And_PTtye();
        const response = await trackerApi.post('/signup', {username, password,pid,pType,deviceType});
        await storage.setItem(
            '@token',
            response.data.token,
        );
        await storage.setItem(
            '@username',
            username
        );
        var deviceID = response.data.deviceID.filter(e=>{return e.id.startsWith('SmartDetect')});
        await storage.setItem(
            '@deviceID',
            JSON.stringify(deviceID)
        );
        var currentDeviceID = {};
        if(deviceID[0])
        {
            currentDeviceID = deviceID[0];
            await storage.setItem(
                '@currentDeviceID',
                JSON.stringify(currentDeviceID)
            );
        }
        setLoginState(true)
        dispatch({ type: 'signin', payload: {token:response.data.token,username,deviceID,currentDeviceID}})
        navigate('主页');
    } catch (error) {
        console.log(error);
        dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

// pid   =  phone id
// pType =  phone type
const signin = (dispatch)=> async ({ username, password }) => {
    try {
        var  {pid,pType}= getPid_And_PTtye();
        const response = await trackerApi.post('/signin', {username, password,pid,pType,deviceType});
        await storage.setItem(
            '@token',
            response.data.token,
        );
        await storage.setItem(
            '@username',
            username
        );
        var deviceID = response.data.deviceID.filter(e=>{return e.id.startsWith('SmartDetect')});
        await storage.setItem(
            '@deviceID',
            JSON.stringify(deviceID)
        );
        var currentDeviceID = {};
        if(deviceID[0])
        {
            currentDeviceID = deviceID[0];
            await storage.setItem(
                '@currentDeviceID',
                JSON.stringify(currentDeviceID)
            );
        }
        setLoginState(true)
        dispatch({ type: 'signin', payload: {token:response.data.token,username,deviceID,currentDeviceID}})
        navigate('主页');
    } catch (error) {
        dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

const signout = (dispatch)=>{
    return async ()=>{
        await storage.removeItem('@token');
        await storage.removeItem('@username');
        await storage.removeItem('@deviceID');
        await storage.removeItem('@currentDeviceID');
        setLoginState(false)
        navigate('loginFlow')
        dispatch({type:'signout'});
    };
}

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' })
}

const tryLocalSignin = (dispatch)=>async()=>{
    var token =await storage.getItem('@token');
    var username =await storage.getItem('@username');
    var deviceID =await storage.getItem('@deviceID');
    var currentDeviceID = await storage.getItem('@currentDeviceID');
    
    token = JSON.stringify(token);
    deviceID = JSON.parse(deviceID);
    currentDeviceID = JSON.parse(currentDeviceID);
    
    deviceID = deviceID?deviceID:{}
    currentDeviceID = currentDeviceID?currentDeviceID:{}

    if((token)&&(token.toLowerCase()!="null")&&(token.toLowerCase()!="undefined")){
        setLoginState(true)
        dispatch({type:'signin',payload:{token,username,deviceID,currentDeviceID}});
        navigate('主页')
    }else{
        navigate('loginFlow')
    }
}

const setCurrentDeviceID = (dispatch)=>async({currentDeviceID,currentDeviceIDIndex})=>{
    //change the deviceID immediately
    setCurDeviceID(currentDeviceID);
    await storage.setItem(
        '@currentDeviceID',
        JSON.stringify(currentDeviceID)
    );
    dispatch({type:'currentDeviceIDIndex',payload:currentDeviceIDIndex});
    // var token =await storage.getItem('@token');
    // var username =await storage.getItem('@username');
    // var deviceID =await storage.getItem('@deviceID');
    
    // token = JSON.stringify(token);
    // deviceID = JSON.parse(deviceID);
    // if((token)&&(token.toLowerCase()!="null")&&(token.toLowerCase()!="undefined")){
    //     setLoginState(true)
    //     dispatch({type:'signin',payload:{token,username,deviceID}});
    //     navigate('主页')
    // }else{
    //     navigate('loginFlow')
    // }
}

const setNotificationLevel = (dispatch)=>(notificationLevel)=>{
    //change the deviceID immediately
    dispatch({type:'setNotificationLevel',payload:notificationLevel});
}

const updateNotificationLevel = (dispatch)=>async(notificationLevel,deviceID,currentDeviceID,currentDeviceIDIndex)=>{
    //change the deviceID immediately
    try {
        const response = await trackerApi.post('/updateNotificationLevel', notificationLevel);
        if(response.data.state=='success'){
            await storage.setItem(
                '@currentDeviceID',
                JSON.stringify(currentDeviceID)
            );
            deviceID[currentDeviceIDIndex] = currentDeviceID
            await storage.setItem(
                '@deviceID',
                JSON.stringify(deviceID)
            );
            dispatch({type:'setDeviceID',payload:deviceID});
            return;
        }
    } catch (error) {
        alert(error)
    }
    dispatch({type:'currentDeviceIDIndex',payload:currentDeviceIDIndex});
}

export const {Provider,Context} = createDataContext(
    authReducer,
    {signin,signup,signout,clearErrorMessage,setCurrentDeviceID,tryLocalSignin,setNotificationLevel,updateNotificationLevel},
    {token:null,deviceID:[],currentDeviceID:{},errorMessage:''}
)