import { StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";

import React, { ReactNode, useEffect, useState, useContext } from "react";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { UserContext } from "../components/UserContext";
import { GetGroupMembers1 } from "../firebase/library";
import { loadAsync } from "expo-font";

const Card = (props: any) => {
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        {/* <Image style={styles.pfp} source={{ uri: props.pfp }} /> */}
        <View style={styles.captionBox}>
          <Text style={styles.postTitle}>
            <Text style={styles.postTitleName}>{props.person1} </Text>
            spotted
          </Text>
        </View>
      </View>
      <Image style={styles.postImage} source={{ uri: props.pic }} />
      <View style={styles.tagsLikes}>
        <View style={styles.tagsContainer}>
          <View style={styles.tags}>
            <Text style={styles.tagsText}>{props.tag1}</Text>
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

function Logo(props: any) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.function();
      }}
    >
      <Image
        style={{
          resizeMode: "contain",
          height: 40,
          width: 40,
          marginTop: 50,
        }}
        source={require("../assets/images/icon.png")}
      />
    </TouchableOpacity>
  );
}
interface Person {
  person1: string;
  tag1: string;
  pfp: string;
  pic: string;
}

function PopulateArray(user: any) {
  let groupMembers: Person[] = [];
  var groupArray = user.groups;
  for (const groupname of groupArray) {
    console.log(groupname);
    //var members: string[] = [""];

    // Get members
    let array;
    const func1 = async () => {
      const promise = await GetGroupMembers1(groupname);
      console.log("is it here???? " + promise);
      return promise;
    };

    func1().then((members) => {
      array = members;
      console.log("array: " + array);

      console.log("array here" + array);

      for (const member of array) {
        console.log("member: " + member);
        let image;
        getImage(member, groupname).then((URL) => {
          image = URL;
          console.log(image);
          const tempPerson: Person = {
            person1: member,
            tag1: "",
            pfp: "",
            pic: image,
          };
          console.log("temp Person" + tempPerson);
          groupMembers.push(tempPerson);
        });
        // if (image === null) {
        //   continue;
        // }
      }
    });
  }

  return groupMembers;
}

async function getImage(userName: string, groupName: string) {
  let tagName = ["friend", "enemy", "acquaintance"];
  const storage = getStorage();
  let imageURL = "";
  for (const tag of tagName) {
    const fileRef = ref(
      storage,
      "dailyphotos/" + userName + "_" + groupName + "_" + tag + ".jpg"
    );
    if (fileRef != null) {
      imageURL = (await getDownloadURL(fileRef)).toString();
      return imageURL;
    }
  }
  return null;
}

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  // const [postData, setGroupData] = React.useState<Person[]>(PopulateArray());
  //const postData = PopulateArray();
  // useEffect(() => {
  //   postData = PopulateArray();
  // });
  const { user } = useContext(UserContext);

  var [loaded, setLoaded] = useState(0);
  console.log("first: " + loaded);
  var [postData, setPostData] = React.useState<Person[]>();
  var func = async () => {
    console.log("aslkgjasklgjkasjgksadgjaslkgjklsa;gjsaglsajlgkljasdlgasjk");
    const data = PopulateArray(user);
    console.log("run???");
    const dataValue = data;
    setPostData(dataValue);
  };

  const changeLoad = (data: number) => {
    console.log("aslkgjasljkjgaskjlgasgl");
    func();
  };
  console.log("second: " + loaded);
  console.log("postData: " + postData);
  // useEffect(() => {
  //   func();
  // }, [loaded]);

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
        <Logo loaded={loaded} function={changeLoad}></Logo>
        <SettingsButton {...navigation} />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
        style={styles.body}
      >
        {postData?.map((note: any) => {
          return (
            <Card
              person1={note.person1}
              pic={note.pic}
              //pfp={note.pfp}
              tag1={note.tag1}
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
