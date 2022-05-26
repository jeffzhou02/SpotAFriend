import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";

import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackgroundBase,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

import { Text, View } from "../components/Themed";
import Navigation from "../navigation";

import { default as theme } from "../theme.json";
import { RootStackScreenProps } from "../types";

export default function PostScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  return (
    <View>
      <View style={styles.buttonContainer}>
        <CancelButton {...navigation} />
        <PostButton {...navigation} />
      </View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={{ height: 300 }}
      />
    </View>
  );
}

function getPicture() {
  return "../assets/images/icon.png";
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

function getGroups() {
  let fruits = [
    { label: "Apple", value: "🍎" },
    { label: "Banana", value: "🍌" },
    { label: "Orange", value: "🍊" },
  ];
  return fruits;
}

function GroupSelection() {
  let groups = getGroups();
  <Select
    name="Group"
    options={getGroups()}
    className="basic-single"
    classNamePrefix="select"
  />;
}

function PostButton(props: any) {
  return (
    <TouchableOpacity
      style={styles.PostButtonStyling}
      onPress={() => PostHandler(props)}
    >
      <Text style={styles.PostButtonTextStyling}>post</Text>
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
  props.navigate("Root", { screen: "Camera" });
  return;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "15%",
    backgroundColor: "transparent",
    marginHorizontal: "5%",
  },
  PostButtonStyling: {
    padding: 20,
    width: "30%",
    backgroundColor: theme["color-button-fill-white"],
    borderColor: theme["color-button-fill-blue"],
    borderWidth: 2,
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
    color: theme["color-button-fill-blue"],
  },
  CancelButtonTextStyling: {
    textAlign: "center",
    color: theme["color-button-fill-blue"],
  },
});
