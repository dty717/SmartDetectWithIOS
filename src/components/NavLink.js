import React from 'react'
import {Text,TouchableOpacity, View} from 'react-native'
import Spacer from './Spacer'
import 'react-navigation'
import { StyleSheet } from 'react-native'


const NavLink = ({ navigation, text, routeName }) => {
    return (<TouchableOpacity onPress={() => { navigation.navigate({ routeName }) }}>
        <View style = {styles.spacer}>
            <Text style={styles.link}>
                {text}
            </Text>
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    link:{
        color:'blue'
    },
    spacer:{
        margin:15,
        justifyContent:'center',
    }
})

export default NavLink