import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import corner1 from '../../assets/img/illustrations/corner-1.png';
import corner2 from '../../assets/img/illustrations/corner-2.png';
import corner3 from '../../assets/img/illustrations/corner-3.png';
import corner5 from '../../assets/img/illustrations/corner-5.png';

const deviceType = {
  CL: { name: '余氯', unit: 'mg/L', unit2: '°C' },
  O3: { name: '臭氧', unit: 'mg/L', unit2: '°C' },
  CODMN: { name: '高锰酸盐', unit: 'mg/L', unit2: '°C' },
  N: { name: '总氮', unit: 'mg/L', unit2: '°C' },
  P: { name: '总磷', unit: 'mg/L', unit2: '°C' },
  ELE: { name: '电导率', unit: 'mg/L', unit2: '°C' },
  NH3: { name: '氨氮', unit: 'mg/L', unit2: '°C' },
  O2: { name: '溶解氧', unit: 'mg/L', unit2: '°C' },
  PH: { name: 'PH', unit: 'mg/L', unit2: '°C' },
  TEM: { name: '温度', unit: 'mg/L', unit2: '°C' },
  TUR: { name: '浊度', unit: 'mg/L', unit2: '°C' },
}

const getImage = color => {
  switch (color) {
    case 'warning':
      return corner1;
    case 'info':
      return corner2;
    case 'success':
      return corner3;
    case 'disconnect':
      return corner5;
    default:
      return corner1;
  }
};

const DeviceStateCard = (props) => {
  // console.log(props.item)
  switch (props.item.sampleType) {
    case 'CL':
      return (
        <ImageBackground source={getImage(props.item.state ? props.item.state : 'success')} resizeMode="cover" style={styles.backgroundImage}>
          <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <View style={styles.itemCenter}>
              <Text style={styles.itemName}>{(props.item.name ? props.item.name : "") + "      "}
                <Text style={styles.itemType}>{deviceType[props.item.sampleType].name}</Text>
              </Text>
              <Text style={styles.itemText}>数值:{(props.item.value != undefined) ? props.item.value + deviceType[props.item.sampleType].unit : ""}</Text>
              <Text style={styles.itemText}>温度值:{(props.item.temp != undefined) ? props.item.temp + deviceType[props.item.sampleType].unit2 : ""}</Text>
            </View>
          </View>
        </ImageBackground>
      );
    case "O3":
      return (
        <ImageBackground source={getImage(props.item.state ? props.item.state : 'success')} resizeMode="cover" style={styles.backgroundImage}>
          <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <View style={styles.itemCenter}>
              <Text style={styles.itemName}>{(props.item.name ? props.item.name : "") + "      "}
                <Text style={styles.itemType}>{deviceType[props.item.sampleType].name}</Text>
              </Text>
              {/* <Text style={styles.itemName}>设备名称:{props.item.name}</Text>
              <Text style={styles.itemType}>设备类型:{deviceType[props.item.sampleType].name}</Text> */}
              <Text style={styles.itemText}>数值:{props.item.value ? props.item.value + deviceType[props.item.sampleType].unit : ""}</Text>
              <Text style={styles.itemText}>温度值:{props.item.temp ? props.item.temp + deviceType[props.item.sampleType].unit2 : ""}</Text>
            </View>
          </View>
        </ImageBackground>
      );
    case "CODMN":
    case "P":
    case "NH3":
    case "N":
      return (
        <ImageBackground source={getImage(props.item.state ? props.item.state : 'success')} resizeMode="cover" style={styles.backgroundImage}>
          <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <View style={styles.itemCenter}>
              <Text style={styles.itemName}>{(props.item.name ? props.item.name : "") + "      "}
                <Text style={styles.itemType}>{deviceType[props.item.sampleType].name}</Text>
              </Text>
              {/* <Text style={styles.itemName}>设备名称:{props.item.name}</Text>
                <Text style={styles.itemType}>设备类型:{deviceType[props.item.sampleType].name}</Text> */}
              <Text style={styles.itemText}>数值:{props.item.value ? props.item.value + deviceType[props.item.sampleType].unit : ""}</Text>
              {/* <Text style={styles.itemText}>温度值:{props.item.temp?props.item.temp + deviceType[props.item.sampleType].unit2:""}</Text> */}
            </View>
          </View>
        </ImageBackground>
      );
  }
  return <></>
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#adadda',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,

  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '180%',
    fontSize: 30,
    fontWeight: "bold",
    color: "#27bcfd"
  },
  itemName: {
    fontSize: 20,
    maxWidth: '180%',
    marginBottom: 5
  },
  itemType: {
    fontSize: 16,
    maxWidth: '180%',
    backgroundColor: '#d4f2ff',
    color: "#1978a2",
    borderRadius: 1,
  },
  itemCenter: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default DeviceStateCard;