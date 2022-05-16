import React, { useState } from 'react';
import {Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';

const CustomModal = ({
    title, children, footButton,modalVisible, setModalVisible
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={{
                flex: 1,
                justifyContent: "center"
            }}>
                <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(!modalVisible)}></TouchableOpacity>
                <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalText}>{title}</Text>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.modalButtonClose}>X</Text>
                        </Pressable>
                    </View>
                    <View style={styles.modalSplitLine}></View>
                    <View style={styles.modalBody}>
                        {children}
                    </View>
                    <View style={styles.modalSplitLine}></View>
                    <View style={styles.modalFoot}>
                        {
                            footButton
                        }
                        {/* <View style={styles.modalFootButton}>
                                <Button title='abc' />
                                <Button title='abc' />
                            </View> */}
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 16,
        marginHorizontal: 10
    },
    modalBody: {
        marginHorizontal: 10,
        marginVertical: 12,
    },
    modalFoot: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 10,
        alignContent: "space-between",
    },
    // modalFootButton: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     width: 120,
    // },
    modalText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    modalBackground: {
        flex: 1,
        zIndex: 5,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "black",
        opacity: 0.5
    },
    modalSplitLine: {
        borderTopWidth: 2,
        borderTopColor: "#dee1e5"
    },
    modalButtonClose: {
        color: "#3478f6",
        fontSize: 16
    },
});

export default CustomModal;