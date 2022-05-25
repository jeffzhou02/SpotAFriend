import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Text, View } from "../components/Themed";
import Navigation from "../navigation";

import { default as theme } from "../theme.json";
import { RootStackScreenProps } from "../types";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  return (
    <View style={{ backgroundColor: theme["color-background"] }}>
      <View style={styles.ImageContainer}>
        <Logo />
      </View>
      <View style={styles.InputContainer}>
        <UsernameInput />
        <PasswordInput />
      </View>
      <View style={styles.ButtonContainer}>
        <LoginButton {...navigation} />
        <BackButton {...navigation} />
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
        marginTop: 50,
      }}
      source={require("../assets/images/icon.png")}
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

function LoginButton(props: any) {
  return (
    <TouchableOpacity
      style={styles.LoginButtonStyling}
      onPress={() => LoginHandler(props)}
    >
      <Text style={styles.LoginButtonTextStyling}>log in</Text>
    </TouchableOpacity>
  );
}

function BackButton(props: any) {
  return (
    <TouchableOpacity
      style={styles.BackButtonStyling}
      onPress={() => BackHandler(props)}
    >
      <Text style={styles.BackButtonTextStyling}>back</Text>
    </TouchableOpacity>
  );
}

function setUsername() {
  return;
}

function setPassword() {
  return;
}

function LoginHandler(props: any) {
  props.navigate("Root", { screen: "Home" });
  return;
}

function BackHandler(props: any) {
  props.navigate("Landing");
  return;
}

const styles = StyleSheet.create({
  ImageContainer: {
    backgroundColor: theme["color-background"],
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  InputContainer: {
    backgroundColor: theme["color-background"],
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonContainer: {
    backgroundColor: theme["color-background"],
    width: "100%",
    alignItems: "center",
    height: "30%",
  },
  InputStyling: {
    backgroundColor: theme["color-button-fill-white"],
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
    color: theme["color-button-fill-blue"],
    borderColor: theme["color-button-fill-blue"],
    borderWidth: 2,
    borderRadius: 20,
    width: "100%",
  },
  LoginButtonStyling: {
    marginBottom: 20,
    padding: 20,
    width: "30%",
    backgroundColor: theme["color-button-fill-blue"],
    borderRadius: 50,
  },
  BackButtonStyling: {
    padding: 20,
    width: "30%",
    backgroundColor: theme["color-button-fill-white"],
    borderColor: theme["color-button-fill-blue"],
    borderWidth: 2,
    borderRadius: 50,
  },
  LoginButtonTextStyling: {
    textAlign: "center",
    color: "white",
  },
  BackButtonTextStyling: {
    textAlign: "center",
    color: theme["color-button-fill-blue"],
  },
});
