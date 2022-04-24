import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, Pressable, Modal, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../assets/colors/colors'
import fire from '../fire'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LineChart from './LineChart'

function Progress() {
    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid
    const [modalVisible, setModalVisible] = useState(false);
    const [weight, setWeight] = useState('');
    let today = new Date();
    let logDate = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

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
        loadData();
    }

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Weight Progress',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 224, 255, 0.5)',
            color: 'rgba(0, 224, 255, 0.3)'
        }]
    });

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        let data =  await getWeightData();

        let weight = [];
        data.forEach((element) => {
            weight.push(element.weight)
        })

        let date = [];
        data.forEach((element) => {
            date.push(element.date)
        })

        setChartData({
            labels: date,
            datasets: [{
                label: 'Weight Progress',
                data: weight,
                fill: true,
                backgroundColor: 'rgba(0, 224, 255, 0.5)',
                color: 'rgba(0, 224, 255, 0.8)'
            }]
        })
    }

    const getWeightData = async () => {
        let data = [];
        await usersDB.doc(userID).collection('LoggedWeight').get()
        .then((querySnapshot) => {
            data = querySnapshot.docs.map(doc => doc.data());
        })
        .catch((error) => console.log('Error getting weight data: ', error));

        data.sort(function(a,b) {
            return new Date(a.date) - new Date(b.date)
        })

        return data;
    }

    return (
        <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={styles.outerScreen}>
        <SafeAreaView style = {styles.contentCenter}>
            <StatusBar barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.blank}>blank</Text>
                <Text style={styles.pageHeader}>Progress</Text>
                <Pressable style={styles.addButton} title="Users List" onPress={() => setModalVisible((modalVisible) => !modalVisible)}>
                    <MaterialCommunityIcons name="plus" color={'#fff'} size={26} />
                </Pressable>
            </View>
            <View style={styles.innerScreen}>
                <LineChart chartData={chartData} />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Log Weight</Text>
                            <View style={styles.bar}></View>
                            <Text style={styles.inputHeader}>Enter Weight</Text>
                            <TextInput 
                                style = {styles.weightInput}
                                keyboardType='numeric'
                                placeholder = 'Weight'
                                returnKeyType = 'done'
                                onChangeText = {editedWeight => setWeight(editedWeight)}
                            />
                            <View style={styles.buttons}>
                                <Pressable
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={[styles.textStyle, styles.red]}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.logButton]}
                                    onPress={logWeight}
                                    >
                                        <Text style={[styles.textStyle, styles.green]}>Submit</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.logWeightSection}>
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
    weightInput: {
        padding: 10,
        fontSize: 20,
        width: '100%',
        borderWidth: '1px',
        borderColor: '#ddd',
        borderStyle: 'solid',
        borderRadius: 5,
        color: '#000'
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
        height: 50,
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
        backgroundColor: '#00000030'
    },
    modalView: {
        width: '90%',
        display: 'absolute',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "start",
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
    logButton: {
        backgroundColor: "#d3f4d8",
        width: '48%'
    },
    cancelButton: {
        backgroundColor: '#f9dade',
        width: '48%'
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: '17pt',
        fontWeight: 'bold'
    },
    // addButton: {
        // position: 'absolute',
        // top: 50,
        // right: 25
    // },
    green: {
        color: '#228220'
    },
    red: {
        color: '#dc2833'
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40
    },
    inputHeader: {
        fontSize: '14pt',
        marginBottom: 10
    },
    bar: {
        width: '100%',
        height: 1,
        backgroundColor: '#eee',
        marginBottom: 45,
    },
    header: {
        width: '100%',
        height: 42,
        paddingRight: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    blank: {
        opacity: 0
    }
}


export default Progress