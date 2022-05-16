import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
//import { Picker } from 'react-native'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import Text_Input_Button from '../components/Text_Input_Button'
import Text_State_Button_Button from '../components/Text_State_Button_Button'
import 质控样样式 from '../components/质控样样式'
import { Context as DeviceContext } from "../context/DeviceContext"
import { Context as ParamContext } from "../context/ParamContext"
import { Context as AuthContext } from "../context/AuthContext"
import { Paragraph, RadioButton } from 'react-native-paper';
import { Dialog, Portal, Button } from 'react-native-paper';

var _fun = function () { };
var showDialog = function () { };
const callBackFun = (connectState, flagState, fun) => {
    if (!connectState) {
        alert("设备未连接!");
    } else {
        if (flagState) {
            alert("设备繁忙!");
        } else {
            _fun = fun;
            showDialog()
        }
    }
}

const CODControlScreen = () => {
    var param = useContext(ParamContext);
    var device = useContext(DeviceContext);
    var auth = useContext(AuthContext);

    var paramState = param.state;
    var deviceID = auth.state.currentDeviceID.id;
    const [checked, setChecked] = React.useState('0');
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);
    showDialog = () => setVisible(true);

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1, marginTop: 30 }}>
            <ScrollView>
                <Text_Input_Button text="做样数量" textInput={paramState.做样数量 + ""} textInputChange={(e) => { param.updateParamData(deviceID, "做样数量", e); }}
                    textEndEditing={
                        (e) => {
                            callBackFun(device.state.connect, device.state.set,
                                () => {
                                    param.uploadParamData(deviceID, "做样数量", e.nativeEvent.text);
                                })
                        }
                    }
                >
                </Text_Input_Button>
                <Text_Input_Button text="空白样数量" textInput={paramState.空白样数量 + ""} textInputChange={(e) => { param.updateParamData(deviceID, "空白样数量", e) }}
                    textEndEditing={
                        (e) => {
                            callBackFun(device.state.connect, device.state.set,
                                () => {
                                    param.uploadParamData(deviceID, "空白样数量", e.nativeEvent.text);
                                })
                        }
                    }>
                </Text_Input_Button>
                <Text_Input_Button text="起始消解管号" textInput={paramState.起始消解管号 + ""} textInputChange={(e) => { param.updateParamData(deviceID, "起始消解管号", e) }}
                    textEndEditing={
                        (e) => {
                            callBackFun(device.state.connect, device.state.set,
                                () => {
                                    param.uploadParamData(deviceID, "起始消解管号", e.nativeEvent.text);
                                })
                        }
                    }>
                </Text_Input_Button>
                <View style={{ marginTop: 20 }}>
                    <质控样样式 text="质控样1" textInput={paramState.质控一标号 + ""} textInputChange={(e) => { param.updateParamData(deviceID, "质控一标号", e); }}
                        textEndEditing={
                            (e) => {
                                callBackFun(device.state.connect, device.state.set,
                                    () => {
                                        param.uploadParamData(deviceID, "质控一标号", e.nativeEvent.text);
                                    })
                            }
                        }
                        text2="浓度" textInput2={paramState.质控一浓度 + ""} textInputChange2={(e) => { param.updateParamData(deviceID, "质控一浓度", e); }}
                        textEndEditing2={
                            (e) => {
                                callBackFun(device.state.connect, device.state.set,
                                    () => {
                                        param.uploadParamData(deviceID, "质控一浓度", e.nativeEvent.text);
                                    })
                            }
                        }
                        buttonText={paramState.质控一启用 ? "启用中" : "弃用中"}
                        buttonCall={
                            () => {
                                callBackFun(device.state.connect, device.state.set,
                                    () => {
                                        param.uploadParamData(deviceID, "质控一启用", !param.state['质控一启用']);
                                        // param.toggleParamData(deviceID, "质控一启用");
                                    })
                            }
                        }>
                    </质控样样式>
                    <质控样样式 text="质控样2" textInput={paramState.质控二标号 + ""} textInputChange={(e) => { param.updateParamData(deviceID, "质控二标号", e); }}
                        textEndEditing={
                            (e) => {
                                callBackFun(device.state.connect, device.state.set,
                                    () => {
                                        param.uploadParamData(deviceID, "质控二标号", e.nativeEvent.text);
                                    })
                            }
                        }
                        text2="浓度" textInput2={paramState.质控二浓度 + ""} textInputChange2={(e) => { param.updateParamData(deviceID, "质控二浓度", e); }}
                        textEndEditing2={
                            (e) => {
                                callBackFun(device.state.connect, device.state.set,
                                    () => {
                                        param.uploadParamData(deviceID, "质控二浓度", e.nativeEvent.text);
                                    })
                            }
                        }
                        buttonText={paramState.质控二启用 ? "启用中" : "弃用中"}
                        buttonCall={
                            () => {
                                callBackFun(device.state.connect, device.state.set,
                                    () => {
                                        param.uploadParamData(deviceID, "质控二启用", !param.state['质控二启用']);
                                        // param.toggleParamData(deviceID, "质控二启用");
                                    })
                            }
                        }>
                    </质控样样式>
                </View>
                <Text_State_Button_Button text="自动做样" stateColor="green" buttonText1="启动"
                    buttonCall1={
                        () => {
                            callBackFun(device.state.connect, device.state.control,
                                () => {
                                    device.controlDevice(deviceID, "start")
                                })
                        }
                    }
                    buttonText2="停止"
                    buttonCall2={

                        () => {
                            callBackFun(device.state.connect, device.state.control,
                                () => {
                                    device.controlDevice(deviceID, "stop")
                                })
                        }
                    }>
                </Text_State_Button_Button>

                <RadioButton.Group onValueChange={e => {
                    if (e == paramState.采样运行模式) {
                        return
                    }
                    callBackFun(device.state.connect, device.state.set,
                        () => {
                            param.uploadParamData(deviceID, "采样运行模式", e);
                        })
                }} value={paramState.采样运行模式}
                >
                    <View style={styles.text} >
                        <Text style={{ fontSize: 18 }}>初始量程选择</Text>
                    </View>
                    <View style={styles.pickerAll}>

                        <View style={styles.picker}>
                            <RadioButton value={0} />
                            <Text style={styles.textPicker}>低浓度</Text>
                        </View>
                        <View style={styles.picker}>
                            <RadioButton value={1} />
                            <Text style={styles.textPicker}>高浓度</Text>
                        </View>
                        <View style={styles.picker}>
                            <RadioButton value={2} />
                            <Text style={styles.textPicker}>超高浓度</Text>
                        </View>
                    </View>
                </RadioButton.Group>
                <View>
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Title>提示</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>是否发送</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => {
                                    hideDialog();
                                }}>取消</Button>
                                <Button onPress={() => {
                                    hideDialog();
                                    _fun();
                                }}>确定</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </ScrollView>

        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    pickerAll: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },
    container: {
        margin: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: "center"
    },
    text: {
        justifyContent: 'center',
        flexDirection: "row",

        marginTop: 40
    },
    textInput: {
        margin: 10,
        marginLeft: 20,
        marginTop: 0,
        borderWidth: 1
    },
    picker: {
        flexDirection: 'row',
        margin: 2,
        justifyContent: 'center',
    },
    textPicker: {
        textAlignVertical: 'center',
        alignSelf: "center",
    },
    button: {
        marginTop: 0,
        margin: 10
    }
})
export default CODControlScreen;