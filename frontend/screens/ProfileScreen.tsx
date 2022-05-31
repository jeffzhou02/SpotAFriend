import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useContext, useState } from "react";
import { Text, View } from "../components/Themed";
import { RootStackParamList } from "../types";
import { UserContext } from "../components/UserContext";
import { storage } from "../firebase/index";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
<<<<<<< HEAD
=======
import { db } from "../firebase/index";
import {
  getDatabase,
  onValue,
  ref as dbref,
  set,
  update,
} from "firebase/database";
>>>>>>> b2abfe74b4c5764ab4f40a22406a090f625c0f59

//remeber to add profile photo later
export default function ProfileScreen({
  navigation,
}: RootStackParamList<"Root">) {
  const storageRef = ref(storage, "profilephotos");
  const [image, setImage] = useState("");
  const name = "asdfasdf";
  const { user } = useContext(UserContext);
  const username = user.username;
  let imageURL = "";
  const cancelFunction = () => navigation.navigate("Profile");
  const userRef = dbref(db, "users/" + username);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data.profilePhotoRef) {
      imageURL = data.profilePhotoRef;
    }
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      // update photo as needed
      imageURL = (await uploadImageAsync(result.uri, username)).toString();
      update(dbref(db, "users/" + username), { profilePhotoRef: imageURL });
    }
    setImage(imageURL);
  };
<<<<<<< HEAD
  const name = "asdfasdf";
  const { user } = useContext(UserContext);
  const cancelFunction = () => navigation.navigate("Profile");
  return (
    <View style={styles.container}>
      {image === "" ? null : (
        <View>
          <Image style={styles.targetImage} source={{ uri: image }} />
=======

  return (
    <View style={styles.container}>
      {imageURL === "" ? null : (
        <View>
          <Image style={styles.targetImage} source={{ uri: imageURL }} />
>>>>>>> b2abfe74b4c5764ab4f40a22406a090f625c0f59
        </View>
      )}
      <TouchableOpacity style={styles.row} onPress={pickImage}>
        <View style={styles.label}>
          <Text
            style={{
              color: "#689689",
              fontSize: 17,
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            edit photo
          </Text>
        </View>
      </TouchableOpacity>
      <InfoView
        name={name}
        username={user.username}
        email={user.email}
        usernameHandler={() =>
          navigation.navigate("EditInfo", {
            name: "username",
            cancel: cancelFunction,
            attrib: "username",
            initial: user.username,
          })
        }
        emailHandler={() =>
          navigation.navigate("EditInfo", {
            name: "email",
            cancel: cancelFunction,
            attrib: "email",
            initial: user.email,
          })
        }
      />
      <View>
        <Text></Text>
      </View>
    </View>
  );
}

<<<<<<< HEAD
async function uploadImageAsync(uri: any) {
  console.log("uploading...");
  // uri = uri.replace("file:///", "file:/");
  console.log(uri);

  // const blob = await new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //     resolve(xhr.response);
  //   };
  //   xhr.onerror = function (e) {
  //     console.log(e);
  //     reject(new TypeError("Network request failed"));
  //   };
  //   xhr.responseType = "blob";
  //   xhr.open("GET", uri, true);
  //   xhr.send();
  // });
  console.log("done making blob");
  const fileRef = ref(storage, "profilephotos/user.jpg");
  console.log("done making fileRef");
=======
async function uploadImageAsync(uri: any, username: any) {
  const fileRef = ref(storage, "profilephotos/" + username);
>>>>>>> b2abfe74b4c5764ab4f40a22406a090f625c0f59
  const img = await fetch(uri);
  const bytes = await img.blob();
  const result = await uploadBytes(fileRef, bytes);
  return await getDownloadURL(fileRef);
}

function InfoView(props: any) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E3DAC9",
      }}
    >
      <Divider />
      <RowButton
<<<<<<< HEAD
        label="username"
=======
        label="username:"
>>>>>>> b2abfe74b4c5764ab4f40a22406a090f625c0f59
        data={props.username}
        onPress={props.usernameHandler}
      />
      <Divider />
      <RowButton
<<<<<<< HEAD
        label="email"
=======
        label="email:"
>>>>>>> b2abfe74b4c5764ab4f40a22406a090f625c0f59
        data={props.email}
        onPress={props.emailHandler}
      />
      <Divider />
    </View>
  );
}

function RowButton(props: any) {
  return (
    <TouchableOpacity style={styles.row} onPress={props.onPress}>
      <View style={styles.label}>
        <Text
          style={{
            color: "#689689",
            fontSize: 17,
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          {props.label}
        </Text>
      </View>
      <View style={styles.data}>
        <Text
          style={{
            color: "#689689",
            fontSize: 17,
            fontStyle: "italic",
          }}
        >
          {props.data}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function Divider() {
  return (
    <View style={styles.divider}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", //can change to flex-start if need to push to top
    backgroundColor: "#E3DAC9",
  },
  label: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
<<<<<<< HEAD
    backgroundColor: "#E3DAC9",
=======
    backgroundColor: "#F4D58D",
>>>>>>> b2abfe74b4c5764ab4f40a22406a090f625c0f59
  },
  data: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
<<<<<<< HEAD
    backgroundColor: "#E3DAC9",
=======
    backgroundColor: "#F4D58D",
>>>>>>> b2abfe74b4c5764ab4f40a22406a090f625c0f59
  },
  row: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#F4D58D",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#689689",
    marginBottom: "5%",
    alignContent: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3DAC9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: "85%",
    backgroundColor: "#E3DAC9",
  },
  targetImage: {
    alignSelf: "center",
    height: 180,
    width: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#689689",
    margin: "5%",
  },
});
