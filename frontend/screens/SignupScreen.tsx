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

import { collection, addDoc, doc } from "firebase/firestore"; 
import db  from "../fb/config.js";

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

// function onLoggedIn(token: any) {
//   fetch(`${API_URL}/private`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(async (res) => {
//       try {
//         const jsonRes = await res.json();
//         if (res.status === 200) {
//           console.log(jsonRes);
//           //setMessage(jsonRes.message);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   console.log("finished logging in");
// }

async function SignupHandler(props: any) {
  console.log("Sign up handler");
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
  // console.log(db);
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: username,
      email: email,
      password: password,
      confirmpassword: confirmpassword
    });
    console.log("Document written with ID: ", docRef.id);
    props.navigate("Root", { screen: "Home" });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  // console.log("About to post");
  // console.log(profile);
  // console.log(API_URL);
  // const res = await axios({
  //   method: 'post',
  //   url: "https://improvedspotafriend.wl.r.appspot.com/signup",
  //   data: profile,
  //   headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': true },
  // });
  // if (res?.data?.success) {
  //   props.navigate("Root", { screen: "Home" });
  // }
  // // .post(
  // //   "https://improvedspotafriend.wl.r.appspot.com/signup", profile
  // // );
  // console.log("sent post request");
  // console.log(res);

  // try {
    // const res = await axios.post( 
    //   `${API_URL}/signup`, profile
    // );
    // const promise = axios.post( 
    //   `${API_URL}/signup`, profile
    // );
    // promise.then((res) => {
    //   console.log(res)
    // }).catch( () => { console.log("error") })

  //   console.log(res);
    // if (res?.data?.success) {
    //   props.navigate("Root", { screen: "Home" });
    // }
  // } catch (error) {
  //   console.log(error);
  // }
  

  // const res = await fetch(`${API_URL}/signup`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(profile),
  // });
  // console.log("About to try");
  // try {
  //   const jsonRes = await res.json();
  //   if (res.status !== 200) {
  //     console.log(jsonRes.message);
  //     //setMessage(jsonRes.message);
  //   } else {
  //     onLoggedIn(jsonRes.token);
  //     props.navigate("Root", { screen: "Home" });
  //     //setMessage(jsonRes.message);
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
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
