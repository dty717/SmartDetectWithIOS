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

/*
 
*/
async function _init_param(_initParam){
    if(_initParam){
        _initParam = await JSON.parse(_initParam);
    }
    if ((!_initParam)||!_initParam.valid) {
        _initParam = {
            valid:true,
            I0: "I0",
            Ab: "Ab",
            state: "state",
            滴定数据: "滴定数据",

            //Usercontroller2
            启用B组消解管: "启用B组消解管",
            A组消解温度: "A组消解温度",
            A组消解时间: "A组消解时间",
            A组冷却温度: "A组冷却温度",
            A组占空比: "A组占空比",
            A1占空比: "A1占空比",
            A2占空比: "A2占空比",
            A3占空比: "A3占空比",
            A4占空比: "A4占空比",
            A5占空比: "A5占空比",
            A6占空比: "A6占空比",
            A7占空比: "A7占空比",
            A8占空比: "A8占空比",
            A9占空比: "A9占空比",
            B组消解温度: "B组消解温度",
            B组消解时间: "B组消解时间",
            B组冷却温度: "B组冷却温度",
            B组占空比: "B组占空比",
            B1占空比: "B1占空比",
            B2占空比: "B2占空比",
            B3占空比: "B3占空比",
            B4占空比: "B4占空比",
            B5占空比: "B5占空比",
            B6占空比: "B6占空比",
            B7占空比: "B7占空比",
            B8占空比: "B8占空比",
            B9占空比: "B9占空比",

            // Usercontroller3
            做样数量: "做样数量",
            消解管号: "消解管号",
            选择消解管号: "选择消解管号",
            消解管状态: "消解管状态",
            高浓度氧化剂质量分数: "高浓度氧化剂质量分数",
            低浓度氧化剂质量分数: "低浓度氧化剂质量分数",

            //Usercontroller6
            //设置
            Ag进样量: "Ag进样量",
            搅拌电机速度: "搅拌电机速度",
            水样进样量: "水样进样量",
            Cr进样量: "Cr进样量",
            Hg进样量: "Hg进样量",
            //P1
            P1中速速度: "P1中速速度",
            P1进样量: "P1进样量",
            P1快速速度: "P1快速速度",
            P1慢速速度: "P1慢速速度",
            P1预填水量: "P1预填水量",
            P1隔空气量: "P1隔空气量",
            P1取试剂多余量: "P1取试剂多余量",
            P1洗采样管量: "P1洗采样管量",
            P1洗储液环量: "P1洗储液环量",
            P1空气混合量: "P1空气混合量",

            //Y1蠕动泵
            Y1蠕动泵快速速度: "Y1蠕动泵快速速度",
            Y1蠕动泵慢速速度: "Y1蠕动泵慢速速度",

            //P2 P3
            P2_P3取滴定剂量: "P2_P3取滴定剂量",
            P2_P3快速速度: "P2_P3快速速度",
            P2_P3慢速速度: "P2_P3慢速速度",

            //清洗
            清洗滴定罐取水量: "清洗滴定罐取水量",
            清洗滴定罐排水量: "清洗滴定罐排水量",
            清洗滴定罐次数: "清洗滴定罐次数",
            超级清洗进水量: "超级清洗进水量",
            超级清洗排水量: "超级清洗排水量",
            超级清洗次数: "超级清洗次数",

            //other
            Y2搅拌电机速度: "Y2搅拌电机速度",
            采样管量: "采样管量",

            //P2
            P2中速速度: "P2中速速度",
            P2进样量: "P2进样量",
            P2快速速度: "P2快速速度",
            P2慢速速度: "P2慢速速度",

            //P3
            P3中速速度: "P3中速速度",
            P3进样量: "P3进样量",
            P3快速速度: "P3快速速度",
            P3慢速速度: "P3慢速速度",

            //P4
            P4快速速度: "P4快速速度",
            P4慢速速度: "P4慢速速度",

            //P5
            P5进样量: "P5进样量",
            P5吸液速度: "P5吸液速度",

            //P6
            水样稀释倍数: "水样稀释倍数",
            氧化剂稀释倍数: "氧化剂稀释倍数",

            //Usercontroller7
            质控一标号: "质控一标号",
            质控一浓度: "质控一浓度",
            质控一启用: "质控一启用",
            质控二标号: "质控二标号",
            质控二浓度: "质控二浓度",
            质控二启用: "质控二启用",

            空白样数量: "空白样数量",
            起始消解管号: "起始消解管号",
            起始采样号: "起始采样号",

            使用Ag报警: "使用Ag报警",
            使用Hg报警: "使用Hg报警",
            使用指示剂报警: "使用指示剂报警",
            使用高浓度氧化剂报警: "使用高浓度氧化剂报警",
            使用低浓度氧化剂报警: "使用低浓度氧化剂报警",
            使用高浓度滴定剂报警: "使用高浓度滴定剂报警",
            使用低浓度滴定剂报警: "使用低浓度滴定剂报警",
            使用水样报警: "使用水样报警",
            使用蒸馏水报警: "使用蒸馏水报警",

            Hg空缺: "Hg空缺",
            低浓度Cr空缺: "低浓度Cr空缺",
            高浓度Cr空缺: "高浓度Cr空缺",
            高浓度滴定剂空缺: "高浓度滴定剂空缺",
            低浓度滴定剂空缺: "低浓度滴定剂空缺",
            Ag空缺: "Ag空缺",
            指示剂空缺: "指示剂空缺",
            蒸馏水空缺: "蒸馏水空缺",
            水样空缺: "水样空缺",
            当前采样样品标号: "当前采样样品标号",

            dev: "dev",

            脚本支持: "脚本支持",

            启用高浓度Cr: "启用高浓度Cr",

            采样运行模式: "采样运行模式",

            sampleStep: "sampleStep",

            e: "e",

            f: "f",

            高浓度空白样体积: "高浓度空白样体积",
            低浓度空白样体积: "低浓度空白样体积",
            高浓度标定空白样体积: "高浓度标定空白样体积",
            低浓度标定空白样体积: "低浓度标定空白样体积",
            高浓度标定值: "高浓度标定值",
            低浓度标定值: "低浓度标定值",
            高浓度初始滴定光强: "高浓度初始滴定光强",
            低浓度初始滴定光强: "低浓度初始滴定光强",
            高浓度初始滴定光强2: "高浓度初始滴定光强2",
            低浓度初始滴定光强2: "低浓度初始滴定光强2",

            高浓度空白样偏移: "高浓度空白样偏移",
            低浓度空白样偏移: "低浓度空白样偏移",
            使用双光束: "使用双光束",
            使用二维码: "使用二维码",

            蒸馏水光电压: "蒸馏水光电压",
            低浓度A_斜率: "低浓度A_斜率",
            低浓度A_截距: "低浓度A_截距",
            低浓度A_临界值: "低浓度A_临界值",
            低浓度A_快速体积: "低浓度A_快速体积",

            高浓度A_临界值: "高浓度A_临界值",
            高浓度A_快速体积: "高浓度A_快速体积"
        }
        storage.setItem('@param',JSON.stringify(_initParam));
    }else{
    }
    return _initParam;

}

const _type = {
    I0: "I0",
    Ab: "Ab",
    state: "state",
    滴定数据: "滴定数据",

    //Usercontroller2
    启用B组消解管: "启用B组消解管",
    A组消解温度: "A组消解温度",
    A组消解时间: "A组消解时间",
    A组冷却温度: "A组冷却温度",
    A组占空比: "A组占空比",
    A1占空比: "A1占空比",
    A2占空比: "A2占空比",
    A3占空比: "A3占空比",
    A4占空比: "A4占空比",
    A5占空比: "A5占空比",
    A6占空比: "A6占空比",
    A7占空比: "A7占空比",
    A8占空比: "A8占空比",
    A9占空比: "A9占空比",
    B组消解温度: "B组消解温度",
    B组消解时间: "B组消解时间",
    B组冷却温度: "B组冷却温度",
    B组占空比: "B组占空比",
    B1占空比: "B1占空比",
    B2占空比: "B2占空比",
    B3占空比: "B3占空比",
    B4占空比: "B4占空比",
    B5占空比: "B5占空比",
    B6占空比: "B6占空比",
    B7占空比: "B7占空比",
    B8占空比: "B8占空比",
    B9占空比: "B9占空比",

    // Usercontroller3
    做样数量: "做样数量",
    消解管号: "消解管号",
    选择消解管号: "选择消解管号",
    消解管状态: "消解管状态",
    高浓度氧化剂质量分数: "高浓度氧化剂质量分数",
    低浓度氧化剂质量分数: "低浓度氧化剂质量分数",

    //Usercontroller6
    //设置
    Ag进样量: "Ag进样量",
    搅拌电机速度: "搅拌电机速度",
    水样进样量: "水样进样量",
    Cr进样量: "Cr进样量",
    Hg进样量: "Hg进样量",
    //P1
    P1中速速度: "P1中速速度",
    P1进样量: "P1进样量",
    P1快速速度: "P1快速速度",
    P1慢速速度: "P1慢速速度",
    P1预填水量: "P1预填水量",
    P1隔空气量: "P1隔空气量",
    P1取试剂多余量: "P1取试剂多余量",
    P1洗采样管量: "P1洗采样管量",
    P1洗储液环量: "P1洗储液环量",
    P1空气混合量: "P1空气混合量",

    //Y1蠕动泵
    Y1蠕动泵快速速度: "Y1蠕动泵快速速度",
    Y1蠕动泵慢速速度: "Y1蠕动泵慢速速度",

    //P2 P3
    P2_P3取滴定剂量: "P2_P3取滴定剂量",
    P2_P3快速速度: "P2_P3快速速度",
    P2_P3慢速速度: "P2_P3慢速速度",

    //清洗
    清洗滴定罐取水量: "清洗滴定罐取水量",
    清洗滴定罐排水量: "清洗滴定罐排水量",
    清洗滴定罐次数: "清洗滴定罐次数",
    超级清洗进水量: "超级清洗进水量",
    超级清洗排水量: "超级清洗排水量",
    超级清洗次数: "超级清洗次数",

    //other
    Y2搅拌电机速度: "Y2搅拌电机速度",
    采样管量: "采样管量",

    //P2
    P2中速速度: "P2中速速度",
    P2进样量: "P2进样量",
    P2快速速度: "P2快速速度",
    P2慢速速度: "P2慢速速度",

    //P3
    P3中速速度: "P3中速速度",
    P3进样量: "P3进样量",
    P3快速速度: "P3快速速度",
    P3慢速速度: "P3慢速速度",

    //P4
    P4快速速度: "P4快速速度",
    P4慢速速度: "P4慢速速度",

    //P5
    P5进样量: "P5进样量",
    P5吸液速度: "P5吸液速度",

    //P6
    水样稀释倍数: "水样稀释倍数",
    氧化剂稀释倍数: "氧化剂稀释倍数",

    //Usercontroller7
    质控一标号: "质控一标号",
    质控一浓度: "质控一浓度",
    质控一启用: "质控一启用",
    质控二标号: "质控二标号",
    质控二浓度: "质控二浓度",
    质控二启用: "质控二启用",

    空白样数量: "空白样数量",
    起始消解管号: "起始消解管号",
    起始采样号: "起始采样号",

    使用Ag报警: "使用Ag报警",
    使用Hg报警: "使用Hg报警",
    使用指示剂报警: "使用指示剂报警",
    使用高浓度氧化剂报警: "使用高浓度氧化剂报警",
    使用低浓度氧化剂报警: "使用低浓度氧化剂报警",
    使用高浓度滴定剂报警: "使用高浓度滴定剂报警",
    使用低浓度滴定剂报警: "使用低浓度滴定剂报警",
    使用水样报警: "使用水样报警",
    使用蒸馏水报警: "使用蒸馏水报警",

    Hg空缺: "Hg空缺",
    低浓度Cr空缺: "低浓度Cr空缺",
    高浓度Cr空缺: "高浓度Cr空缺",
    高浓度滴定剂空缺: "高浓度滴定剂空缺",
    低浓度滴定剂空缺: "低浓度滴定剂空缺",
    Ag空缺: "Ag空缺",
    指示剂空缺: "指示剂空缺",
    蒸馏水空缺: "蒸馏水空缺",
    水样空缺: "水样空缺",


    当前采样样品标号: "当前采样样品标号",

    dev: "dev",

    脚本支持: "脚本支持",

    启用高浓度Cr: "启用高浓度Cr",

    采样运行模式: "采样运行模式",

    sampleStep: "sampleStep",

    e: "e",

    f: "f",

    高浓度空白样体积: "高浓度空白样体积",
    低浓度空白样体积: "低浓度空白样体积",
    高浓度标定空白样体积: "高浓度标定空白样体积",
    低浓度标定空白样体积: "低浓度标定空白样体积",
    高浓度标定值: "高浓度标定值",
    低浓度标定值: "低浓度标定值",
    高浓度初始滴定光强: "高浓度初始滴定光强",
    低浓度初始滴定光强: "低浓度初始滴定光强",
    高浓度初始滴定光强2: "高浓度初始滴定光强2",
    低浓度初始滴定光强2: "低浓度初始滴定光强2",

    高浓度空白样偏移: "高浓度空白样偏移",
    低浓度空白样偏移: "低浓度空白样偏移",
    使用双光束: "使用双光束",
    使用二维码: "使用二维码",

    蒸馏水光电压: "蒸馏水光电压",
    低浓度A_斜率: "低浓度A_斜率",
    低浓度A_截距: "低浓度A_截距",
    低浓度A_临界值: "低浓度A_临界值",
    低浓度A_快速体积: "低浓度A_快速体积",

    高浓度A_临界值: "高浓度A_临界值",
    高浓度A_快速体积: "高浓度A_快速体积"
}

const ParamReducer = (state, action) => {
    switch (action.type) {
        case 'getParamData':
            var _state = action.payload;
            _state['valid'] = true;
            storage.setItem('@param',JSON.stringify(_state));
            return _state;
        case 'updateParamData':
            var _state = { ...state };
            _state[action.payload.key] = action.payload.value;
            _state['valid'] = true;
            storage.setItem('@param',JSON.stringify(_state));
            return _state;
        case 'toggleParamData':
            var _state = { ...state };
            _state[action.payload] = !_state[action.payload];
            _state['valid'] = true;
            storage.setItem('@param',JSON.stringify(_state));
            return _state;
        case 'uploadParamData':
            var _state = {...state,...action.payload};
            //storage.setItem('@param',JSON.stringify(action.payload));
            return _state;
        case 'initParam':
            var _state = action.payload;
            return _state;
        default:
            return state;
    }
};

const updateParamData = (dispatch)=>async(deviceID,key,value)=>{
    try {
        //trackerApi.post('/updateParamData',{deviceID,key,value});
        dispatch({ type: 'updateParamData', payload: {key,value}});
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

const uploadParamData = (dispatch)=>async(deviceID,key,value)=>{
    try {
        var response = await trackerApi.post('/uploadParamData',{deviceID,key,value});
        if(response.data.state=="error"){
            dispatch({ type: 'uploadParamData', payload: response.data.originData });
            alert(response.data.info);
        }else{
            alert('设备发送中')
        }
        // dispatch({ type: 'uploadParamData', payload: response.data });
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}
const getParamData = (dispatch) => async (deviceID) => {
    try {
        var response = await trackerApi.post('/Params',{deviceID});
        dispatch({ type: 'getParamData', payload: response.data });
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

const toggleParamData = (dispatch) => async (value) => {
    try {
        dispatch({ type: 'toggleParamData', payload: value});
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}



const initParam = (dispatch) => async(val)=>{
    try {
        val =await _init_param(val);
        dispatch({ type: 'initParam',payload : val});
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}


export const { Provider, Context } = createDataContext(
    ParamReducer,
    { toggleParamData, getParamData ,initParam,updateParamData,uploadParamData},
    {}
)   
