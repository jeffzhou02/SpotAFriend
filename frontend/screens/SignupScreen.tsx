import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Text, View } from "../components/Themed";

import { default as theme } from "../theme.json";
import { RootStackScreenProps } from "../types";

import { collection, addDoc, doc, getFirestore } from "firebase/firestore"; 
import { ref, set } from "firebase/database";
import { db } from "../fb/index.js";


export default function SignupScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  return (
    <View>
      <View style={styles.ImageContainer}>
        <Logo />
      </View>
      <View style={styles.InputContainer}>
        <View style={styles.InputStyling}>
          <TextInput
            style={styles.TextInput}
            placeholder="username"
            placeholderTextColor="#689689"
            onChangeText={(username) => setUsername(username)}
          />
        </View>
        <View style={styles.InputStyling}>
          <TextInput
            style={styles.TextInput}
            placeholder="email"
            placeholderTextColor="#689689"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.InputStyling}>
          <TextInput
            style={styles.TextInput}
            placeholder="password"
            placeholderTextColor="#689689"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View style={styles.InputStyling}>
          <TextInput
            style={styles.TextInput}
            placeholder="confirm password"
            placeholderTextColor="#689689"
            secureTextEntry={true}
            onChangeText={(confirmpassword) =>
              setConfirmPassword(confirmpassword)
            }
          />
        </View>
      </View>
      <View style={styles.ButtonContainer}>
        <SignupButton
          {...navigation}
          username={username}
          email={email}
          password={password}
          confirmpassword={confirmpassword}
        />
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

function SignupButton(props: any) {
  return (
    <TouchableOpacity
      style={styles.SignupButtonStyling}
      onPress={() => SignupHandler(props)}
    >
      <Text style={styles.SignupButtonTextStyling}>sign up</Text>
    </TouchableOpacity>
  );
}

function BackButton(props: { navigate: (arg0: string) => void }) {
  return (
    <TouchableOpacity
      style={styles.BackButtonStyling}
      onPress={() => BackHandler(props)}
    >
      <Text style={styles.BackButtonTextStyling}>back</Text>
    </TouchableOpacity>
  );
}

async function SignupHandler(props: any) {
  console.log("Sign up handler");
  const username = props.username;
  const email = props.email;
  const password = props.password;
  const confirmpassword = props.confirmpassword;
  try {
    set(ref(db, 'users/' + username), {
      username: username,
      email: email,
      password: password,
      confirmpassword: confirmpassword
    });
    console.log("Successfully added to database with userID: ", username);
    props.navigate("Root", { screen: "Home" });
  } catch (e) {
    console.error("Error adding to database: ", e);
  }
  return;
}


function BackHandler(props: { navigate: (arg0: string) => void }) {
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
  SignupButtonStyling: {
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
  SignupButtonTextStyling: {
    textAlign: "center",
  },
  BackButtonTextStyling: {
    textAlign: "center",
    color: theme["color-button-fill-blue"],
  },
});
