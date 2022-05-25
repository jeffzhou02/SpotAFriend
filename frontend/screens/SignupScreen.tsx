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

const API_URL =
  Platform.OS === "ios" || Platform.OS === "web"
    ? "http://localhost:5000"
    : "http://10.0.2.2:5000";

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

function onLoggedIn(token: any) {
  fetch(`${API_URL}/private`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      try {
        const jsonRes = await res.json();
        if (res.status === 200) {
          // setMessage(jsonRes.message);
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("finished logging in");
}

async function SignupHandler(props: any) {
  console.log("Sign up handler");
  // const [isError, setIsError] = useState(false);
  const username = props.username;
  const email = props.email;
  const password = props.password;
  const confirmpassword = props.confirmpassword;
  const profile = {
    username,
    email,
    password,
    confirmpassword,
  };
  try {
    console.log("About to call fetch");
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    console.log("Fetch.then");
    try {
      const jsonRes = await res.json();
      if (res.status !== 200) {
        // setIsError(true);
        console.log("there was an error");
        console.log(jsonRes.message);
        // setMessage(jsonRes.message);
      } else {
        console.log("should log in");
        // onLoggedIn(jsonRes.token);
        // setIsError(false);
        // setMessage(jsonRes.message);
      }
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  } catch (error) {
    console.log("LMAO FETCH DIDNT WRRK");
  }

  console.log(props.username);
  console.log(props.email);
  console.log(props.password);
  console.log(props.confirmpassword);
  props.navigate("Root", { screen: "Home" });
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
