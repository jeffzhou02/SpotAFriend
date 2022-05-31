import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useContext } from "react";
import { Text, View } from "../components/Themed";
import { RootStackParamList } from "../types";
import { UserContext } from "../components/UserContext";

export default function ProfileScreen({
  navigation,
}: RootStackParamList<"Root">) {
  const name = "asdfasdf";
  const { user } = useContext(UserContext);
  const cancelFunction = () => navigation.navigate("Profile");
  return (
    <View style={styles.container}>
      <Image
        style={styles.pfp}
        source={{
          uri: "https://i.scdn.co/image/ab67616d00001e021cf64730713292322465d339",
        }}
      />
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
        <View style={styles.box2}>
          <TouchableOpacity>
            <Text style={styles.textStyle}>change profile picture</Text>
          </TouchableOpacity>
        </View>
        <Text></Text>
      </View>
    </View>
  );
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
      <RowButton
        label="username:"
        data={props.username}
        onPress={props.usernameHandler}
      />
      <RowButton
        label="email:"
        data={props.email}
        onPress={props.emailHandler}
        style={{ marginTop: 10 }}
      />
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
    backgroundColor: "#E3DAC9",
  },
  data: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#E3DAC9",
  },
  row: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#E3DAC9",
    borderColor: "#689689",
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
  },
  box2: {
    backgroundColor: "#F4D58D",
    borderColor: "#689689",
    borderWidth: 2,
    borderRadius: 17,
    marginTop: "5%",
    marginBottom: "5%",
    paddingHorizontal: "2%",
    paddingVertical: "2%",
    marginHorizontal: "2%",
    alignItems: "center",
    width: 350,
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
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  pfp: {
    alignSelf: "center",
    height: 180,
    width: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#689689",
    marginBottom: "5%",
  },
  textStyle: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#689689",
    backgroundColor: "transparent",
  },
});
