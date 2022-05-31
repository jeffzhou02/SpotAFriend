import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useContext, useState } from 'react';
import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import { UserContext } from '../components/UserContext';
import { storage } from '../firebase/index';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { db } from "../firebase/index";
import { getDatabase, onValue, ref as dbref, set, update } from 'firebase/database';

//remeber to add profile photo later
export default function ProfileScreen({ navigation }: RootStackParamList<'Root'>) {
  const storageRef = ref(storage, 'profilephotos');
  const [image, setImage] = useState("");
  const name = 'asdfasdf';
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
    if (!result.cancelled) { // update photo as needed
      imageURL = (await uploadImageAsync(result.uri, username)).toString();
      update(dbref(db, "users/" + username), {profilePhotoRef: imageURL});
    }
    setImage(imageURL);
  };
 
  return (
    <View style={styles.container}>
      {
        imageURL === "" ? null :
          <View>
            <Image style={styles.targetImage} source={{ uri: imageURL }} />
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

async function uploadImageAsync(uri: any, user: any) {
  const fileRef = ref(storage, 'profilephotos/' + {user});
  const img = await fetch(uri);
  const bytes = await img.blob();
  const result = await uploadBytes(fileRef, bytes);
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
