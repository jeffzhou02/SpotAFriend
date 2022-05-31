import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useContext, useState } from 'react';
import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import { UserContext } from '../components/UserContext';
import { storage } from '../firebase/index';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

//remeber to add profile photo later
export default function ProfileScreen({ navigation }: RootStackParamList<'Root'>) {
  const storageRef = ref(storage, 'profilephotos');
  const [image, setImage] = useState("");
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      uploadImageAsync(result.uri);
    }
  };
  const name = 'asdfasdf';
  const { user } = useContext(UserContext);
  const cancelFunction = () => navigation.navigate("Profile");
  return (
    <View style={styles.container}>
      {
        image === "" ? null :
          <View>
            <Image style={styles.targetImage} source={{ uri: image }} />
          </View>
      }
      <TouchableOpacity style={styles.row} onPress={pickImage}>
        <View style={styles.label}>
          <Text>edit photo</Text>
        </View>
      </TouchableOpacity>
      <InfoView name={name} username={user.username} email={user.email}
        usernameHandler={() => navigation.navigate(
          'EditInfo',
          {
            name: 'username',
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
        <Text>

        </Text>
      </View>
    </View>
  );
}

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
  const fileRef = ref(storage, 'profilephotos/user.jpg');
  console.log("done making fileRef");
  const img = await fetch(uri);
  console.log("done fetching");
  const bytes = await img.blob();
  console.log("done bytes");
  const result = await uploadBytes(fileRef, bytes);
  console.log("uploaded!");

  // We're done with the blob, close and release it
  // blob.close();

  return await getDownloadURL(fileRef);
}

function InfoView(props: any) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: "#E3DAC9", }}>

      <Divider />
      <RowButton label='username' data={props.username} onPress={props.usernameHandler} />
      <Divider />
      <RowButton label='email' data={props.email} onPress={props.emailHandler} />
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
    alignItems: 'center',
    justifyContent: 'center', //can change to flex-start if need to push to top
    backgroundColor: "#E3DAC9",
  },
  label: {
    width: "30%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#E3DAC9",

  },
  data: {
    width: "70%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#E3DAC9",

  },
  row: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#E3DAC9",
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E3DAC9",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: '85%',
    backgroundColor: "#E3DAC9",

  },
  targetImage: {
    alignSelf: "center",
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#FFF",
    margin: "5%",
  }
});
