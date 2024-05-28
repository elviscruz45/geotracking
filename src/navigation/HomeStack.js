import { TouchableOpacity, Image, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { ConnectedHomeScreen } from "../screens";
import { ConnectedCommentScreen } from "../screens";
import { connect } from "react-redux";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";
import { update_firebasePhoto } from "../actions/profile";
import { update_firebaseUserName } from "../actions/profile";
import { update_firebaseEmail } from "../actions/profile";
import { update_firebaseUid } from "../actions/profile";
import { saveActualAITServicesFirebaseGlobalState } from "../actions/post";
import Toast from "react-native-toast-message";

function HomeStack(props) {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const user = getAuth().currentUser;
  const { uid, photoURL, displayName, displayNameform, email } = user;

  useEffect(() => {
    if (user) {
      props.update_firebasePhoto(photoURL);
      props.update_firebaseUserName(displayName ?? displayNameform);
      props.update_firebaseEmail(email);
      props.update_firebaseUid(uid);
    }
  }, [user]);

  const home_screen = () => {
    navigation.navigate(screen.home.tab, {
      screen: screen.home.home,
    });
  };

  const profile_screen = () => {
    navigation.navigate(screen.profile.tab, {
      screen: screen.profile.account,
    });
  };

  if (!user || !props.user_photo || !props.profile) {
    // Toast.show({
    //   type: "error",
    //   position: "top",
    //   text1: "No se pudo cargar la foto de perfil",
    //   // text2: "No se pudo cargar la foto de perfil",
    //   visibilityTime: 3000,
    //   autoHide: true,
    //   topOffset: 30,
    //   bottomOffset: 40,
    // });
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 50,
            // fontFamily: "Arial",
            color: "#2A3B76",
          }}
        >
          Bienvenido
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",

          headerTitle: () => (
            <TouchableOpacity onPress={() => home_screen()}>
              <Image
                source={require("../../assets/appMVGLogo.png")}
                style={{ width: 25, height: 30 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => profile_screen()}>
              <ImageExpo
                source={{ uri: props.user_photo }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  margin: 0,
                }}
                cachePolicy={"memory-disk"}
              />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name={screen.home.home}
          component={ConnectedHomeScreen}
          options={{ title: " " }}
        />
        <Stack.Screen
          name={screen.home.comment}
          component={ConnectedCommentScreen}
          options={{ title: " " }}
        />
      </Stack.Navigator>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    user_photo: reducers.profile.user_photo,
    profile: reducers.profile.profile,
  };
};

export const ConnectedHomeStack = connect(mapStateToProps, {
  update_firebasePhoto,
  update_firebaseUserName,
  update_firebaseEmail,
  update_firebaseUid,
  saveActualAITServicesFirebaseGlobalState,
})(HomeStack);
