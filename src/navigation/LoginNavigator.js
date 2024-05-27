import React, { useState, useEffect } from "react";
import { AppNavigation } from "./AppNavigation";
import { AuthScreen } from "../screens/Auth/AuthScreen";
import { connect } from "react-redux";
import { update_firebaseUserUid } from "../actions/auth";
import { update_firebaseProfile } from "../actions/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginNavigator(props) {
  // const [loginPersist, setLoginPersist] = useState(true);

  // const retrieveData = async () => {
  //   try {
  //     const profile = await AsyncStorage.getItem("profilePersist");
  //     const userUid = await AsyncStorage.getItem("userUidPersist");
  //     if (profile !== null) {
  //       console.log("profile", JSON.parse(profile));
  //       props.update_firebaseProfile(JSON.parse(profile));
  //       console.log("profileSeteado");
  //     }
  //     if (userUid !== null) {
  //       console.log("userUid", JSON.parse(userUid));
  //       props.update_firebaseUserUid(JSON.parse(userUid));
  //       console.log("userUidseteado");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     // Error retrieving data
  //   }
  // };

  // useEffect(() => {
  //   retrieveData();
  //   // setTimeout(() => {
  //   //   setLoginPersist(false);
  //   // }, 1000);
  //   // setLoginPersist(false);
  // }, []);

  const content = props.firebase_user_uid ? <AppNavigation /> : <AuthScreen />;

  return <>{content}</>;
}

const mapStateToProps = (reducers) => {
  return reducers.auth;
};

export const ConnectedLoginNavigator = connect(mapStateToProps, {
  update_firebaseUserUid,
  update_firebaseProfile,
})(LoginNavigator);
