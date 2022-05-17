import React, { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import {Context as DeviceContext }from '../context/DeviceContext'

const  {chemical_substance,chemical_substance_name} = require('../common/config')

const WarningSnackBar = ({hearText,errorMessage,onSubmit,submitButtonText})=>{

    const {state,setWarning} = useContext(DeviceContext);
    var errInfo = "";
    for (let index = 0; index < chemical_substance.length; index++) {
        const v_index = chemical_substance[index];
        // errInfo +=JSON.stringify(state.deviceState[v_index])+" "; 
        if(state.deviceState[v_index]==1){
            errInfo += chemical_substance_name[index]+'空缺 ';
        }
    }
    return (
        <Snackbar
            style={styles.snackbar}
            visible={state.showWarning}
            onDismiss={()=>{}}
            action={{
            label: '跳过',
            onPress: () => {
                setWarning(false)
            },
            }}>
            {
                errInfo
            }
        </Snackbar>
    )
}
const styles= StyleSheet.create({
    snackbar:{
        bottom:20,
    }
});

export default WarningSnackBar;