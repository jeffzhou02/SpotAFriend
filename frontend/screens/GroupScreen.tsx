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

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { faker } from "@faker-js/faker";

const groupData = new Array(10).fill(0).map((i) => {
  return {
    person1: faker.name.firstName(),
    person2: faker.name.firstName(),
    person3: faker.name.firstName(),
    pfp1: faker.image.avatar(),
    pfp2: faker.image.avatar(),
    pfp3: faker.image.avatar(),
    pic: faker.image.imageUrl(),
    group: faker.animal.type(),
    adj: faker.word.adjective(),
  };
});

const GroupCard = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const GROUPNAME = "the " + props.adj + " " + props.group + "s";
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
            <Image style={styles.targetImage} source={{ uri: props.pfp1 }} />
            <View style={{ backgroundColor: "transparent" }}>
              <Text style={styles.modalText}>
                today's target: {props.person1}
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
  props.navigate("Settings");
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
        {groupData.map((note: any) => {
          return (
            <GroupCard
              person1={note.person1}
              person2={note.person2}
              person3={note.person3}
              pfp1={note.pfp1}
              pic={note.pic}
              group={note.group}
              adj={note.adj}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: 30,
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
    marginTop: "80%",
  },
  modalContainer: {
    backgroundColor: "transparent",
    margin: "5%",
    height: "auto",
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
