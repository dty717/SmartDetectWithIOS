import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

const yearList = []
for (let index = 2030; index >= 2000; index--) {
    yearList.push({
        label: index + '',
        key: index,
        value: index,
        color: '#3478f6',
    })
}
const monthList = []
for (let index = 1; index < 13; index++) {
    monthList.push({
        label: index + '',
        key: index,
        value: index,
        color: '#3478f6',
    })
}
var DaysInMonth = (function () {
    var cache = {};
    return function (month, year) {
        var entry = year + '-' + month;

        if (cache[entry]) return cache[entry];

        return cache[entry] = new Date(year, month, 0).getDate();
    }
})();
function getDateList(month = 1, year = 2000) {
    const _dateList = []
    // console.log("month, year",month, year);
    var daysInMonth = DaysInMonth(month, year);
    for (let index = 1; index <= daysInMonth; index++) {
        _dateList.push({
            label: index + '',
            key: index,
            value: index,
            color: '#3478f6',
        })
    }
    return _dateList;
}

const hourList = []
for (let index = 0; index < 24; index++) {
    hourList.push({
        label: index + '',
        key: index,
        value: index,
        color: '#3478f6',
    })
}
const minuteList = []
for (let index = 0; index < 60; index++) {
    minuteList.push({
        label: index + '',
        key: index,
        value: index,
        color: '#3478f6',
    })
}
const secondList = []
for (let index = 0; index < 60; index++) {
    secondList.push({
        label: index + '',
        key: index,
        value: index,
        color: '#3478f6',
    })
}


const TimePicker = ({ date, setDate }) => {
    // const [date, setDate] = useState({});
    const [year, setYear] = useState(date.year);
    const [month, setMonth] = useState(date.month);
    const [_date, set_Date] = useState(date.date);
    const [hour, setHour] = useState(date.hour);
    const [minute, setMinute] = useState(date.minute);
    const [second, setSecond] = useState(date.second);

    const [dateList, setDateList] = useState(getDateList(new Date().getMonth() + 1, new Date().getFullYear()));

    // console.log('init dateList.length:', dateList.length);
    return (
        <View style={styles.centeredView}>
            <View style={{ ...styles.pickerSelectStyle, width: 50 }}>
                <RNPickerSelect
                    placeholder={{
                        label: '年',
                        color: '#3478f6',
                    }}
                    items={yearList}
                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value, index) => {
                        // console.log(`on year change index:${index},value:${value}`);
                        if (value == null) {
                        } else if (!date.year || (value != date.year)) {
                            // year = value;
                            setYear(value);
                            if (date.year == null) {
                                if (Platform.OS == 'ios') {
                                    setDate({ ...date, year: value });
                                }
                            }
                            //console.log("days:", date, getDateList(date.getMonth() + 1, date.getFullYear()).length);
                            if (Platform.OS == 'android') {
                                setDate({ ...date, year: value });
                                var newDateList = getDateList(date.month, date.year);
                                if (newDateList.length != dateList.length) {
                                    setDateList(newDateList);
                                }
                            }
                        }
                    }}
                    pickerProps={
                        {
                            selectedValue: date.year,
                        }
                    }
                    onDonePress={
                        () => {
                            setDate({ ...date, year });
                            var newDateList = getDateList(date.month, date.year);
                            if (newDateList.length != dateList.length) {
                                setDateList(newDateList);
                            }
                        }
                    }
                    style={{
                        placeholder: {
                            color: '#3478f6',
                            fontSize: 16,
                            // marginLeft: 10
                        },
                        inputIOS: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                        inputAndroid: {
                            color: '#3478f6',
                            marginLeft: 2,
                            fontSize: 16,
                        },

                    }}
                    value={date.year}
                    Icon={() => null}
                />
            </View>
            <Text style={{ fontSize: 30 }}>-</Text>
            <View style={styles.pickerSelectStyle}>
                <RNPickerSelect
                    placeholder={{
                        label: '月',
                        color: '#3478f6',
                    }}
                    // placeholder={{}}
                    items={monthList}
                    useNativeAndroidPickerStyle={false}

                    onValueChange={(value, index) => {
                        //console.log(`on month change index:${index},value:${value}`);
                        if (value == null) {
                        } else if (!date.month || (value != date.month)) {
                            setMonth(value);
                            if (date.month == null) {
                                if (Platform.OS == 'ios') {
                                    setDate({ ...date, month: value });
                                }
                            }
                            // console.log("days:", date, getDateList(date.getMonth() + 1, date.getFullYear()).length);
                            if (Platform.OS == 'android') {
                                setDate({ ...date, month: value });
                                var newDateList = getDateList(date.month, date.year);
                                if (newDateList.length != dateList.length) {
                                    setDateList(newDateList);
                                }
                            }
                        }
                    }}
                    pickerProps={
                        {
                            selectedValue: date.month,
                        }
                    }
                    onDonePress={
                        () => {
                            setDate({ ...date, month });
                            var newDateList = getDateList(date.getMonth() + 1, date.getFullYear());
                            if (newDateList.length != dateList.length) {
                                setDateList(newDateList);
                            }
                        }
                    }
                    style={{
                        placeholder: {
                            color: '#3478f6',
                            fontSize: 16,
                            // marginLeft: 10
                        },
                        inputIOS: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                        inputAndroid: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                    }}
                    value={date.month}
                    Icon={() => null}
                />
            </View>
            <Text style={{ fontSize: 30 }}>-</Text>
            <View style={styles.pickerSelectStyle}>
                <RNPickerSelect
                    placeholder={{
                        label: '日',
                        color: '#3478f6',
                    }}
                    // placeholder={{}}
                    items={dateList}
                    useNativeAndroidPickerStyle={false}

                    onValueChange={(value, index) => {
                        //console.log(`on date change index:${index},value:${value}`);
                        if (value == null) {
                        } else if (!date.date || (value != date.date)) {
                            set_Date(value);
                            if (date.date == null) {
                                if (Platform.OS == 'ios') {
                                    setDate({ ...date, date: value });
                                }
                            }
                            //console.log("days:", date, getDateList(date.getMonth() + 1, date.getFullYear()).length);
                            if (Platform.OS == 'android') {
                                setDate({ ...date, date: value });
                            }
                        }
                    }}
                    pickerProps={
                        {
                            selectedValue: date.date,
                        }
                    }
                    onDonePress={
                        () => {
                            setDate({ ...date, date });
                        }
                    }
                    style={{
                        placeholder: {
                            color: '#3478f6',
                            fontSize: 16,
                            // marginLeft: 10
                        },
                        inputIOS: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                        inputAndroid: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                    }}
                    value={date.date}
                    Icon={() => null}
                />
            </View>
            <Text style={{ fontSize: 30 }}>{" "}</Text>
            <View style={styles.pickerSelectStyle}>
                <RNPickerSelect
                    placeholder={{
                        label: '时',
                        color: '#3478f6',
                    }}
                    // placeholder={{}}
                    items={hourList}
                    useNativeAndroidPickerStyle={false}

                    onValueChange={(value, index) => {
                        //console.log(`on hour change index:${index},value:${value}`);
                        if (value == null) {
                        } else if (!date.hour || (value != date.hour)) {
                            setHour(value);
                            if (date.hour == null) {
                                if (Platform.OS == 'ios') {
                                    setDate({ ...date, hour: value });
                                }
                            }
                            //console.log("days:", date, getDateList(date.getMonth() + 1, date.getFullYear()).length);
                            if (Platform.OS == 'android') {
                                setDate({ ...date, hour: value });
                            }
                        }
                    }}
                    pickerProps={
                        {
                            selectedValue: date.hour,
                        }
                    }
                    onDonePress={
                        () => {
                            setDate({ ...date, hour });
                        }
                    }
                    style={{
                        placeholder: {
                            color: '#3478f6',
                            fontSize: 16,
                            // marginLeft: 10
                        },
                        inputIOS: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                        inputAndroid: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                    }}
                    value={date.hour}
                    Icon={() => null}
                />
            </View>
            <Text style={{ fontSize: 20 }}>:</Text>
            <View style={styles.pickerSelectStyle}>
                <RNPickerSelect
                    placeholder={{
                        label: '分',
                        color: '#3478f6',
                    }}
                    // placeholder={{}}
                    items={minuteList}
                    useNativeAndroidPickerStyle={false}

                    onValueChange={(value, index) => {
                        //console.log(`on minute change index:${index},value:${value}`);
                        if (value == null) {
                        } else if (!date.minute || (value != date.minute)) {
                            setMinute(value);
                            if (date.minute == null) {
                                if (Platform.OS == 'ios') {
                                    setDate({ ...date, minute: value });
                                }
                            }
                            //console.log("days:", date, getDateList(date.getMonth() + 1, date.getFullYear()).length);
                            if (Platform.OS == 'android') {
                                setDate({ ...date, minute: value });
                            }
                        }
                    }}
                    pickerProps={
                        {
                            selectedValue: date.minute,
                        }
                    }
                    onDonePress={
                        () => {
                            setDate({ ...date, minute });
                        }
                    }
                    style={{
                        placeholder: {
                            color: '#3478f6',
                            fontSize: 16,
                            // marginLeft: 10
                        },
                        inputIOS: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                        inputAndroid: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                    }}
                    value={date.minute}
                    Icon={() => null}
                />
            </View>
            <Text style={{ fontSize: 20 }}>:</Text>
            <View style={styles.pickerSelectStyle}>
                <RNPickerSelect
                    placeholder={{
                        label: '秒',
                        color: '#3478f6',
                    }}
                    // placeholder={{}}
                    items={secondList}
                    useNativeAndroidPickerStyle={false}

                    onValueChange={(value, index) => {
                        //console.log(`on second change index:${index},value:${value}`);
                        if (value == null) {
                        } else if (!date.second || (value != date.second)) {
                            setSecond(value);
                            if (date.second == null) {
                                if (Platform.OS == 'ios') {
                                    setDate({ ...date, second: value });
                                }
                            }
                            //console.log("days:", date, getDateList(date.getMonth() + 1, date.getFullYear()).length);
                            if (Platform.OS == 'android') {
                                setDate({ ...date, second: value });
                            }
                        }
                    }}
                    pickerProps={
                        {
                            selectedValue: date.second,
                        }
                    }
                    onDonePress={
                        () => {
                            setDate({ ...date, second });
                        }
                    }
                    style={{
                        placeholder: {
                            color: '#3478f6',
                            fontSize: 16,
                            // marginLeft: 10
                        },
                        inputIOS: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                        inputAndroid: {
                            color: '#3478f6',
                            marginLeft: 10,
                            fontSize: 16,
                        },
                    }}
                    value={date.second}
                    Icon={() => null}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    pickerSelectStyle: {
        width: 35,
        height: 30,
        justifyContent: "center",
        backgroundColor: "#e9e9e9",
        borderRadius: 10,
        alignItems: "center",
        // paddingLeft:10
    },
    centeredView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
    },
});

export default TimePicker;