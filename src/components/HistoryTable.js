import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

//table style config
const shiftLen = 0;
const tableFontSize = 22;
const tablePaddingVertical = 9;
const tableHeaderfontSize = 25;
const tableHeaderpaddingVertical = 8;
const tableMarginHorizontal = 10;
const tableBorderWidth = 1;
// const tableHeight = 600
const tableCellVerticalBorderWidth = 2;
const tableHeaderHorizontalBorderWidth = 1;
const tableRowSelectedColor = "#f1f1f1"
const headerColor = "#edf2f9"



var scrollY = 0;
var scrollX = 0;
var currentScrollY = 0;
var currentScrollX = 0;
var maxHeight = 1000000;
var maxWidth = 200;
var usingWeb = false;

const HistoryTable = ({ headers, dataList, tableConfig = {} ,needReset}) => {
  var {
    shiftLen = 0,
    // tableFontSize = 22,
    // tablePaddingVertical = 8,
    // tableHeaderfontSize = 25,
    // tableHeaderpaddingVertical = 8,
    // tableMarginHorizontal = 10,
    // tableBorderWidth = 1,
    tableHeight = 600,
    // tableCellVerticalBorderWidth = 2,
    // tableHeaderHorizontalBorderWidth = 1,
    // tableRowSelectedColor = "#f1f1f1",
    // headerColor = "#edf2f9",
  } = tableConfig

  const pan = useRef(new Animated.ValueXY({ x: shiftLen, y: 0 })).current;
  // const scrollY = useRef(new Animated.Value(0)).current;
  const _this = this;
  const [selectedRow, setSelectedRow] = useState(-1);
  const setRow = (e) => {
    setSelectedRow(e);
  }
  
  useEffect(()=>{
    scrollY = 0;
    scrollX = 0;
    currentScrollY = 0;
    currentScrollX = 0;
    pan.setOffset({
      x: 0,
      y: 0,
    });
    pan.resetAnimation()
    setSelectedRow(-1);
    if(_this.node){
      _this.node.scrollTo({ x: 0, y: currentScrollY, animated: false });
    }
    if(_this.firstColNode){
      _this.firstColNode.scrollTo({ x: 0, y: currentScrollY, animated: false });
    }
    console.log("needReset")
  },[needReset])

  const window = useWindowDimensions();
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        scrollY = currentScrollY;
        scrollX = currentScrollX;
      },
      onPanResponderMove: (...args) => {
        var { dy, dx } = args[1];
        currentScrollX = scrollX - dx;
        currentScrollY = scrollY - dy;
        if (currentScrollY < 0) {
          currentScrollY = 0;
        } else if (currentScrollY > maxHeight) {
          currentScrollY = maxHeight;
        }
        if (!usingWeb) {
          _this.node.scrollTo({ x: 0, y: currentScrollY, animated: false });
          _this.firstColNode.scrollTo({ x: 0, y: currentScrollY, animated: false });
        }
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(...args);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        if (currentScrollX < 0) {
          pan.x.setValue(0);
          currentScrollX = 0;
        } else if (currentScrollX > maxWidth) {
          pan.x.setValue(-maxWidth);
          currentScrollX = maxWidth;
        }
        // console.log({ currentScrollX }, pan.x._value)
      },
    })
  ).current;

  maxWidth = headers.reduce(function (previousValue, current) {
    return previousValue + current.width
  }, 0) - window.width + tableMarginHorizontal * 2;
  maxWidth = maxWidth > 0 ? maxWidth : 0;
  const formatData = (dataName, data) => {
    switch (dataName) {
      case "time":
        return data.time.replace('T', ' ').substring(0, data.time.length - 5);
      case "value":
      case "selectedValue":
      case "temp":
        return isNaN(data[dataName]) ? "" : parseInt(data[dataName] * 10000) / 10000;
      default:
        return data[dataName];
    }
  }
  return (
    <View style={{
      ...(tableHeight ? { height: tableHeight } : { flex: 1 }),
      ...styles.container
    }}>
      <View style={{ ...styles.table }}>
        <View style={{ borderRightWidth: tableBorderWidth, ...styles.tableMarginStyle }} />
        <Animated.View
          style={{ ...styles.firstCol }}
          {...panResponder.panHandlers}>
          <View style={{ width: headers[0].width, ...styles.firstTableHeader }}>
            <Text style={{ backgroundColor: 'white', ...styles.tableHeaderStyle }}>{headers[0].name}</Text>
          </View>

          <ScrollView
            ref={(node) => (usingWeb ? null : this.firstColNode = node)}
            scrollEnabled={false}
            scrollEventThrottle={10000}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: 'white', marginRight: -tableCellVerticalBorderWidth }}
          >
            {dataList.map((e, index) => {
              return (
                <View key={index} style={{ width: headers[0].width, borderRightWidth: tableCellVerticalBorderWidth }}>
                  <TouchableWithoutFeedback onPress={() => setRow(index)} >
                    <Text style={{ backgroundColor: selectedRow == index ? tableRowSelectedColor : "white", ...styles.tableCellStyle }}>
                      {index + 1}
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>

        <Animated.View
          style={{
            transform: [
              {
                translateX: pan.x.interpolate({
                  inputRange: [-maxWidth, shiftLen],
                  outputRange: [-maxWidth, shiftLen],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              },
            ],
            // height: tableHeight,
            borderBottomWidth: tableBorderWidth
            // flex: 1,
          }}
          {...panResponder.panHandlers}>
          <View style={styles.tableHeader}>
            {headers.slice(1).map((head, index) => (
              <View key={index} style={{ width: head.width, borderTopWidth: tableBorderWidth, borderLeftWidth: tableCellVerticalBorderWidth, borderBottomWidth: tableHeaderHorizontalBorderWidth }}>
                <Text key={head.name} style={styles.tableHeaderStyle}>
                  {head.name}
                </Text>
              </View>
            ))}
          </View>
          <ScrollView
            style={styles.tableBody}
            ref={(node) => (usingWeb ? null : this.node = node)}
            scrollEnabled={false}
            scrollEventThrottle={10000}
            onScroll={({
              nativeEvent: {
                contentSize: { height: contentHeight },
                layoutMeasurement: { height: layoutHeight },
              },
            }) => {
              maxHeight = contentHeight - layoutHeight;
            }}>
            {dataList.map((data, index) => {
              return (
                // <TouchableWithoutFeedback onPress={() => setSelectedRow(index)}>
                <TouchableOpacity style={styles.tableRow} key={index} onPress={() => setRow(index)} activeOpacity={1}>
                  {headers.slice(1).map((head, index2) => (
                    <View key={index + " " + index2} style={{ width: head.width, borderLeftWidth: tableCellVerticalBorderWidth }} >
                      <Text style={{ backgroundColor: selectedRow == index ? tableRowSelectedColor : "white", ...styles.tableCellStyle }}>
                        {formatData(head.dataName, data)}
                      </Text>
                    </View>
                  ))}
                </TouchableOpacity>
                // </TouchableWithoutFeedback>
              );
            })}
          </ScrollView>
        </Animated.View>
        <View style={{ borderLeftWidth: tableBorderWidth, position: "absolute", height: tableHeight, left: window.width - tableMarginHorizontal, ...styles.tableMarginStyle }}>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    // marginTop: 120,
    // marginHorizontal: tableMarginHorizontal,
  },
  table: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flex: 1,
    zIndex: 20,
    // marginTop:50,
    // marginHorizontal: tableMarginHorizontal,
  },
  tableMarginStyle: { width: tableMarginHorizontal, backgroundColor: "white", zIndex: 999, alignSelf: "stretch" },

  tableCellStyle: {
    fontSize: tableFontSize, paddingVertical: tablePaddingVertical, textAlign: "center", zIndex: 4
  },
  tableHeaderStyle: {
    fontSize: tableHeaderfontSize, paddingVertical: tableHeaderpaddingVertical, textAlign: "center", fontWeight: "bold", backgroundColor: headerColor
  },
  firstTableHeader: {
    zIndex: 10,
    backgroundColor: "white",
    borderRightWidth: tableCellVerticalBorderWidth,
    marginRight: -tableCellVerticalBorderWidth,
    borderBottomWidth: tableHeaderHorizontalBorderWidth,
    borderTopWidth: tableBorderWidth,
  },
  tableHeader: {
    flexDirection: 'row',
  },
  tableRow: {
    flexWrap: 'wrap',
    width: 2000,
    flexDirection: 'row',
  },
  container: {
    // borderWidth:1
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  tableBody: {
    width: 1000,
    // backgroundColor: 'white',
    // borderRadius: 5,
    zIndex: 1,
  },
  firstCol: {
    // alignSelf: 'stretch',
    // flexWrap: 'nowrap',
    // height:30,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'green',
    borderBottomWidth: tableBorderWidth,
    // height:tableHeight,
    zIndex: 5,
  },
});
export default HistoryTable;