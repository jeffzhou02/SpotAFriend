import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text, View } from "../components/Themed";
import Navigation from "../navigation";

import { default as theme } from "../theme.json";
import { RootStackScreenProps } from "../types";

export default function PostScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  return (
    <View>
      <View style={styles.ImageContainer}>
        <Picture />
      </View>
      <View style={styles.InputContainer}>
        <CaptionInput />
      </View>
      <View style={styles.ButtonContainer}>
        <PostButton {...navigation} />
        <CancelButton {...navigation} />
      </View>
    </View>
  );
}

function Picture() {
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

function CaptionInput() {
  const [caption, setCaption] = useState("");
  return (
    <View style={styles.InputStyling}>
      <TextInput
        style={styles.TextInput}
        placeholder="Caption"
        placeholderTextColor="#689689"
        onChangeText={(caption) => setCaption(caption)}
      />
    </View>
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
      <Text style={styles.CancelButtonTextStyling}>cancel</Text>
    </TouchableOpacity>
  );
}

function PostHandler(props) {
  props.navigate("Root", { screen: "Home" });
  return;
}

function CancelHandler(props) {
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
  PostButtonStyling: {
    marginBottom: 20,
    padding: 20,
    width: "30%",
    backgroundColor: theme["color-button-fill-blue"],
    borderRadius: 50,
  },
  CancelButtonStyling: {
    padding: 20,
    width: "30%",
    backgroundColor: theme["color-button-fill-white"],
    borderColor: theme["color-button-fill-blue"],
    borderWidth: 2,
    borderRadius: 50,
  },
  PostButtonTextStyling: {
    textAlign: "center",
  },
  CancelButtonTextStyling: {
    textAlign: "center",
    color: theme["color-button-fill-blue"],
  },
});
