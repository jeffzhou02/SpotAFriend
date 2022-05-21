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
  
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const __uploadPicture = () => {
    console.log("upload");
  };

  const CameraPreview = ({ photo }: any) => {
    return (
      <View style={styles.preview}>
        <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity onPress={__retakePicture} style={styles.retake}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={__uploadPicture} style={styles.retake}>
              <Text>Upload</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
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
          <View style={styles.row}>
            <TouchableOpacity style={styles.ring} onPress={__takePicture}>
              <TouchableOpacity
                onPress={__takePicture}
                style={styles.takepic}
              />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.pictureContainer}>
            <View style={styles.picborder}></View>
            <View style={styles.lowersection}>
              <View>
                <TouchableOpacity style={styles.ring}>
                  <TouchableOpacity
                    onPress={__takePicture}
                    style={styles.takepic}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
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
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    padding: 20,
    backgroundColor: "transparent",
  },
  retake: {
    padding: 15,
    alignItems: "center",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#00AFB5",
  },
  takepic: {
    width: 48,
    height: 48,
    bottom: 0,
    borderRadius: 48,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#00AFB5",
  },
  ring: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    bottom: 0,
    borderRadius: 60,
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
