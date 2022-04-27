import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, Platform, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../AuthTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import fire from '../fire'

export default class Login extends Component {
    constructor(props) {
        super(props)

        // Sets the state of email and password to empty strings
        this.state = {
            email: '',
            password: ''
        }

        this.onSignIn = this.onSignIn.bind(this)
    }

    //TODO: process codes for errors and display to user
    // onSignIn() - Function that takes email and password input from user and query's firebase with the account
    // that matches the credentials
    onSignIn() {
        // Destructure email and password from state to have access to these values
        const { email, password } = this.state;

        // Query firebase for user with email and password input
        fire.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
            Alert.alert('Error', error.message, [{text: 'OK'},], {cancelable: true});
        })
    }


    render() {
        // destructure navigation from props to navigate
        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                    <LinearGradient
                    colors={[colors.lightBlue, colors.darkBlue]}
                    style={styles.background}
                    >
                        <SafeAreaView>
                            <KeyboardAwareScrollView
                                resetScrollToCoords={{ x: 0, y: 0 }}
                                scrollEnabled={false}
                                contentContainerStyle={ Platform.OS === "ios" ? styles.ios : {} }
                                >
                                <View style={{ alignItems: 'center'}}>
                                    <Image 
                                    source={require('../../assets/images/logo.png')}
                                    style={styles.logo}
                                    />
                                </View>
                                    <Text style={styles.headerText}>Sign In</Text>
                                    <AuthTextInput 
                                        keyboardType='email-address'
                                        placeholder="example@gmail.com"
                                        style={styles.AuthTextInputContainer}
                                        onChangeText={email => this.setState({ email })}>
                                    Email</AuthTextInput>
                                    <AuthTextInput 
                                        secureTextEntry={true}
                                        style={styles.AuthTextInputContainer}
                                        onChangeText={password => this.setState({ password })}>
                                    Password</AuthTextInput>
                                <View style={styles.footerText}>
                                    <Text style={styles.textRegular}>Not Registered? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                        <Text style={styles.textBold}>Create Account</Text>
                                    </TouchableOpacity>
                                </View>
                                    <TouchableOpacity  onPress={() => this.onSignIn()}>
                                        <Text style={styles.LoginButton}>Login</Text>
                                    </TouchableOpacity>
                            </KeyboardAwareScrollView>
                        </SafeAreaView>
                    </LinearGradient>
                </View>
        )
    }
}
