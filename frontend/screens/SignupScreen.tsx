import React, { useState, useContext } from "react";
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

import { ref, set, onValue } from "firebase/database";
import { db } from "../firebase/index.js";

import { UserContext } from "../components/UserContext";


export default function SignupScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext); // using context to set the user globally (pass in the entire user)

  const update = (data: any) => {
    setErrorMessage(data);
  }
  const updateUser = (data: any) => {
    setUser(data);
  }
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
        <ErrorMessage message={errorMessage} />
      </View>
      <View style={styles.ButtonContainer}>
        <SignupButton
          {...navigation}
          username={username}
          email={email}
          password={password}
          confirmpassword={confirmpassword}
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

function ErrorMessage(props: any) {
  return (
    props.message === undefined ? null :
      <View style={styles.ErrorMessageContainer}>
        <Text style={styles.ErrorMessage}>{props.message}</Text>
      </View>
  )
}

async function SignupHandler(props: any) {
  const username = props.username;
  const email = props.email;
  const password = props.password;
  const confirmpassword = props.confirmpassword;
  if (password != confirmpassword) {
    props.func("passwords do not match");
    return;
  }
  try {
    const userRef = ref(db, 'users/' + username);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {     // no user exists 
        set(ref(db, 'users/' + username), {
          username: username,
          email: email,
          password: password,
          confirmpassword: confirmpassword,
        });
        set(ref(db, 'users/' + username + "/groups"), {
          0: username + "sgroup",
        })
        set(ref(db, 'users/' + username + "/friends"), {
          0: "null",
        })
        set(ref(db, 'groups/' + username + "sgroup"), {
          0: username,
        });
        const newUser = ref(db, 'users/' + username);
        onValue(newUser, (snapshot) => {
          const data = snapshot.val();
          props.updateUser(data);
        });
        props.navigate("Root", { screen: "Home" });
      } else {        // user already exists
        props.func("user already exists with that username");
      }
    });

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
