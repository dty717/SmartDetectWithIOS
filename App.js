import React, { Component } from 'react'
import { createAppContainer, createSwitchNavigator} from 'react-navigation';

const switchNavigator = createSwitchNavigator({
})

const theme = {
  ...DefaultTheme,
  mode:"exact",
};


const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <App ref={(navigator) => {}} style={{ flex: 1 }} />
  )
}
