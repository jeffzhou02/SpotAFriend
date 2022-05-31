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
  const groups = user.groups;

  console.log(groups);
  let imageURL = "";
  const userRef = dbref(db, "users/" + username);
  // onValue(userRef, (snapshot) => {
  //   const data = snapshot.val();
  //   if (data.profilePhotoRef) {
  //     imageURL = data.profilePhotoRef;
  //   }
  // });

  // function Picture() {
  //   return (
  //     <Image style={{ height: 200, width: 200 }} source={{ uri: imageUrl }} />
  //   );
  // }
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
      <View style={styles.PictureContainer}>{/* <Picture /> */}</View>
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
  const { user } = useContext(UserContext);
  const groups = user.groups;
  console.log(groups);

  let groupslist = [{ label: groups[0], value: "0" }];
  for (let i = 1; i < groups.length; i++) {
    var obj = { label: groups[i], value: i.toString() };
    groupslist.push(obj);
  }
  console.log(groupslist);
  return groupslist;
}

function GroupSelection() {
  // hopefully this works

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(getGroups());

  return (
    <DropDownPicker
      multiple={false}
      dropDownDirection="TOP"
      placeholder="select your group"
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

function getTags() {
  let tags = [
    { label: "friend", value: "1" },
    { label: "enemy", value: "2" },
    { label: "acquaintance", value: "3" },
  ];
  return tags;
}

function TagSelection() {
  // hopefully this works
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(getTags());

  return (
    <DropDownPicker
      multiple={true}
      min={0}
      max={10}
      dropDownDirection="TOP"
      placeholder="select your tags"
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

const styles = StyleSheet.create({
  PictureContainer: {
    backgroundColor: theme["color-background"],
    width: "100%",
    height: "65%",
    alignItems: "center",
    justifyContent: "center",
  },
  GroupContainer: {
    backgroundColor: theme["color-background"],
    width: "90%",
    height: "10%",
    alignSelf: "center",
  },
  TagContainer: {
    backgroundColor: theme["color-background"],
    width: "90%",
    height: "10%",
    alignSelf: "center",
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
