import trackerApi from '../api/tracker';
import createDataContext from './createDataContext'
import "../navigationRef"
import { navigate } from '../navigationRef';
import { AsyncStorage } from 'react-native';

const  {chemical_substance} = require('../common/config')

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

const DeviceReducer = (state,action)=>{
    switch(action.type){
        case 'updateDeviceData':
            for (let index = 0; index < chemical_substance.length; index++) {
                const v_index = chemical_substance[index];
                if((state.deviceState[v_index]==0)&&(action.payload.deviceState[v_index]==1)){
                    action.payload.showWarning = true;
                    break;
                }       
            }
            return {...state,...action.payload};
        case 'add_error':
            return{...state,errorMessage:action.payload}
        case 'clear_error_message':
            return {...state,errorMessage:""};
        case 'controlDevice':
            return {...state,errorMessage:action.payload}
        case 'setWarning':
            return {...state,showWarning:action.payload}
        case 'init':
            return {..._initVal};
        default:
            return state;
    }
};

const updateDeviceData = (dispatch) => async (deviceState) => {
    try {
        // 
        dispatch({ type: 'updateDeviceData', payload: deviceState });
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

const controlDevice = (dispatch) => async(deviceID,content)=>{
    try {
        var response = await trackerApi.post('/controlDevice',{deviceID,content});
        if(response.data.state!="success"){
            //dispatch({ type: 'uploadParamData', payload: response.data.originData });
            alert(response.data.state);
            return
        }else{
            alert('设备发送中')
        }
        dispatch({ type: 'controlDevice', payload: response.data.state });
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

const setWarning = (dispatch)=>async(state)=>{
    try {
        dispatch({ type: 'setWarning', payload: state });
    } catch (error) {
    }
}

const _initVal = {data:{dataFlow1:["1,1","2,2","3,3"],dataFlow2:["1,1","2,2","3,3"],dataFlow3:["1,1","2,2","3,3"]},showWarning:false,deviceState:[],connect:false};

const init = (dispatch)=>async()=>{
    try {
        dispatch({ type: 'init' });
    } catch (error) {
    }
}

export const {Provider,Context} = createDataContext(
    DeviceReducer,
    {updateDeviceData,controlDevice,setWarning,init},
    {..._initVal}
)

// var reducer = DeviceReducer;
// var actions = {updateDeviceData,controlDevice};
// var defaultValue =  {data:{dataFlow1:["1,1","2,2","3,3"],dataFlow2:["1,1","2,2","3,3"],dataFlow3:["1,1","2,2","3,3"]},deviceState:[],lastUpdate:false,lastHistory:false,lastParam:false,connect:false};
// const _Context = React.createContext();
// const _Provider = ({children}) =>{
//     const [state,dispatch] = useReducer(reducer,defaultValue);
//     const boundActions = {};
//     for(let key in actions){
//         boundActions[key] = actions[key](dispatch);
//     }
//     return (
//         <Context.Provider value={{state,...boundActions}}>
//             {children}
//         </Context.Provider>
//     )
// }
// export const {Provider,Context} =  {_Provider,_Context}