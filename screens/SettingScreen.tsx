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

export default function SettingsScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  return (
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

function LogoutButton(props) {
  return (
    <TouchableOpacity
      style={styles.LogoutButtonStyling}
      onPress={() => LogoutHandler(props)}
    >
      <Text style={styles.LogoutButtonTextStyling}>log in</Text>
    </TouchableOpacity>
  );
}

function DeleteButton(props) {
  return (
    <TouchableOpacity
      style={styles.DeleteButtonStyling}
      onPress={() => DeleteHandler(props)}
    >
      <Text style={styles.DeleteButtonTextStyling}>log in</Text>
    </TouchableOpacity>
  );
}

function LogoutHandler(props) {
  props.navigate("Root", { screen: "Home" });
  return;
}

function DeleteHandler(props) {
  props.navigate("Root", { screen: "Home" });
  return;
}

const styles = StyleSheet.create({
  LogoutButtonStyling: {
    marginBottom: 20,
    padding: 20,
    width: "30%",
    backgroundColor: theme["color-button-fill-blue"],
    borderRadius: 50,
  },
  LogoutButtonTextStyling: {
    textAlign: "center",
  },
  DeleteButtonStyling: {
    padding: 20,
    width: "30%",
    backgroundColor: theme["color-button-fill-white"],
    borderColor: theme["color-button-fill-blue"],
    borderWidth: 2,
    borderRadius: 50,
  },
  DeleteButtonTextStyling: {
    textAlign: "center",
    color: theme["color-button-fill-blue"],
  },
});
