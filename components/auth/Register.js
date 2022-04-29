import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../AuthTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Register extends Component {

    constructor(props) {
        super(props)

        // Sets the state of email, password, and confirmPassword by default to empty strings
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    // function validatePassword() - validates that the 2 passwords entered by the user match
    validatePassword = () => {
        // Destructure email, password, and confirmPassword from the components state
        const { email, password, confirmPassword } = this.state;

        // Checks if password is blank, or if passwords do not match, or if password is shorter than 6 characters
        if (password == '') {
            alert("Password cannot be blank!")
        }
        else if (password != confirmPassword) {
            alert("Your passwords do not match!");
        }
        else if (password.length < 6) {
            alert("Password must be more than 6 characters.");
        }
        else {
            // Navigate the user to CreateProfile page if password is valid
            this.props.navigation.navigate("CreateProfile", {email: email, password: password});
        }
    }

    
    render() {
        // Destructure email and password from state to have access to these values
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
                                <Text style={styles.headerText}>Sign Up</Text>
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
                                <AuthTextInput 
                                    secureTextEntry={true}
                                    style={styles.AuthTextInputContainer}
                                    onChangeText={confirmPassword => this.setState({ confirmPassword })}>
                                Confirm Password</AuthTextInput>
                            <View style={styles.footerText}>
                                <Text style={styles.textRegular}>Already Registered? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                    <Text style={styles.textBold}>Login</Text>
                                </TouchableOpacity>
                            </View>
                                <TouchableOpacity onPress={() => this.validatePassword(navigation)}>
                                    <Text style={styles.RegisterButton}>Create Account</Text>
                                </TouchableOpacity>
                        </KeyboardAwareScrollView>
                    </SafeAreaView>
                </LinearGradient>
            </View>
        )
    }
}