import React, { useState, } from "react";
import Select from 'react-select'
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
      <View>
      </View>
      <View>
      </View>
      <View style={styles.ButtonContainer}>
        <PostButton {...navigation} />
        <CancelButton {...navigation} />
      </View>
    </View>
  );
}

function getPicture(){
  return "../assets/images/icon.png";
}

function Picture() {
  return (
    <Image
      style={{
        resizeMode: "contain", // change size later
        height: 100,
        width: 200,
        marginTop: 50,
      }}
      source={require("../assets/images/icon.png")}
    />
  );
}

function getGroups(){
  let fruits = [
    { label: "Apple", value: "🍎" }, // make a legit way to get groups
    { label: "Banana", value: "🍌" },
    { label: "Orange", value: "🍊" }
  ]
  return fruits;
}

function GroupSelection(){ // hopefully this works
  let groups = getGroups();
  <Select
    name="Group"
    options={getGroups()}
    className="basic-single"
    classNamePrefix="select"
  />
}

function PostButton(props: any) {
  return (
    <TouchableOpacity
      style={styles.PostButtonStyling}
      onPress={() => PostHandler(props)}
    >
      <Text style={styles.PostButtonTextStyling}>log in</Text>
    </TouchableOpacity>
  );
}

function CancelButton(props: any) {
  return (
    <TouchableOpacity
      style={styles.CancelButtonStyling}
      onPress={() => CancelHandler(props)}
    >
      <Text style={styles.CancelButtonTextStyling}>cancel</Text>
    </TouchableOpacity>
  );
}

function PostHandler(props: any) {
  props.navigate("Root", { screen: "Home" });
  return;
}

function CancelHandler(props: any) {
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
  TagContainer: {
    backgroundColor: theme["color-background"],
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  GroupContainer: {
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
