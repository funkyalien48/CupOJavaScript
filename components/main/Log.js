import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'

import fire from '../fire'
import { Text, View, Button, TextInput, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../assets/colors/colors'

export default function Log() {

    // Set today's date to track calories for today
    let today = new Date();
    let logDate = today.toDateString(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());

    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid

    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
    const [purpose, setPurpose] = useState("");
    const [dailyFood, setDailyFood] = useState(null);
    const [splitDailyFood, setSplitDailyFood] = useState(null);
    const [hobbies, setHobbies] = useState("");
    let totalHeight = ((feet * 12) + Number(inches));

    const [recommendedCalories, setRecommendedCalories] = useState("");
    const [purposeCalories, setPurposeCalories] = useState("");
    const [dailyCalories, setDailyCalories] = useState(0);
    const [startIndex, setStartIndex] = useState(5);
    const [endIndex, setEndIndex] = useState(10);
    const [food, setFood] = useState('');
    const [calories, setCalories] = useState('');

    const [userDataIsRetrieved, setUserDataIsRetrieved] = useState(false);
    let newDailyFood = undefined;

    function updateLog() {
        usersDB.doc(userID).collection("DailyFood").add(newDailyFood)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
            Alert.alert('Error', error.message, [{text: 'OK'},], {cancelable: true});
        });
     
        setUserDataIsRetrieved(false);
    }
      
    const getUserInfo = () => {
        usersDB.doc(userID).get()
        .then((snapshot => {
                setSex(snapshot.data().sex);
                setWeight(snapshot.data().weight);
                setFeet(snapshot.data().feet);
                setInches(snapshot.data().inches);
                setAge(snapshot.data().age);
                setPurpose(snapshot.data().purpose);
                setHobbies(snapshot.data().hobbies);

                calculateCalories();
            }))

        // Retreieve DailyFood collection that stores the different food tracked for the current date which is stored in the logDate variable
        usersDB.doc(userID).collection('DailyFood').where('createdAt', '==', logDate).get()
        .then((querySnapshot) => {
            let dailyFoodData = querySnapshot.docs.map(doc => doc.data());
            setDailyFood(dailyFoodData);
            setSplitDailyFood(dailyFoodData.slice(0, 5));
            setUserDataIsRetrieved(true);
            changeDailyCalories();
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
    }

    function validateFoodInputs(name, calories) {
        let errorMsg = 'Invalid fields:';
        let isError = false;

        if (name == "") {
            errorMsg += '\nName';
            isError = true;
        }

        if (calories == "" || calories < 0) {
            errorMsg += '\nCalories';
            isError = true;
        }

        //If an error was detected.
        if (isError == true) {
            alert(errorMsg);
            isError = false;
        }
        //If everything is valid
        else {
            typeNewFood(name, calories);
        }
    }

    function typeNewFood(name, calories) {
        let timestamp = logDate;

        newDailyFood = {name: name, calories: calories, createdAt: timestamp};
        updateLog();
        alert("You added: " + name);

        setFood('');
        setCalories('');
        changeDailyCalories();
    }

    function changeDailyCalories() {
        let currentCals = 0;

        if (dailyFood != null) {
            for (let i = 0; i < dailyFood.length; i++) {
                currentCals += parseFloat(dailyFood[i].calories);
            }
        }

        setDailyCalories(currentCals);
    }

    //Recommended calories to maintain weight   
    //BMR 
    //Harris-Benedict Formula
    function calculateCalories() {
        let calories = "";

        if (sex == "male") {
            calories = (66 + (6.3 * weight) + Number(12.9 * totalHeight) - (6.8 * age));
            setRecommendedCalories(calories);
        } 
        else {
            calories = (65 + (4.3 * weight) + Number(4.7 * totalHeight) - (4.7 * age))
            setRecommendedCalories(calories);
        }

        calculatePurposeCalories(calories);
    }

    const continueList = (start, end) => {
        setSplitDailyFood(splitDailyFood.concat(dailyFood.slice(start, end)));
        setStartIndex(startIndex + 5);
        setEndIndex(endIndex + 5);
    }

    //calculates calories needed to gain or lose weight depending on user's purpose
    function calculatePurposeCalories(calories) {
        if (purpose == "donate") {
            setPurposeCalories(calories - 500);
        }
        else {
            setPurposeCalories(calories + 500);
        }   
    }

    if (userDataIsRetrieved == false) {
        getUserInfo();
    }
    

    return (
        <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={styles.outerScreen}>
        <SafeAreaView style = {styles.contentCenter}>
            <StatusBar barStyle='light-content' />
            <Text style = {styles.pageHeader}>Log</Text>
            <View style = {styles.logScreen}>
                <View style = {{ alignItems: 'center' }}>

                    <View style = {styles.logRow}>
                        <Text style = {styles.logData}>Date: {logDate.toString()}</Text>
                    </View>

                    <View style = {styles.logPurpose}>
                        <Text style = {styles.logData}>Your purpose is to {purpose} weight! </Text>
                    </View>

                    <View style={styles.foodView}>
                        <Text style = {styles.logData}>Daily Calories to maintain weight: {Math.round(recommendedCalories)} Cal</Text>
                    </View> 

                    <View style={styles.foodView}>
                        <Text style = {styles.logData}>Daily Calories to {purpose} 1 lb: {Math.round(purposeCalories)} Cal</Text>
                    </View>

                    <View style={styles.foodView}>
                        <Text style = {styles.logData}>Current Daily Calories: {dailyCalories} Cal</Text>
                    </View>

                    <View style={styles.foodView}>
                        <TextInput 
                            style = {styles.nameInput}
                            placeholder = 'Food'
                            returnKeyType = 'done'
                            value={food}
                            onChangeText = {(text) => setFood(text)}
                            onSubmitEditing={() => {
                                setFood('');
                            }}
                        />
                        <TextInput 
                            style = {styles.calorieInput}
                            placeholder = 'Calories'
                            returnKeyType = 'done'
                            value={calories}
                            onChangeText = {(text) => setCalories(text)}
                            onSubmitEditing={() => {
                                setCalories('');
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                    <Button
                            title = 'Add Food'
                            onPress = {() => validateFoodInputs(food, calories) && startIndex}
                        />
                        

                    </View>
                    <FlatList
                        data={dailyFood}
                        renderItem={({item}) => 
                            <View style = {styles.foodData}>
                                {item.createdAt === logDate &&
                                    <View style={{ flex: 1, flexDirection: 'row'}}>
                                    <Text style= {styles.foodName}>{item.name}{" "}</Text>
                                    <Text style= {styles.foodCalories}>{item.calories}</Text>
                                </View>
                                }
                            </View>}
                        onEndReached = {() => continueList(startIndex, endIndex)}
                        onEndReachedThreshold = {1}
                        keyExtractor = {(item, index) => index.toString()}
                        />
                    
                </View>
            </View>
        </SafeAreaView>
        </LinearGradient>
    );
}   

const styles = {
    contentCenter: {
        height: '100%',
        alignItems: 'center'
        
    },
    logScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#D9D7D7',
    },
    logData: {
        fontSize: 20,
    },
    logPurpose: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#D9D7D7',
        justifyContent: 'center',
        fontWeight: 'bold',
        padding: 10
    },
    logRow: {
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20, 
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 10,
    },
    calorieInput: {
        fontSize: 20,
        width: 100
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
        color: '#000000',
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
    foodView: {
        flex: 1,
        flexDirection:"row",
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
        height: '10%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: "#FFFFFF",
        padding: 10,
        marginBottom: 30
    }
}
