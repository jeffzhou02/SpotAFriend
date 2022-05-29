import React, { useState, } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
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
      <View style={styles.PictureContainer}>
        <Picture />
      </View> 
      <View style={styles.GroupContainer}>
        <GroupSelection />
      </View>
      <View style={styles.TagContainer}>
        <TagSelection />
      </View>
      <View style={styles.ButtonContainer}>
        <View style={styles.row}>
          <PostButton />
          <CancelButton />
        </View>
      </View>
    </View>
    
    
  );
  
}

/*
      <View style={styles.GroupAndTagContainer}>
        <View style={styles.row}>
          <GroupSelection />
          <TagSelection />
        </View>
      </View>
      <View style={styles.ButtonContainer}>
        <View style={styles.row}>
          <PostButton />
          <CancelButton />
        </View>
      </View>
*/

function getPicture() {
  return "../assets/images/icon.png";
}

function Picture() {
  return (
    <Image
      style={{
        resizeMode: "contain",
        height: "100%",
        width: "100%",
      }}
      source={require("../assets/images/icon.png")}
    />
  );
}

function getGroups() {
  let fruits = [
    { label: "Apple", value: "🍎" }, // make a legit way to get groups
    { label: "Banana", value: "🍌" },
    { label: "Orange", value: "🍊" }
  ]
  return fruits;
}

function GroupSelection() { // hopefully this works
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(getGroups());

  return (
    <DropDownPicker
      dropDownDirection="TOP"
      placeholder = "choose a group"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}

function getTags() {
  let fruits = [
    { label: "Apple", value: "🍎" }, // make a legit way to get groups
    { label: "Banana", value: "🍌" },
    { label: "Orange", value: "🍊" }
  ]
  return fruits;
}

function TagSelection() { // hopefully this works
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(getTags());

  return (
    <DropDownPicker
      dropDownDirection="TOP"
      multiple={true}
      placeholder = "choose your tags"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
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
  props.navigate("Landing");
  return;
}

const styles = StyleSheet.create({
  PictureContainer: {
    backgroundColor: theme["color-background"],
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  GroupContainer: {
    backgroundColor: theme["color-background"],
    width: "100%",
    height: "10%",
  },
  TagContainer:{
    backgroundColor: theme["color-background"],
    width: "100%",
    height: "10%",
  },
  ButtonContainer: {
    backgroundColor: theme["color-background"],
    width: "100%",
    height: "10%",
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
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
});
