import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, Pressable, Modal, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../assets/colors/colors'
import fire from '../fire'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function Progress() {
    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid
    const [modalVisible, setModalVisible] = useState(false);
    const [weight, setWeight] = useState("");
    let today = new Date();
    let logDate = today.toDateString(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());

    function logWeight() {
        const loggedWeight = {
            weight: weight,
            date: logDate
        }

        usersDB.doc(userID).collection("LoggedWeight").add(loggedWeight)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
            Alert.alert('Error', error.message, [{text: 'OK'},], {cancelable: true});
        });

        setModalVisible(!modalVisible)
    }

    return (
        <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={styles.outerScreen}>
        <SafeAreaView style = {styles.contentCenter}>
            <StatusBar barStyle='light-content' />
            <Text style={styles.pageHeader}>Progress</Text>
            <Pressable style={styles.addButton} title="Users List" onPress={() => setModalVisible((modalVisible) => !modalVisible)}>
                <MaterialCommunityIcons name="plus" color={'#fff'} size={26} />
            </Pressable>
            <View style={styles.innerScreen}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Weight</Text>
                            <TextInput 
                                style = {styles.nameInput}
                                placeholder = "Weight"
                                returnKeyType = 'done'
                                onChangeText = {editedWeight => setWeight(editedWeight)}
                            />
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={logWeight}
                            >
                                <Text style={styles.textStyle}>Log Weight</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={styles.logWeightSection}>
                    {/* <Pressable style={styles.logWeightBtn} title="Users List" onPress={() => setModalVisible(true)}>
                        <Text style={styles.logWeightText}>Log Weight</Text>
                    </Pressable> */}
                </View>
            </View>
        </SafeAreaView>
        </LinearGradient>
    )
}

const styles = {
    contentCenter: {
        height: '100%',
        alignItems: 'center'
    },
    feedScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: "#FFFFFF"
    },
    feedData: {
        fontSize: 20,
    },
    feedRow: {
        flexDirection: 'row',
    },
    calorieInput: {
        fontSize: 20,
        width: 50
    },
    innerScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: "#FFFFFF"
    },
    nameInput: {
        fontSize: 20,
        width: 200
    },
    outerScreen:  {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },
    pageHeader: {
        fontSize: 30,
        fontFamily: 'NunitoSans-Bold',
        color: '#000000'
    },
    foodData: {
    },
    foodName: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'NunitoSans-Bold',
    },
    foodCalories: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'NunitoSans-Regular',
    },
    logWeightSection: {
        width: '100%',
        height: '50px',
        flexDirection: 'row',
        justifyContent: 'end',
        alignItems: 'center',
        padding: 10
    },
    logWeightBtn: {
        backgroundColor: '#1255FFD9',
        padding: 10,
        borderRadius: 5
    },
    logWeightText: {
        color: 'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        display: 'absolute',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#1255FFD9",
        marginTop: 20
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    addButton: {
        position: 'absolute',
        top: 7,
        right: 15
    }
}


export default Progress