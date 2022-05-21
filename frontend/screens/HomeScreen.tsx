import { StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";

import React, { ReactNode, useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { faker } from "@faker-js/faker";

const postText = new Array(64).fill(0).map((i) => {
  return {
    person1: faker.name.firstName(),
    person2: faker.name.firstName(),
    tag1: faker.lorem.word(),
  };
});

const Card = (props: any) => {
  console.log(props);
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image
          style={styles.pfp}
          source={{
            uri: "https://media-exp1.licdn.com/dms/image/C5603AQGwFXFKntjWpQ/profile-displayphoto-shrink_800_800/0/1603152205934?e=1657756800&v=beta&t=V5o9xW9ARCCHRUto_eG11duhbT-asqy5I8hDyaAcAOM",
          }}
        />
        <View style={styles.captionBox}>
          <Text style={styles.postTitle}>
            <Text style={styles.postTitleName}>{props.person1} </Text>
            spotted
            <Text style={styles.postTitleName}> {props.person2}</Text>
          </Text>
        </View>
      </View>
      <Image
        style={styles.postImage}
        source={{
          uri: "https://thedublinshield.com/wp-content/uploads/2020/03/FullSizeRender-1.jpeg",
        }}
      />
      <View style={styles.tagsLikes}>
        <View style={styles.tagsContainer}>
          <View style={styles.tags}>
            <Text style={styles.tagsText}>sleeping</Text>
          </View>
          <View style={styles.tags}>
            <Text style={styles.tagsText}>coding</Text>
          </View>
        </View>
        <View style={styles.likesContainer}>
          <Text style={styles.postTitle}>♡</Text>
        </View>
      </View>
    </View>
  );
};

function SettingsButton(props: any) {
  return (
    <TouchableOpacity
      style={styles.settings}
      onPress={() => SettingsHandler(props)}
    >
      <Image
        style={{
          resizeMode: "contain",
          height: 30,
          width: 30,
          alignSelf: "center",
        }}
        source={require("../assets/images/settings.png")}
      />
    </TouchableOpacity>
  );
}

function SettingsHandler(props: any) {
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

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 55,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: "20%",
          paddingHorizontal: 15,
          width: "90%",
          backgroundColor: "transparent",
        }}
      >
        <Logo></Logo>
        <SettingsButton {...navigation} />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
        style={styles.body}
      >
        {postText.map((note: any) => {
          return (
            <Card
              person1={note.person1}
              person2={note.person2}
              pic={note.pic}
              description={note.description}
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
  postTitle: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#fff",
  },
  postTitleName: {
    fontWeight: "bold",
    color: "#fff",
  },
  body: {
    backgroundColor: "#083D77",
    width: "90%",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    marginTop: "10%",
    padding: "4%",
    paddingBottom: "100%",
  },
  post: {
    backgroundColor: "#00AFB5",
    width: "100%",
    borderRadius: 30,
    margin: "5%",
    height: "auto",
    alignItems: "center",
    paddingBottom: 20,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0)",
    width: "90%",
    marginTop: "5%",
  },
  pfp: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#fff",
  },
  captionBox: {
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0)",
    width: "75%",
  },
  postImage: {
    width: "90%",
    height: 300,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#F4D58D",
    marginTop: 15,
  },
  tagsLikes: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0)",
    width: "90%",
    paddingTop: 10,
    height: "auto",
  },
  tagsContainer: {
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "space-between",
  },
  tags: {
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: 20,
    marginBottom: 5,
  },
  tagsText: {
    fontStyle: "italic",
    color: "#fff",
  },
  likesContainer: {
    backgroundColor: "rgba(0,0,0,0)", // this is temporary cuz im too lazy to code a heart for now
  },
  settings: {
    backgroundColor: "#083D77",
    height: 40,
    width: 40,
    borderRadius: 15,
    justifyContent: "center",
  },
});
