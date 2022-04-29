import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react'
import { View, Text, TextInput, Image, Alert, TouchableOpacity, Platform, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';
import AuthTextInput from '../AuthTextInput';
import backButton from '../../assets/images/backButton.png'

export default class CreateProfile extends Component {

    constructor(props) {
        super(props)

        // Holds the state that the user inputs which by default is an empty string
        this.state = {
            email: this.props.route.params.email,
            password: this.props.route.params.password,
            first_name: '',
            last_name: '',
            sex: '',
            age: '',
            feet: '',
            inches: '',
            weight: '',
            bmi: '',
            hobbies: '',
        }
    }

    // TODO: Verification that all data is valid and not empty
    // onCreateProfile() - This function passes the user attributes as props to ChoosePurpose and
    // navigates to ChoosePurpose page to continue registration
    onCreateProfile = () => {
        // Retrieves the values for each attribute from the state
        const { email, password, first_name, last_name, sex, age, feet, inches, weight, hobbies } = this.state;

        // Calculate the bmi for the user given the user attributes
        let bmiCalc = this.calcBMI();

        // Navigate user to ChoosePurpose
        this.props.navigation.navigate("ChoosePurpose", { email: email, password: password, first_name: first_name, last_name: last_name, sex: sex, age: age, feet: feet, inches: inches, weight: weight, bmi: bmiCalc, hobbies: hobbies });
    }

    // calcBMI() - Calculates a User's BMI given the user input to store in the database to determine caloric intake
    calcBMI = () => {
        let totalHeight = (this.state.feet * 12) + parseFloat(this.state.inches);
        return ((this.state.weight * 703) / (totalHeight * totalHeight)).toFixed(2);
    }


    // TODO: Rename function to something more meaningful (validateData, or validateInformation)
    // validateNumbers() - This function validates the proper input from the user when inputting fields
    validateNumbers = () => {
        const { first_name, last_name, sex, age, feet, inches, weight, hobbies } = this.state;
        let errorMsg = 'Invalid fields:';
        let isError = false;

        //Check if name is empty
        if (first_name == '' || last_name == '') {
            errorMsg += '\nName';
            isError = true;
        }
        //Check if sex is empty
        if (sex == '' || sex == 'Select your sex...') {
            errorMsg += '\nSex';
            isError = true;
        }
        //Check if age is valid
        if (age == '' || isNaN(age) || age < 1 || age > 120) {
            errorMsg += '\nAge';
            isError = true;
        }
        //Check if height is valid
        if (inches == '' || isNaN(inches) || inches < 0 || inches > 11 || feet == '' || isNaN(feet) || feet < 0 || feet > 10) {
            errorMsg += '\nHeight';
            isError = true;
        }
        //Check if weight is valid
        if (weight == '' || isNaN(weight) || weight < 0 || weight > 1500) {
            errorMsg += '\nWeight';
            isError = true;
        }
        //Check if hobbies section is empty
        if (hobbies == '') {
            errorMsg += '\nHobbies';
            isError = true;
        }

        //If an error was detected.
        if (isError == true) {
            alert(errorMsg);
            isError = false;
        }
        //If everything is valid
        else {
            // Call onCreateProfile to create the profile and continue registration process
            // if all values are valid
            this.onCreateProfile();
        }
    }

    render() {
        // Destructure email and password from state to have access to these values
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={[colors.lightBlue, colors.darkBlue]}
                    style={styles.background}
                >
                    <SafeAreaView>
                        <KeyboardAwareScrollView
                            resetScrollToCoords={{ x: 0, y: 0 }}
                            scrollEnabled={false}
                        // contentContainerStyle={ Platform.OS === "ios" ? styles.ios : {} }
                        >
                            <View style={{ width: '18%', height: 50 }}>
                                <Pressable onPress={() => this.props.navigation.navigate("Register")}
                                    style={{ marginTop: 5, marginLeft: 5, flexDirection: 'row' }}>
                                    <Image source={backButton} style={{ width: 20, height: 20 }} />
                                    <Text style={{ marginTop: 0, color: 'white' }}>Go back</Text>
                                </Pressable>
                            </View>
                            <Text style={{
                                color: '#FFF',
                                fontSize: 16,
                                fontFamily: 'Montserrat-SemiBold',
                                marginLeft: '30%',
                                marginBottom: '7%'
                            }}>Profile Information</Text>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("AddContainer")}>
                                    <Image
                                        source={require('../../assets/images/default_profile.jpg')}
                                        style={styles.DefaultProfile}
                                    />
                                </TouchableOpacity>
                            </View>

                            
                            <View style={styles.loginPrompt}>
                                <View style={styles.AuthTextInputRow}>
                                    <AuthTextInput
                                        style={styles.AuthTextInputContainerSmall}
                                        onChangeText={first_name => this.setState({ first_name })}>
                                        First</AuthTextInput>
                                    <AuthTextInput
                                        style={styles.AuthTextInputContainerSmall}
                                        onChangeText={last_name => this.setState({ last_name })}>
                                        Last</AuthTextInput>
                                </View>

                                   
                                <View style={styles.AuthTextInputRow}>
                                    <View style={styles.AuthTextInputContainerSmall}>
                                        <Text style={styles.AuthTextInputText}>Sex</Text>
                                        <RNPickerSelect
                                            style={styles.AuthTextInputContainerSmall}
                                            // placeholder = {{label:'Select your sex...', value: ''}}
                                            items={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
                                            onValueChange={sex => this.setState({ sex })}
                                            returnKeyType='done'
                                        />
                                    </View>

                                      
                                    <AuthTextInput
                                        style={styles.AuthTextInputContainerSmall}
                                        onChangeText={age => this.setState({ age })}>
                                        Age</AuthTextInput>
                                </View >

                                  
                                <Text style={styles.textRegularHeading}>Height</Text>
                                <View style={styles.AuthTextInputRow}>

                                    <View style={styles.AuthTextInputRow}>
                                        <AuthTextInput
                                            style={styles.AuthTextInputContainerSmall}
                                            onChangeText={feet => this.setState({ feet })}>
                                            Feet</AuthTextInput>
                                        <AuthTextInput
                                            style={styles.AuthTextInputContainerSmall}
                                            onChangeText={inches => this.setState({ inches })}>
                                            Inches</AuthTextInput>
                                    </View>
                                </View>

                                    
                                <Text style={styles.textRegularHeading}>Weight</Text>
                                <View style={styles.AuthTextInputRow}>
                                    <AuthTextInput
                                        style={styles.AuthTextInputContainerSmall}
                                        onChangeText={weight => this.setState({ weight })}>
                                        Pounds</AuthTextInput>
                                </View>


                                <Text style={styles.textRegularHeading}>Tell us about your hobbies. What are you passionate about?</Text>
                                <View style={styles.AuthTextInputRow}>
                                    <AuthTextInput
                                        style={styles.AuthTextInputContainer}
                                        onChangeText={hobbies => this.setState({ hobbies })}>
                                        Hobbies</AuthTextInput>
                                </View>

                                <TouchableOpacity onPress={() => this.validateNumbers()}>
                                    <Text style={{
                                        color: '#FFF',
                                        fontSize: 16,
                                        fontFamily: 'Montserrat-SemiBold',
                                        marginLeft: '40%',
                                        marginTop: '32%'
                                    }}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                    </SafeAreaView>
                </LinearGradient>
            </View>

        )
    }
}

