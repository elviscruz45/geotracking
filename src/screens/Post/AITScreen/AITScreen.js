import { View, Text } from "react-native";
import { Icon, Avatar, Input, Button } from "@rneui/themed";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { styles } from "./AITScreen.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./AITScreen.data";
import { saveActualPostFirebase } from "../../../actions/post";
import { useFormik } from "formik";
import { db } from "../../../utils";
import {
  addDoc,
  collection,
  query,
  doc,
  updateDoc,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { AITForms } from "../../../components/Forms/GeneralForms/AITForms/AITForms";
import { areaLists } from "../../../utils/areaList";
import { saveTotalUsers } from "../../../actions/post";
import Toast from "react-native-toast-message";
import { Image as ImageExpo } from "expo-image";
console.log("aaa");
function AITNoReduxScreen(props) {
  const emptyimage = require("../../../../assets/splash.png");
  const navigation = useNavigation();

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("abc");

      try {
        console.log("def");

        //retrieving data from Formik
        const newData = formValue;
        //Data about date time format
        const date = new Date();
        const monthNames = [
          "ene.",
          "feb.",
          "mar.",
          "abr.",
          "may.",
          "jun.",
          "jul.",
          "ago.",
          "sep.",
          "oct.",
          "nov.",
          "dic.",
        ];
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const formattedDate = `${day} ${month} ${year}  ${hour}:${minute} Hrs`;
        newData.fechaPostFormato = formattedDate;
        newData.fechaPostISO = new Date().toISOString();
        newData.createdAt = new Date();
        newData.LastEventPosted = new Date();

        //Photo of the service
        newData.photoServiceURL = "";
        //Data about information profile and company
        newData.emailPerfil = props.email || "Anonimo";
        newData.nombrePerfil = props.firebase_user_name || "Anonimo";

        //Data gattered from events
        newData.events = [];

        //Data about the company belong this event
        const regex = /@(.+?)\./i;

        newData.companyName =
          capitalizeFirstLetter(props.email?.match(regex)?.[1]) || "Anonimo";
        //Uploading data to Firebase and adding the ID firestore
        const docRef = await addDoc(collection(db, "Sondaje"), newData);
        newData.idSondaje = docRef.id;
        const RefFirebase = doc(db, "Sondaje", newData.idSondaje);
        await updateDoc(RefFirebase, newData);
        // this hedlps to go to the begining of the process
        navigation.navigate(screen.post.post);

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha subido correctamente",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de subir estos datos",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <View style={styles.sectionForms}>
        <View></View>
      </View>
      <View style={styles.sectionForms}></View>

      <AITForms formik={formik} />
      <Button
        title="Agregar Logeo"
        buttonStyle={styles.addInformation}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (reducers) => {
  return {
    firebase_user_name: reducers.profile.firebase_user_name,
    email: reducers.profile.email,
    getTotalUsers: reducers.post.saveTotalUsers,
  };
};

export const AITScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
  saveTotalUsers,
})(AITNoReduxScreen);
