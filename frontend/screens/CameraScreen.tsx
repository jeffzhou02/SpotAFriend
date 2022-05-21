import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  _Text,
  ImageBackground,
  Button,
} from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  let camera: Camera;

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const __takePicture = async () => {
    console.log("fuck");

    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log("whore");
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const CameraPreview = ({ photo }: any) => {
    return (
      <View style={styles.preview}>
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={styles.container}
        />
        <TouchableOpacity onPress={__retakePicture} style={styles.takepic} />
      </View>
    );
  };
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} retakePicture={__retakePicture} />
      ) : (
        <Camera
          style={{ flex: 1 }}
          ref={(r) => {
            camera = r;
          }}
        >
          <View style={styles.pictureContainer}>
            <View style={styles.picborder}></View>
            <View style={styles.lowersection}>
              <View>
                <TouchableOpacity
                  onPress={__takePicture}
                  style={styles.takepic}
                />
              </View>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  takepic: {
    width: 90,
    height: 40,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#00AFB5",
  },
  pictureContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderTopWidth: 40,
    borderColor: "#F4D58D",
  },
  lowersection: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#F4D58D",
    justifyContent: "center",
    borderColor: "#F4D58D",
  },
  picborder: {},
});
