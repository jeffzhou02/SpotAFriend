import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
} from "react-native";
import { Text, View } from "../components/Themed";
import Navigation from "../navigation";

import { default as theme } from "../theme.json";
import { RootStackScreenProps } from "../types";
import { UserContext } from '../components/UserContext';

import { ref, onValue } from "firebase/database";
import { db } from "../firebase/index.js";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext); // using context to set the user globally (pass in the entire user)

  const update = (data: any) => {
    setErrorMessage(data);
  }
  const updateUser = (data: any) => {
    setUser(data);
  }

  return (
    <View style={{ backgroundColor: theme["color-background"] }}>
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
            placeholder="password"
            placeholderTextColor="#689689"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <ErrorMessage message={errorMessage}/>
      </View>
      <View style={styles.ButtonContainer}>
        <LoginButton
          {...navigation}
          username={username}
          password={password}
          func={update}
          updateUser={updateUser}
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

function ErrorMessage(props: any) {
  return (
    props.message === undefined ? null :
      <View style={styles.ErrorMessageContainer}>
        <Text style={styles.ErrorMessage}>{props.message}</Text>
      </View>
  )
}

function LoginHandler(props: any) {
  const username = props.username;
  const password = props.password;
  try {
    const userRef = ref(db, 'users/' + username);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) { // no user exists 
        props.func("there is no account for that user yet");
      }
      else if (data.password === password) { // successful login
        props.updateUser(data);
        props.navigate("Root", { screen: "Home" }); // still need to pass in username and password useContext
      } else { // password incorrect
        props.func("incorrect password");
      }
    });
  } catch (e) {
    console.error("Error retrieving info from db: ", e);
  }

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
  ErrorMessageContainer: {
    backgroundColor: theme["color-background"],
    width: "70%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  ErrorMessage: {
    color: theme["error-message"],
    width: "100%",
    textAlign: "center",
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
