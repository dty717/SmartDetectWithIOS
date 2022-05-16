import trackerApi from '../api/tracker';
import createDataContext from './createDataContext'
import "../navigationRef"
import { navigate } from '../navigationRef';
import { AsyncStorage } from 'react-native';

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

const HistoryReducer = (state,action)=>{
    switch(action.type){
        case 'updateHistoryData':
            // if(state.updatePage){
            //     state.updatePage();
            // }
            return {...state,currentHistoryData:action.payload};
            // if(action.payload.page==0){
            //     return {...state,historyData:action.payload.historyData,
            //         counts:action.payload.counts,page:action.payload.page,
            //         nPerPage:action.payload.nPerPage,currentHistoryData:action.payload.historyData[0]};
            // }else{
            //     return {...state,historyData:action.payload.historyData,
            //         counts:action.payload.counts,page:action.payload.page,
            //         nPerPage:action.payload.nPerPage};
            // }
        case 'add_error':
            return{...state,errorMessage:action.payload}
        case 'clear_error_message':
            return {...state,errorMessage:""};
        case 'updatePage':
            return {...state,updatePage:!state.updatePage};
        case 'initHistory':
            return {..._initHistory};
        default:
            return state;
    }
};

const updatePage = (dispatch) => async () => {
    try {
        dispatch({ type: 'updatePage'});
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}
const initHistory = (dispatch) =>  () => {
    try {
        dispatch({ type: 'initHistory'});
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

const updateHistoryData = (dispatch) => async (deviceID,callBack) => {
    try {
        var response = await trackerApi.post('/ListSmartDetectHistory',deviceID);
        if(callBack){
            response.data = callBack(response.data);
        }
        dispatch({ type: 'updateHistoryData', payload: response.data});
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

const getSmartHistoryData = (dispatch) => async (deviceID,sampleType,callBack) => {
    try {
        var response = await trackerApi.post('/ListSmartDetectHistory',deviceID,sampleType);
        if(callBack){
            response.data = callBack(response.data);
        }
        return response.data;
        // dispatch({ type: 'updateHistoryData', payload: response.data});
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

// const updateHistoryData = (dispatch) => async (historyData,callBack) => {
//     try {
//         if(callBack){
//             callBack();
//         }
//         dispatch({ type: 'updateHistoryData', payload: historyData});
//     } catch (error) {
//         //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
//     }
// }

const _initHistory = {historyData:[],counts:1000,page:0,nPerPage:10,currentHistoryData:[],updatePage:true}

export const {Provider,Context} = createDataContext(
    HistoryReducer,
    {updateHistoryData,updatePage,initHistory},
    {..._initHistory}
)
