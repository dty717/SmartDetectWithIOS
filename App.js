import React, { Component } from 'react'
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from "./src/screen/AccountScreen";
import SigninScreen from "./src/screen/SigninScreen";
import SignupScreen from "./src/screen/SignupScreen";
import DeviceAllStateScreen from "./src/screen/DeviceAllStateScreen";
import {Provider as AuthProvider} from "./src/context/AuthContext"
import {Provider as DeviceProvider} from "./src/context/DeviceContext"
import {Provider as HistoryProvider} from "./src/context/HistoryContext"
import {Provider as ParamProvider} from "./src/context/ParamContext"
import {setNavigator} from './src/navigationRef';
import { Provider as PaperProvider, Snackbar, DefaultTheme } from 'react-native-paper';

import ResolveAuthScreen from './src/screen/ResolveAuthScreen';
import MainScreen from './src/screen/MainScreen';
import DeviceControlScreen from './src/screen/DeviceControlScreen';
import HistoryScreen from './src/screen/HistoryScreen';
import DeviceInfoScreen from './src/screen/DeviceInfoScreen';
import WarningSnackBar from './src/components/WarningSnackBar';

const switchNavigator = createSwitchNavigator({
  resolveAuth:ResolveAuthScreen,
  loginFlow:createStackNavigator({
    Signin:SigninScreen,
    Signup:SignupScreen
  }),
  mainFlow:createBottomTabNavigator({
    主页:MainScreen,
    //TODO :add device control
    // 设备调试:DeviceControlScreen,
    历史数据:HistoryScreen,
    //TODO :add device state
    设备控制: DeviceControlScreen,
    // 设备信息:createStackNavigator({
    //   设备状态:DeviceInfoScreen,
    //   详细状态:DeviceAllStateScreen
    // }),
    账号:AccountScreen
  })
})

const theme = {
  ...DefaultTheme,
  mode:"exact",
};


const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <ParamProvider>
          <DeviceProvider>
            <HistoryProvider>
              <App ref={(navigator) => { setNavigator(navigator) }} style={{ flex: 1 }} />
              <WarningSnackBar />
            </HistoryProvider>
          </DeviceProvider>
        </ParamProvider>
      </AuthProvider>
    </PaperProvider>
  )
}
