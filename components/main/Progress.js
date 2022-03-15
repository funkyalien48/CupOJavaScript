import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../assets/colors/colors'

function Progress() {
  return (
      <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={styles.outerScreen}>
        <SafeAreaView style = {styles.contentCenter}>
            <StatusBar barStyle='light-content' />
            <Text style={styles.pageHeader}>Progress</Text>
            <View style={styles.innerScreen}>
                <Text>Progress Graph Goes here</Text>
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
    }

}


export default Progress