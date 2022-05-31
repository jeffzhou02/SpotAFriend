import React, { useState, useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { Text, View } from "../components/Themed";
import { UserContext } from "../components/UserContext";

import { default as theme } from "../theme.json";
import { RootStackScreenProps } from "../types";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/index";
import {
  getDatabase,
  onValue,
  ref as dbref,
  set,
  update,
} from "firebase/database";

export default function PostScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  const storage = getStorage();

  const gsReference = ref(storage, "/dailyphotos/Jeff.jpg");
  const [image, setImage] = useState("");
  const { user } = useContext(UserContext);
  const username = user.username;
  let imageURL = "";
  const userRef = dbref(db, "users/" + username);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data.profilePhotoRef) {
      imageURL = data.profilePhotoRef;
    }
  });

  function Picture() {
    return (
      <Image style={{ height: 200, width: 200 }} source={{ uri: imageUrl }} />
    );
  }
  function PostButton() {
    return (
      <TouchableOpacity
        style={styles.PostButtonStyling}
        onPress={() => PostHandler()}
      >
        <Text style={styles.PostButtonTextStyling}>post</Text>
      </TouchableOpacity>
    );
  }

  function CancelButton() {
    return (
      <TouchableOpacity
        style={styles.CancelButtonStyling}
        onPress={() => CancelHandler()}
      >
        <Text style={styles.CancelButtonTextStyling}>cancel</Text>
      </TouchableOpacity>
    );
  }

  function CancelHandler() {
    navigation.navigate("Root", { screen: "Home" });
    return;
  }

  function PostHandler() {
    navigation.navigate("Root", { screen: "Home" });
    return;
  }
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

function getGroups() {
  let fruits = [
    { label: "Apple", value: "🍎" }, // make a legit way to get groups
    { label: "Banana", value: "🍌" },
    { label: "Orange", value: "🍊" },
  ];
  return fruits;
}

function GroupSelection() {
  // hopefully this works
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(getGroups());

  return (
    <DropDownPicker
      dropDownDirection="TOP"
      placeholder="choose a group"
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
  let tags = [
    { label: "friend", value: "🍎" }, // make a legit way to get groups
    { label: "enemy", value: "🍌" },
    { label: "acquaintance", value: "🍊" },
  ];
  return tags;
}

function TagSelection() {
  // hopefully this works
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(getTags());

  return (
    <DropDownPicker
      dropDownDirection="TOP"
      multiple={true}
      placeholder="choose your tags"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
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
  TagContainer: {
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
