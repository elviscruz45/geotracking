import React, { useState } from "react";
import { VictoryPie, VictoryLabel, VictoryAnimation } from "victory-native";
import { Avatar, Icon } from "@rneui/themed";
import Svg from "react-native-svg";
import { View, Text } from "react-native";
import { Image as ImageExpo } from "expo-image";
import { Platform } from "react-native";

import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../utils";

export const CircularProgress = ({
  imageStyle,
  avance,
  idait,
  image,
  titulo,
}) => {
  const [avatar, setAvatar] = useState();

  const data = [
    { x: 1, y: parseInt(avance) },
    { x: 2, y: 100 - parseInt(avance) },
  ];

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
    });

    if (!result.canceled) uploadImage(result.assets[0].uri);
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `Serviceavatar/${idait}`);

    uploadBytesResumable(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    const RefFirebaseServiceAIT = doc(db, "ServiciosAIT", idait);

    const updateDataLasEventPost = {
      photoServiceURL: imageUrl,
    };
    await updateDoc(RefFirebaseServiceAIT, updateDataLasEventPost);

    setAvatar(imageUrl);
  };

  return (
    <>
      <Avatar
        style={
          Platform.OS === "ios"
            ? {
                zIndex: 10,
                position: "absolute",
                margin: "90%",
              }
            : {
                zIndex: 10,
                position: "absolute",
                margin: "110%",
              }
        }
      >
        {/* <Avatar.Accessory size={30} onPress={changeAvatar} /> */}
      </Avatar>
      {image ? (
        <ImageExpo
          source={{ uri: image }}
          style={
            Platform.OS === "ios"
              ? {
                  // alignContent: "center",
                  marginLeft: "5%",
                  marginTop: "5%",
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  borderWidth: 0.3,

                  // alignSelf: "center",
                }
              : {
                  // alignContent: "center",
                  marginLeft: "0%",
                  marginTop: "11%",
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  borderWidth: 0.3,

                  // alignSelf: "center",
                }
          }
        />
      ) : (
        <ImageExpo
          source={require("../../../../assets/perforadora.jpg")}
          style={
            Platform.OS === "ios"
              ? {
                  // alignContent: "center",
                  marginLeft: "5%",
                  marginTop: "5%",
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  borderWidth: 0.3,

                  // alignSelf: "center",
                }
              : {
                  // alignContent: "center",
                  marginLeft: "0%",
                  marginTop: "11%",
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  borderWidth: 0.3,

                  // alignSelf: "center",
                }
          }
        />
      )}
    </>
  );
};
