import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import { Text, View } from "../components/Themed";

import { default as theme } from "../theme.json";

import { RootStackScreenProps } from "../types";

export default function LandingScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  return (
    <View style={styles.container}>
      <Splash></Splash>
      <View style={styles.bottomHalf}>
        <View style={styles.row}>
          <View
            style={{
              flex: 1,
              padding: 5,
              paddingRight: 20,
              backgroundColor: "transparent",
            }}
          >
            <SignUpButton
              handler={() => {
                navigation.navigate("Signup");
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              padding: 5,
              paddingLeft: 20,
              backgroundColor: "transparent",
            }}
          >
            <LogInButton
              handler={() => {
                navigation.navigate("Login");
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function Logo() {
  return (
    <Image
      source={require("../assets/images/icon.png")}
      style={{ width: "30%" }}
      resizeMode="contain"
    ></Image>
  );
}

function Splash() {
  return (
    <View
      style={{
        width: "100%",
        height: "80%",
        backgroundColor: "#E3DAC9",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo></Logo>
    </View>
  );
}

function SignUpButton(props: any) {
  return (
    <TouchableOpacity style={styles.signUpButtonStyle} onPress={props.handler}>
      <Text
        style={{ color: "#FFFFFF", fontWeight: "bold", fontStyle: "italic" }}
      >
        sign up
      </Text>
    </TouchableOpacity>
  );
}

function LogInButton(props: any) {
  return (
    <TouchableOpacity style={styles.loginButtonStyle} onPress={props.handler}>
      <Text
        style={{ color: "#689689", fontWeight: "bold", fontStyle: "italic" }}
      >
        log in
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3DAC9",
  },
  bottomHalf: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
  },
  row: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "transparent",
  },
  signUpButtonStyle: {
    padding: 20,
    alignItems: "center",
    backgroundColor: theme["color-button-fill-blue"],
    borderRadius: 50,
  },
  loginButtonStyle: {
    padding: 18,
    alignItems: "center",
    backgroundColor: theme["color-button-fill-white"],
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme["color-button-fill-blue"],
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
