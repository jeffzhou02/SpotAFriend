import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";

import React, { ReactNode, useEffect, useState } from "react";

import {
  AddUserGroup,
  GetGroupMembers,
  AddNewGroup,
  GetGroupMembers1,
  GetUserPFP,
} from "../firebase/library";
import { useContext } from "react";
import { UserContext } from "../components/UserContext.js";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { faker } from "@faker-js/faker";

import {
  set,
  update,
  ref,
  get,
  child,
  remove,
  push,
  onValue,
} from "firebase/database";
import { db } from "../firebase/index.js";

interface Group {
  members: string[];
  person1: string;
  person2: string;
  person3: string;
  targetpfp: string;
  pfp2: string;
  pfp3: string;
  pic: string;
  group: string;
}

function PopulateArray(user, groupData: Group[]) {
  // Get groups
  var groupArray = user.groups;
  for (const groupname of groupArray) {
    // Get members
    var [array, setArray] = useState([""]);
    var func = async () => {
      const promise = await GetGroupMembers(groupname);
      const value = promise;
      setArray(value);
    };
    useEffect(() => {
      func();
    }, []);

    const tempGroup: Group = {
      members: array,
      person1: array[0],
      person2: array[1],
      person3: array[2],
      targetpfp: faker.image.avatar(),
      pfp2: faker.image.avatar(),
      pfp3: faker.image.avatar(),
      pic: faker.image.imageUrl(),
      group: groupname,
    };
    groupData.push(tempGroup);
  }
}

const GroupCard = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const GROUPNAME = props.group;
  const members = props.members;
  const target = members[Math.floor(Math.random()*members.length)];
  let imageURL = "";
  const userRef = ref(db, "users/" + target);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data.profilePhotoRef) {
      imageURL = data.profilePhotoRef;
    }
  });
  return (
    <View style={{ backgroundColor: "transparent" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("The selected group is closed");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.openCard}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{GROUPNAME}</Text>
            <View style={styles.tags2}>
              <Text style={styles.tagsText}>target not spotted</Text>
            </View>
            <Image style={styles.targetImage} source={{ uri: imageURL }} />
            <View style={{ backgroundColor: "transparent" }}>
              <Text style={styles.modalText}>
                today's target: {target}
              </Text>
              <Text style={styles.names}>
                all members: {props.person1}, {props.person2}, {props.person3}
              </Text>
            </View>

            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.dismiss}>dismiss</Text>
            </Pressable>
          </View>
        </View>
        {/* button below */}
      </Modal>
      <View style={styles.box}>
        <Pressable
          style={styles.groupOpen}
          onPress={() => setModalVisible(true)}
        >
          <Image style={styles.groupImage} source={{ uri: props.pic }} />
          <View
            style={{
              margin: "5%",
              backgroundColor: "transparent",
            }}
          >
            <Text style={styles.textStyle}>{GROUPNAME}</Text>
            <Text
              style={{
                color: "#fff",
                fontStyle: "italic",
                marginTop: "5%",
                fontSize: 15,
              }}
            >
              {props.person1}, {props.person2}, {props.person3}
            </Text>
            <View style={styles.tags}>
              <Text style={styles.tagsText}>target not spotted</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

function AddGroup(props: any) {
  return (
    <TouchableOpacity
      style={styles.addgroup}
      onPress={() => AddGroupHandler(props)}
    >
      <Image
        style={{
          resizeMode: "contain",
          height: 25,
          width: 25,
          alignSelf: "center",
        }}
        source={require("../assets/images/groups.png")}
      />
    </TouchableOpacity>
  );
}

function AddGroupHandler(props: any) {
  props.navigate("AddGroup");
  return;
}

function Logo() {
  return (
    <Image
      style={{
        resizeMode: "contain",
        height: 40,
        width: 40,
        marginTop: 50,
      }}
      source={require("../assets/images/icon.png")}
    />
  );
}

export default function GroupScreen({
  navigation,
}: RootTabScreenProps<"Group">) {
  const { user } = useContext(UserContext);

  const groupData: Group[] = [];
  PopulateArray(user, groupData);

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
        <Logo></Logo>
        <AddGroup {...navigation} />
      </View>

      <ScrollView
        style={{
          width: "90%",
          backgroundColor: "#E3DAC9",
          marginTop: "10%",
        }}
      >
        {groupData.map((arrayItem) => {
          return (
            <GroupCard
              members={arrayItem.members}
              person1={arrayItem.person1}
              person2={arrayItem.person2}
              person3={arrayItem.person3}
              targetpfp={arrayItem.targetpfp}
              pic={arrayItem.pic}
              group={arrayItem.group}
            />
          );
        })}
      </ScrollView>
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
    paddingLeft: "5%",
    paddingRight: "30%",
    paddingVertical: "5%",
  },
  groupOpen: {
    width: "100%",
    flexDirection: "row",
  },
  openCard: {
    height: "60%",
    width: "90%",
    marginTop: "30%",
    alignSelf: "center",
    backgroundColor: "#00AFB5",
    borderRadius: 30,
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
  },
  modalText: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#fff",
  },
  names: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#fff",
    marginTop: "10%",
  },
  dismiss: {
    fontSize: 16,
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "#fff",
    marginTop: "40%",
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
  tags: {
    borderWidth: 1,
    borderColor: "#BF0603",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: "5%",
    paddingVertical: 1,
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: 20,
    marginBottom: 5,
    width: 140,
  },
  tags2: {
    borderWidth: 2,
    borderColor: "#BF0603",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: "2%",
    paddingVertical: 1,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 5,
    width: 150,
  },
  tagsText: {
    fontStyle: "italic",
    color: "#BF0603",
  },
});
