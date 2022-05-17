import React from 'react'
import { StyleSheet, View } from 'react-native';

import Svg, { Circle, Rect, Polyline } from 'react-native-svg';

const LineChart_data = ({height,width,data1,data2,data3})=>{
    return (

        <Svg style={styles.svg} viewBox="0 0 100 100">
            <Polyline
                points={data1.join(' ')}
                fill="none"
                stroke="black"
                strokeWidth="1"
            />
            <Polyline
                points={data2.join(' ')}
                fill="none"
                stroke="red"
                strokeWidth="1"
            />
            <Polyline
                points={data3.join(' ')}
                fill="none"
                stroke="yellow"
                strokeWidth="1"
            />
        </Svg>

    )
}


const styles = StyleSheet.create({
    svg:{
        color:'blue',
        borderWidth:4,
        flex:1,
        marginTop:30
    }
})

export default LineChart_data