import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import React, { ReactNode, useEffect, useState } from "react";
import { default as theme } from "../theme.json";

import { Text, useThemeColor, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { faker } from "@faker-js/faker";
import { useLinkProps } from "@react-navigation/native";

function Back(props: any) {
  return (
    <TouchableOpacity onPress={() => BackHandler(props)}>
      <Image
        style={{
          resizeMode: "contain",
          height: 40,
          width: 40,
        }}
        source={require("../assets/images/icon.png")}
      />
    </TouchableOpacity>
  );
}

function BackHandler(props: any) {
  props.navigate("Group");
  return;
}

function getPeople() {
  let fruits = [
    { label: "brian", value: "brian" }, // uh users go hereloloplol
    { label: "net", value: "net" },
    { label: "jef", value: "jef" },
    { label: "jenny", value: "jenny" },
    { label: "daniel", value: "daniel" },
    { label: "brad", value: "brad" },
    { label: "chad", value: "chad" },
    { label: "paul", value: "paul" },
  ];
  return fruits;
}

function PeoplePicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(getPeople());
  return (
    <DropDownPicker
      multiple={true}
      min={0}
      max={10}
      dropDownDirection="BOTTOM"
      placeholder="select your members"
      badgeColors={"#689689"}
      listItemLabelStyle={{
        color: "#689689",
      }}
      selectedItemLabelStyle={{
        color: "#689689",
      }}
      dropDownContainerStyle={{
        borderColor: "#689689",
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: theme["color-button-fill-white"],
      }}
      placeholderStyle={{
        color: "#689689",
      }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={{
        borderRadius: 15,
        borderColor: "#689689",
        borderWidth: 2,
        backgroundColor: theme["color-button-fill-white"],
      }}
    />
  );
}

export default function AddGroupScreen({
  navigation,

}: RootTabScreenProps<"Home">) {

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 55,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: "10%",
          paddingHorizontal: 15,
          width: "90%",
          backgroundColor: "transparent",
        }}
      >
        <Back {...navigation} />
      </View>
      <View style={styles.container}>
        <View style={{ height: "30%" }}></View>
        <Text style={styles.textStyle}>add group</Text>
        <View style={styles.searchbar}>
          <TextInput
            placeholderTextColor={"#689689"}
            placeholder="group name"
            keyboardType="default"
          />
        </View>
        <View style={styles.GroupContainer}>
          <View style={{ height: "5%" }}></View>
          <PeoplePicker />
          <View style={{ height: "40%" }}></View>
          <View style={styles.box2}>
            <TouchableOpacity>
              <Text style={styles.textStyle}>create group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3DAC9",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3DAC9",
  },
  box: {
    backgroundColor: "#F4D58D",
    borderColor: "#689689",
    borderWidth: 2,
    borderRadius: 30,
    marginBottom: "5%",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    marginHorizontal: "5%",
  },
  box2: {
    backgroundColor: "#F4D58D",
    borderColor: "#689689",
    borderWidth: 2,
    borderRadius: 17,
    marginBottom: "5%",
    paddingHorizontal: "2%",
    paddingVertical: "2%",
    marginHorizontal: "2%",
    alignItems: "center",
    width: 330,
    alignSelf: "center",
  },
  GroupContainer: {
    backgroundColor: theme["color-background"],
    width: 330,
    height: "100%",
  },
  buttonClose: {
    backgroundColor: "transparent",
    height: "auto",
  },
  textStyle: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#689689",
    backgroundColor: "transparent",
  },
  names: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#689689",
    marginTop: "5%",
  },
  names2: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#fff",
    marginTop: "5%",
  },
  dismiss: {
    fontSize: 16,
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "#fff",
    marginTop: "4%",
  },
  modalContainer: {
    backgroundColor: "transparent",
    margin: "5%",
    height: 400,
    alignItems: "center",
  },
  addgroup: {
    backgroundColor: "#BF0603",
    height: 40,
    width: 40,
    borderRadius: 15,
    justifyContent: "center",
  },
  groupImage: {
    alignSelf: "center",
    height: 100,
    width: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#689689",
  },
  targetImage: {
    alignSelf: "center",
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#BF0603",
    margin: "5%",
  },
  searchbar: {
    backgroundColor: theme["color-button-fill-white"],
    borderWidth: 2,
    borderColor: "#689689",
    borderRadius: 15,
    width: 330,
    height: 45,
    alignContent: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  pfp: {
    alignSelf: "center",
    height: 180,
    width: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#689689",
    marginBottom: "5%",
  },
});
