import React, { useState } from 'react'
import { Text, View, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../assets/colors/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import UserList from '../social/UserList'
import FriendRequests from '../social/FriendRequests'

export default function Social() {   
    // useState hook to switch between userList component and friendRequests component
    // Used to simulate 2 different pages on 1 page
    const [section, setSection] = useState('userList');
    
    return (
        <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={styles.outerScreen}>
            <SafeAreaView style={styles.contentCenter}>
                <StatusBar barStyle='light-content' />
                <Text style = {styles.pageHeader}>Social</Text>
                <View style={styles.innerScreen}>
                    <View style={styles.topNav}>
                        <Pressable style={styles.navLink} title="Users List" onPress={() => setSection('userList')}>
                            <Text>Users List</Text>
                        </Pressable>
                        <Pressable style={styles.navLink} title="Friend Requests" onPress={() => setSection('friendRequests')}>
                            <Text>Friend Requests</Text>
                        </Pressable>
                    </View>
                    {section === 'userList' &&
                        <UserList />
                    }
                    {section === 'friendRequests' &&
                        <FriendRequests />
                    }
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}   

const styles = {
    outerScreen: {
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
    contentCenter: {
        height: '100%',
        alignItems: 'center'
    },
    innerScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: "#FFFFFF"
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 5
    },
    navLink: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        width: '49.5%',
        height: 37,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
}