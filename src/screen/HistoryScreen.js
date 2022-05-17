import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useContext } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Button,
  DatePickerIOS,
  DatePickerAndroid,
  Linking,
} from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import HistoryTable from "../components/HistoryTable";
import trackerApi from "../api/tracker";
import Spacer from "../components/Spacer";
import { Context as HistoryContext } from "../context/HistoryContext";
import { label, uploadIP } from "../common/config";
import CustomModal from "../components/CustomModal";
import TimePicker from "../components/TimePicker";

const _headers = [
  { name: "序号", width: 60 },
  { name: "采样时间", width: 224, dataName: "time" },
  { name: "测量值", width: 120, dataName: "value" },
  { name: "质检值", width: 120, dataName: "selectedValue" },
  { name: "备注", width: 240, dataName: "dataInfo" },
];

const placeholderConfig = {
  label: "选择设备",
  value: null,
  color: "#3478f6",
};

const HistoryScreen = ({ navigation }) => {
  const { state, updateHistoryData } = useContext(HistoryContext);
  var _deviceID = navigation.getParam("_deviceID");
  var _sampleType = navigation.getParam("_sampleType");
  var random = navigation.getParam("random");
  var _currentHistoryData = navigation.getParam("_currentHistoryData");
  if (!_deviceID) {
    if (state.currentHistoryData[0]) {
      _deviceID = state.currentHistoryData[0].deviceID;
      _sampleType = state.currentHistoryData[0].sampleType;
    }
    _currentHistoryData = state.currentHistoryData;
  }
  
  const [headers, setHeaders] = useState(_headers);
  const [page, setPage] = useState(0);
  const [selectPage, setSelectPage] = useState("");
  const [sampleType, setSampleType] = useState(new Set());
  const [nPerPage, setNPerPage] = useState(20);
  const [counts, setCounts] = useState(0);
  const [deviceID, setDeviceID] = useState();
  const [dataType, setDataType] = useState("normalData");
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});
  const [deviceIndex, setDeviceIndex] = useState();
  const [dataList, setDataList] = useState([]);
  const [needReset, setNeedReset] = useState(false);

  const initCondition = () => {
    setDataType("normalData");
    setPage(0);
    setNPerPage(20);
    setCounts(0);
    setStartDate({
      year: null,
      month: null,
      date: null,
      hour: null,
      minute: null,
      second: null,
    });
    setEndDate({
      year: null,
      month: null,
      date: null,
      hour: null,
      minute: null,
      second: null,
    });
  };

  useEffect(() => {
    if (deviceID != _deviceID || !sampleType.has(_sampleType)) {
      setSampleType(new Set([_sampleType]));
      setDeviceID(_deviceID);
      _currentHistoryData.forEach((item, index) => {
        if (item.sampleType == _sampleType && item.deviceID == _deviceID) {
          setDeviceIndex(index);
        }
      });
      initCondition();
      setDataList([]);
      setNeedReset(new Date());
      askForHistory(
        (data) => {
          setDataList(data.historyData);
          setCounts(data.counts);
        },
        {
          deviceID: _deviceID,
          page: 0,
          nPerPage,
          sampleType: new Set([_sampleType]),
        }
      );
    }
  }, [_deviceID, _sampleType]);

  const window = useWindowDimensions();

  var deviceList = _currentHistoryData.map((item, index) => {
    return {
      label: item.name + "(" + label[item.sampleType] + ")",
      key: index,
      value: index,
      color: "#3478f6",
    };
  });
  const onDeviceChange = (value) => {
    setSampleType(new Set([_currentHistoryData[value].sampleType]));
    setDeviceID(_currentHistoryData[value].deviceID);
    initCondition();
    setDataList([]);
    setNeedReset(new Date());

    askForHistory(
      (data) => {
        setDataList(data.historyData);
        setCounts(data.counts);
      },
      {
        deviceID: _currentHistoryData[value].deviceID,
        page: 0,
        nPerPage,
        sampleType: new Set([_currentHistoryData[value].sampleType]),
      }
    );
  };
  const [conditionModalVisible, setConditionModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);

  async function askForHistory(handle, param) {
    if (param) {
      var {
        deviceID,
        page,
        nPerPage,
        dataType,
        startDate,
        endDate,
        type,
        sampleType,
      } = param;
      if (type == "download") {
        if (sampleType.size == 1 && [...sampleType][0] == "") {
          param = {
            deviceID,
            page,
            nPerPage,
            sampleType: [],
            dataType,
            startDate,
            endDate,
            type,
            filename:
              filename + yearMonth(startDate) + "~" + yearMonth(endDate),
          };
        } else {
          param = {
            deviceID,
            page,
            nPerPage,
            sampleType: new Array(...sampleType),
            dataType,
            startDate,
            endDate,
            type,
            filename:
              filename + yearMonth(startDate) + "~" + yearMonth(endDate),
          };
        }
      } else {
        if (sampleType.size == 1 && [...sampleType][0] == "") {
          param = {
            deviceID,
            page,
            nPerPage,
            sampleType: [],
            dataType,
            startDate,
            endDate: endDate,
          };
        } else {
          param = {
            deviceID,
            nPerPage,
            page,
            sampleType: new Array(...sampleType),
            ...(dataType ? { dataType } : {}),
            ...(startDate ? { startDate } : {}),
            ...(endDate ? { endDate } : {}),
          };
        }
      }
    } else {
      if (sampleType.size == 1 && [...sampleType][0] == "") {
        param = { deviceID, page, nPerPage, sampleType: [] };
      } else {
        param = {
          deviceID,
          page,
          nPerPage,
          sampleType: new Array(...sampleType),
        };
      }
    }
    // console.log(param)
    const response = await trackerApi.post(
      `${uploadIP}/SmartDetectHistory`,
      param
    );
    handle(response.data);
  }
  const pageClick = () => {
    setNeedReset(new Date());
    var { startDate, endDate } = getStart_EndTime();
    if (!startDate && !endDate) {
      return;
    }
    askForHistory(
      (data) => {
        setDataList(data.historyData);
        setCounts(data.counts);
      },
      { deviceID, page, nPerPage, sampleType, dataType, startDate, endDate }
    );
  };

  const nextPageClick = () => {
    if ((page + 1) * nPerPage <= counts) {
      setNeedReset(new Date());
      var { startDate, endDate } = getStart_EndTime();
      if (!startDate && !endDate) {
        return;
      }
      askForHistory(
        (data) => {
          setDataList(data.historyData);
          setCounts(data.counts);
          setPage(page + 1);
        },
        {
          deviceID,
          page: page + 1,
          nPerPage,
          sampleType,
          dataType,
          startDate,
          endDate,
        }
      );
    }
  };
  const lastPageClick = () => {
    if (page >= 1) {
      setNeedReset(new Date());
      var { startDate, endDate } = getStart_EndTime();
      if (!startDate && !endDate) {
        return;
      }
      askForHistory(
        (data) => {
          setDataList(data.historyData);
          setCounts(data.counts);
          setPage(page - 1);
        },
        {
          deviceID,
          page: page - 1,
          nPerPage,
          sampleType,
          dataType,
          startDate,
          endDate,
        }
      );
    }
  };
  const jumpClick = () => {
    var jump_page = parseInt(selectPage);
    if (jump_page >= 1 && (jump_page - 1) * nPerPage < counts) {
      var { startDate, endDate } = getStart_EndTime();
      if (!startDate && !endDate) {
        return;
      }
      setNeedReset(new Date());
      askForHistory(
        (data) => {
          setDataList(data.historyData);
          setCounts(data.counts);
          setPage(jump_page - 1);
        },
        {
          deviceID,
          page: jump_page - 1,
          nPerPage,
          sampleType,
          dataType,
          startDate,
          endDate,
        }
      );
    }
  };

  const search = () => {
    var { startDate, endDate } = getStart_EndTime();
    if (!startDate && !endDate) {
      return;
    }
    setNeedReset(new Date());
    setConditionModalVisible(false);
    askForHistory(
      (data) => {
        setDataList(data.historyData);
        setCounts(data.counts);
        setPage(0);
      },
      { deviceID, page: 0, nPerPage, sampleType, dataType, startDate, endDate }
    );
  };
  const yearMonth = (time) =>
    time.getFullYear() + ("-" + (time.getMonth() + 1));
  const saveFile = () => {
    var { startDate, endDate } = getStart_EndTime();
    if (!startDate && !endDate) {
      return;
    }
    var historyData = _currentHistoryData.find((item) => {
      if (sampleType.has(item.sampleType) && item.deviceID == deviceID) {
        return true;
      }
    });
    var info = {
      type: "download",
      deviceID,
      page,
      nPerPage,
      sampleType: new Array(...sampleType),
      dataType,
      startDate,
      endDate,
      filename:
        historyData.name +
        "(" +
        historyData.sampleType +
        ")" +
        yearMonth(startDate) +
        "~" +
        yearMonth(endDate),
    };
    Linking.openURL(
      uploadIP + "/SmartDetectHistory?" + new URLSearchParams(info).toString()
    );
    setExportModalVisible(false);
  };

  const getTime = (dateTime) => {
    if (
      dateTime.year == null &&
      dateTime.month == null &&
      dateTime.date == null &&
      dateTime.hour == null &&
      dateTime.minute == null &&
      dateTime.second == null
    ) {
      return null;
    } else {
      var _dateTime = new Date();
      if (dateTime.year != null) {
        _dateTime.setFullYear(dateTime.year);
      }
      if (dateTime.month != null) {
        _dateTime.setMonth(dateTime.month - 1);
      }
      if (dateTime.date != null) {
        _dateTime.setDate(dateTime.date);
      }
      if (dateTime.hour != null) {
        _dateTime.setHours(dateTime.hour);
      }
      if (dateTime.minute != null) {
        _dateTime.setMinutes(dateTime.minute);
      }
      if (dateTime.second != null) {
        _dateTime.setSeconds(dateTime.second);
      }
      return _dateTime;
    }
  };
  function toUTCDate(date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  }
  function getStart_EndTime() {
    var _endDate = getTime(endDate);
    var _startDate = getTime(startDate);

    if (!_endDate) {
      _endDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    }
    if (_startDate && _endDate <= _startDate) {
      alert("起始时间必须小于结束时间!");
      return { startDate: null, endDate: null };
    }
    switch (dataType) {
      case "monthData":
        if (!_startDate) {
          _startDate = new Date();
          _startDate.setMonth(_startDate.getMonth() - 1);
          _startDate = toUTCDate(_startDate);
        }
        break;
      case "dailyData":
        if (!_startDate) {
          _startDate = new Date();
          _startDate.setDate(_startDate.getDate() - 1);
          _startDate = toUTCDate(_startDate);
        }
        break;
      case "hourData":
        if (!_startDate) {
          _startDate = new Date(0);
        }
        break;
      case "":
      case "normalData":
      default:
        if (!_startDate) {
          _startDate = new Date(0);
        }
        break;
    }
    return { startDate: _startDate, endDate: _endDate };
  }

  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={{ flex: 1, marginTop: 20 }}
    >
      <CustomModal
        title={"其他条件"}
        modalVisible={conditionModalVisible}
        setModalVisible={setConditionModalVisible}
        footButton={
          <View
            style={{
              flexDirection: "row",
              width: 125,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#6b747d" }}
              onPress={() => {
                setDataType("normalData");
                setStartDate({
                  year: null,
                  month: null,
                  date: null,
                  hour: null,
                  minute: null,
                  second: null,
                });
                setEndDate({
                  year: null,
                  month: null,
                  date: null,
                  hour: null,
                  minute: null,
                  second: null,
                });
              }}
            >
              <Text style={{ color: "white" }}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#0f6dfd" }}
              onPress={search}
            >
              <Text style={{ color: "white" }}>查询</Text>
            </TouchableOpacity>
          </View>
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>报表选择:</Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                ...styles.buttonInRow,
                ...(dataType == "normalData"
                  ? { backgroundColor: "#15caf0" }
                  : { backgroundColor: "white" }),
              }}
              onPress={() => {
                setDataType("normalData");
              }}
            >
              <Text
                style={{
                  ...(dataType == "normalData"
                    ? { color: "black", fontWeight: "bold" }
                    : { color: "#15caf0" }),
                }}
              >
                正常报表
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.buttonInRow,
                ...(dataType == "monthData"
                  ? { backgroundColor: "#15caf0" }
                  : { backgroundColor: "white" }),
              }}
              onPress={() => {
                setDataType("monthData");
              }}
            >
              <Text
                style={{
                  ...(dataType == "monthData"
                    ? { color: "black", fontWeight: "bold" }
                    : { color: "#15caf0" }),
                }}
              >
                月报表
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.buttonInRow,
                ...(dataType == "dailyData"
                  ? { backgroundColor: "#15caf0" }
                  : { backgroundColor: "white" }),
              }}
              onPress={() => {
                setDataType("dailyData");
              }}
            >
              <Text
                style={{
                  ...(dataType == "dailyData"
                    ? { color: "black", fontWeight: "bold" }
                    : { color: "#15caf0" }),
                }}
              >
                日报表
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.buttonInRow,
                ...(dataType == "hourData"
                  ? { backgroundColor: "#15caf0" }
                  : { backgroundColor: "white" }),
              }}
              onPress={() => {
                setDataType("hourData");
              }}
            >
              <Text
                style={{
                  ...(dataType == "hourData"
                    ? { color: "black", fontWeight: "bold" }
                    : { color: "#15caf0" }),
                }}
              >
                小时数据
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>起始时间:</Text>
          <TimePicker date={startDate} setDate={setStartDate} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>结束时间:</Text>
          <TimePicker date={endDate} setDate={setEndDate} />
        </View>
      </CustomModal>
      <CustomModal
        title={"数据导出"}
        footButton={
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#0f6dfd" }}
            onPress={saveFile}
          >
            <Text style={{ color: "white" }}>下载</Text>
          </TouchableOpacity>
        }
        modalVisible={exportModalVisible}
        setModalVisible={setExportModalVisible}
      >
        <Text>数据导出</Text>
      </CustomModal>
      <View style={styles.header}>
        <View style={{ ...styles.pickerSelectStyle }}>
          <RNPickerSelect
            // placeholder={placeholderConfig}
            placeholder={{}}
            items={deviceList}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value, index) => {
              if (value == null) {
              } else if (value != deviceIndex) {
                setDeviceIndex(value);
                if (Platform.OS == "android") {
                  onDeviceChange(value);
                }
              }
            }}
            pickerProps={{
              selectedValue: deviceIndex,
            }}
            onDonePress={() => {
              onDeviceChange(deviceIndex);
            }}
            style={{
              placeholder: {
                color: "#3478f6",
                fontSize: 16,
              },
              inputIOS: {
                color: "#3478f6",
                marginLeft: 10,
                fontSize: 16,
              },
              inputAndroid: {
                color: "#3478f6",
                marginLeft: 10,
                fontSize: 16,
              },
            }}
            value={deviceIndex}
            Icon={() => null}
          />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={{
              ...styles.button,

              ...(startDate.year == null &&
                startDate.month == null &&
                startDate.date == null &&
                startDate.hour == null &&
                startDate.minute == null &&
                startDate.second == null &&
                endDate.year == null &&
                endDate.month == null &&
                endDate.date == null &&
                endDate.hour == null &&
                endDate.minute == null &&
                endDate.second == null &&
                dataType == "normalData"
                ? { backgroundColor: "#6b747d" }
                : { backgroundColor: "#316cf4" }),
            }}
            onPress={() => setConditionModalVisible(true)}
          >
            <Text style={{ color: "white" }}>其他条件</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setExportModalVisible(true)}
          >
            <Text style={{ color: "white" }}>数据导出</Text>
          </TouchableOpacity>
        </View>
      </View>
      <HistoryTable
        needReset={needReset}
        headers={headers}
        dataList={dataList}
        tableConfig={{
          tableHeight: window.height - (Platform.OS == "ios" ? 253 : 199),
        }}
      />
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          onChangeText={setSelectPage}
          value={selectPage}
          placeholder="页码"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: "#316cf4",
            marginRight: 10,
          }}
          onPress={jumpClick}
        >
          <Text style={{ color: "white" }}>跳转</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={lastPageClick}
          disabled={page >= 1 ? false : true}
          style={{
            ...styles.button,
            backgroundColor: "white",
            borderColor: "#dee1e5",
            borderWidth: 1.2,
          }}
        >
          {page >= 1 ? (
            <Text style={{ color: "#316cf4" }}>上一页</Text>
          ) : (
            <Text style={{ color: "#6d747c" }}>上一页</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: "white",
            borderColor: "#dee1e5",
            borderWidth: 1.2,
          }}
          onPress={pageClick}
        >
          <Text style={{ color: "#316cf4" }}>{page + 1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={nextPageClick}
          disabled={(page + 1) * nPerPage <= counts ? false : true}
          style={{
            ...styles.button,
            backgroundColor: "white",
            borderColor: "#dee1e5",
            borderWidth: 1.2,
          }}
        >
          {(page + 1) * nPerPage <= counts ? (
            <Text style={{ color: "#316cf4" }}>下一页</Text>
          ) : (
            <Text style={{ color: "#6d747c" }}>下一页</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerSelectStyle: {
    width: 160,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#e9e9e9",
    borderRadius: 30,
  },
  headerRight: {
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    paddingHorizontal: 2,
    justifyContent: "space-between",
    width: 180,
  },
  button: {
    height: 40,
    backgroundColor: "#6b747d",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonInRow: {
    height: 40,
    borderColor: "#15caf0",
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  footer: {
    height: 50,
    margin: 2,
    marginRight: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    borderWidth: 1.2,
    borderColor: "#8a8a8d",
    height: 40,
    width: 60,
    borderRadius: 10,
    margin: 2,
    paddingHorizontal: 5,
  },
});

export default HistoryScreen;
