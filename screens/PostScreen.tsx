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

export default function PostScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  return (
  );
}

function Picture(props) {
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

function PostButton(props) {
  return (
    <TouchableOpacity
      style={styles.PostButtonStyling}
      onPress={() => PostHandler(props)}
    >
      <Text style={styles.PostButtonTextStyling}>log in</Text>
    </TouchableOpacity>
  );
}

function CancelButton(props) {
  return (
    <TouchableOpacity
      style={styles.CancelButtonStyling}
      onPress={() => CancelHandler(props)}
    >
      <Text style={styles.CancelButtonTextStyling}>log in</Text>
    </TouchableOpacity>
  );
}

function PostHandler(props) {
  props.navigate("Root", { screen: "Home" });
  return;
}

function CancelHandler(props) {
  props.navigate("Root", { screen: "Home" });
  return;
}

const styles = StyleSheet.create({
  PostButtonStyling: {
    marginBottom: 20,
    padding: 20,
    width: "30%",
    backgroundColor: theme["color-button-fill-blue"],
    borderRadius: 50,
  },
  PostButtonTextStyling: {
    textAlign: "center",
  },
  CancelButtonStyling: {
    padding: 20,
    width: "30%",
    backgroundColor: theme["color-button-fill-white"],
    borderColor: theme["color-button-fill-blue"],
    borderWidth: 2,
    borderRadius: 50,
  },
  CancelButtonTextStyling: {
    textAlign: "center",
    color: theme["color-button-fill-blue"],
  },
});
