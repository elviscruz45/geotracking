import React, { useState, useEffect } from "react";
import { AppNavigation } from "./AppNavigation";
import { AuthScreen } from "../screens/Auth/AuthScreen";
import { connect } from "react-redux";
import { update_firebaseUserUid } from "../actions/auth";
import { update_firebaseProfile } from "../actions/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginNavigator(props) {


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
