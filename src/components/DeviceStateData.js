import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Spacer from './Spacer'
import { StyleSheet ,Animated,Easing} from 'react-native'
import { ScrollView } from 'react-native'
import { Avatar, Card,Chip,Badge, Title,Paragraph, Text, Button} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 


const  {dataState,tubeStateString,indexOfDataState} = require('../common/config')

function colorMatch(val){
    switch (val) {
        case 0:
            return "#999999";
        case 1:
            return "#f5f5f5";
        case 2:
            return "#ffff80";
        case 3:
            return "#ff8080";
        case 5:
            return "#80ff80";
        case 6:
            return "#80ffff";
        case 7:
            return "#284C8F";
    }
}


const listAB = [{ group: "A", index: 1 },{ group: "A", index: 2 },{ group: "A", index: 3 },{ group: "A", index: 4 },
{ group: "A", index: 5 },{ group: "A", index: 6 },{ group: "A", index: 7 },{ group: "A", index: 8 },{ group: "A", index: 9 },
{ group: "B", index: 1 },{ group: "B", index: 2 },{ group: "B", index: 3 },{ group: "B", index: 4 },{ group: "B", index: 5 },
{ group: "B", index: 6 },{ group: "B", index: 7 },{ group: "B", index: 8 },{ group: "B", index: 9 }];

const DeviceStateDate = ({navigation, connectState,listState }) => {
    this.spinValue  = new Animated.Value(0);
    this.spinSlowValue  = new Animated.Value(0);

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });
    const spinSlow = this.spinSlowValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });
    Animated.loop(
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear ,
                useNativeDriver: true
            }
        )
    ).start();
    Animated.loop(
        Animated.timing(
            this.spinSlowValue,
            {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear ,
                useNativeDriver: true
            }
        )
    ).start();
    
    return (
        <>
        <Card style ={{backgroundColor:connectState?"#8cddad":"#c5c5c5"}}>
            <Card.Content>
            {connectState?<>
            <Title>{"整体流程状态:"+dataState[indexOfDataState("整体流程状态")].model(listState[indexOfDataState("整体流程状态")])}</Title>
            <Paragraph>
                <Text>{"滴定罐状态:"+dataState[indexOfDataState("滴定罐状态")].model(listState[indexOfDataState("滴定罐状态")])}</Text>
            </Paragraph>
            <Paragraph>
                <Text>A组风扇 </Text>
                {(listState[indexOfDataState("A组风扇状态")]==1)?
                <View style = {{width:20,height:20}}>
                    <Animated.Image
                        style={{transform: [{rotate: spin}],width:20,height:20 ,position:"absolute",top:4,left:1}}
                        source={require("../../assets/img/fan.png")} /></View>:
                    <Image source = {require("../../assets/img/fan.png")} style={{width:20,height:20 }}/>
                }
                <Text>  A组冷凝水 </Text>
                {(listState[indexOfDataState("A组冷凝水")]==1)?
                <View style = {{width:20,height:20}}>
                    <Animated.Image
                        style={{transform: [{rotate: spinSlow}],width:20,height:20 ,position:"absolute",top:4,left:1}}
                        source={require("../../assets/img/snow.png")} /></View>:
                    <Image source = {require("../../assets/img/water.png")} style={{width:20,height:20 }}/>
                }
                <Text>  B组风扇 </Text>
                {(listState[indexOfDataState("B组风扇状态")]==1)?
                <View style = {{width:20,height:20}}>
                    <Animated.Image
                        style={{transform: [{rotate: spin}],width:20,height:20,position:"absolute",top:4,left:1}}
                        source={require("../../assets/img/fan.png")} /></View>:
                    <Image source = {require("../../assets/img/fan.png")} style={{width:20,height:20 }}/>
                }
                <Text>  B组冷凝水 </Text>
                {(listState[indexOfDataState("B组冷凝水")]==1)?
                <View style = {{width:20,height:20}}>
                    <Animated.Image
                        style={{transform: [{rotate: spinSlow}],width:20,height:20 ,position:"absolute",top:4,left:1}}
                        source={require("../../assets/img/snow.png")} /></View>:
                    <Image source = {require("../../assets/img/water.png")} style={{width:20,height:20}}/>
                }
            </Paragraph>
            </>:<>
            <Title style = {{margin:12}}>设备未连接</Title>
            </>
        }
            
            {connectState?<MaterialIcons style ={{ alignContent:"flex-end",
        alignSelf :"flex-end",position:"absolute",margin:35}}   name="cast-connected" size={24} color="#26a69a" />:
            <AntDesign style ={{ alignContent:"flex-end",
            alignSelf :"flex-end",position:"absolute",margin:21}}  name="disconnect" size={24} color="black" />
        }

            </Card.Content>
        </Card>
        <Button icon="record" mode="contained" color ="#505066" onPress={() => navigation.navigate("详细状态")}>
            详细信息
        </Button>

        <FlatList data={listAB} renderItem={({ index,item}) => {
                        return  <Card.Title
                        title={item.group + "组"+item.index+"号消解管"}
                        subtitle={<Badge style = {{fontSize:13,backgroundColor:colorMatch(listState[indexOfDataState('消解管'+(index+1)+'状态')])}} >{tubeStateString(listState[indexOfDataState('消解管'+(index+1)+'状态')])}</Badge>}
                        // subtitle={<Chip icon="information" onPress={() => alert(listState[indexOfDataState('消解管'+(index+1)+'状态')])}>{dataState[indexOfDataState('消解管'+(index+1)+'状态')].model(listState[indexOfDataState('消解管'+(index+1)+'状态')])}</Chip>}
                        left={(props) => <Avatar.Icon {...props} icon="flask-outline" />}
                        right={(props) => <Chip {...props} size={54} 
                        selectedColor="white" style= {{backgroundColor:(listState[indexOfDataState(item.group + "组"+item.index+"#加热状态")]?"#f44336":"#c3d5f5")}}>{parseInt(listState[indexOfDataState(item.group + "组"+item.index+"#温度")])+"℃"}</Chip>}
                      />
                    }}>
        </FlatList>
        </>
    )
    // return (
    //     <View style={header ? styles.containerHeader : styles.container}>
    //         <View style={styles.col1}>
    //             <Text style={header ? styles.textHeader : styles.text}>{header ?index: dataState[index].name}</Text>
    //         </View>
    //         <View style={styles.col2}>
    //             <Text style={header ? styles.textHeader : styles.text}>{header ?val:dataState[index].model(val)}</Text>
    //         </View>
    //     </View>
    // )
}

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        justifyContent: "flex-start",

        marginTop: 2
    },
    container: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: 2,
        borderTopWidth: 1
    },
    textHeader: {
        fontSize: 24
    },
    text: {
        fontSize: 20,
    },
    col1: {
        margin: 1,
        width: 120,
        flex: 2
    },
    col2: {
        margin: 1,
        width: 120,
        flex: 1,
    },
})
// module.exports = { dataState }

export default DeviceStateDate
