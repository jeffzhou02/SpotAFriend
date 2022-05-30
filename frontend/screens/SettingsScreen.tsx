import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
} from "react-native";

import React, { ReactNode, useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { faker } from "@faker-js/faker";

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
  props.navigate("Home");
  return;
}

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
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
        <View style={styles.box}>
          <Text style={styles.textStyle}>about</Text>
          <Text style={styles.names}>
            spot-a-friend is an app designed to emphasize our authentic nature
            in social relationships. to use our app, make sure to be in close
            proximity with your friends to be able to spot them in their natural
            environments. we are currently in beta and will be updated as we go.
            if you have any questions or feedback, please contact us at
            555-555-5555. we are always looking to improve the app and make it
            better.
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.textStyle}>help</Text>
          <Text style={styles.names}>
            our app is extremely user friendly and simple to use. if you need
            help, then you probably have never touched social media in your
            entire life. all you have to do is open the camera in the middle of
            the navigation bar and snap a picture of your target for the day.
            that's literally it. thanks for reading.
          </Text>
        </View>
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
              <View style={{ backgroundColor: "transparent" }}>
                <Text style={styles.names2}>
                  your notifications are now turned off
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
        </Modal>
        <View style={styles.box}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>turn off notifications</Text>
          </Pressable>
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
  openCard: {
    height: "15%",
    width: "90%",
    marginTop: "10%",
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
    marginTop: "10%",
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
