import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from "react-native";
import { Text, View } from '../components/Themed';

import { default as theme } from '../theme.json';

export default function SignupScreen() {
    return (
        <View>
            <View style={styles.ImageContainer}>
                <Logo />
            </View>
            <View style={styles.InputContainer}>
                <UsernameInput />
                <EmailInput />
                <PasswordInput />
                <ConfirmPasswordInput />
            </View>
            <View style={styles.ButtonContainer}>
                <SignupButton />
                <BackButton />
            </View>
        </View>
    );
}

function Logo() {
    return (
        <Image
            style={{
                resizeMode: "contain",
                height: 100,
                width: 200,
            }}
            source={require('../assets/images/icon.png')}
        />
    );
}

function UsernameInput() {
    const [username, setUsername] = useState("");
    return (
        <View style={styles.InputStyling}>
            <TextInput
                style={styles.TextInput}
                placeholder="username"
                placeholderTextColor="#689689"
                onChangeText={(username) => setUsername(username)}
            />
        </View>
    );
}

function EmailInput() {
    const [email, setEmail] = useState("");
    return (
        <View style={styles.InputStyling}>
            <TextInput
                style={styles.TextInput}
                placeholder="email"
                placeholderTextColor="#689689"
                onChangeText={(email) => setEmail(email)}
            />
        </View>
    );
}

function PasswordInput() {
    const [password, setPassword] = useState("");
    return (
        <View style={styles.InputStyling}>
            <TextInput
                style={styles.TextInput}
                placeholder="password"
                placeholderTextColor="#689689"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
        </View>
    );
}

function ConfirmPasswordInput() {
    const [confirmpassword, setConfirmPassword] = useState("");
    return (
        <View style={styles.InputStyling}>
            <TextInput
                style={styles.TextInput}
                placeholder="confirm password"
                placeholderTextColor="#689689"
                secureTextEntry={true}
                onChangeText={(confirmpassword) => setConfirmPassword(confirmpassword)}
            />
        </View>
    );
}

function SignupButton() {
    return (
        <TouchableOpacity
            style={styles.SignupButtonStyling}
            onPress={() => SignupHandler}>
            <Text style={styles.SignupButtonTextStyling}>sign up</Text>
        </TouchableOpacity>
    );
}

function BackButton() {
    return (
        <TouchableOpacity
            style={styles.BackButtonStyling}
            onPress={() => BackHandler}>
            <Text style={styles.BackButtonTextStyling}>back</Text>
        </TouchableOpacity>
    );
}

function setUsername() {
    return;
}

function setEmail() {
    return;
}

function setPassword() {
    return;
}

function setConfirmPassword() {
    return;
}

function SignupHandler() {
    return;
}

function BackHandler() {
    return;
}


const styles = StyleSheet.create({
    ImageContainer: {
        backgroundColor: theme['color-background'],
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      InputContainer: {
        backgroundColor: theme['color-background'],
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      ButtonContainer: {
        backgroundColor: theme['color-background'],
        width: '100%',
        alignItems: 'center',
        height: '30%',
      },
      InputStyling: {
        backgroundColor: theme['color-button-fill-white'],
        borderRadius: 40,
        width: "70%",
        height: 50,
        marginBottom: 20,
        alignItems: "center",
      },
      TextInput: {
        height: 45,
        flex: 1,
        padding: 10,
        color: theme['color-button-fill-blue'],
        borderColor: theme['color-button-fill-blue'],
        borderWidth: 2,
        borderRadius: 20,
        width: "100%",
      },
      SignupButtonStyling: {
        marginBottom: 20,
        padding: 20,
        width: "30%",
        backgroundColor: theme['color-button-fill-blue'],
        borderRadius: 50,
      },
      BackButtonStyling: {
        padding: 20,
        width: "30%",
        backgroundColor: theme['color-button-fill-white'],
        borderColor: theme['color-button-fill-blue'],
        borderWidth: 2,
        borderRadius: 50,
      },
      SignupButtonTextStyling: {
        textAlign: "center",
      },
      BackButtonTextStyling: {
        textAlign: "center",
        color: theme['color-button-fill-blue']
      },
});