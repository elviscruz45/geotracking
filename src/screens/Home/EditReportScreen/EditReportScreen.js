import { View, Text } from "react-native";
import { Icon, Avatar, Input, Button } from "@rneui/themed";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { styles } from "./EditReportScreen.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./EditReportScreen.data";
import { saveActualPostFirebase } from "../../../actions/post";
import { useFormik } from "formik";
import { db } from "../../../utils";
import {
  collection,
  query,
  doc,
  updateDoc,
  where,
  orderBy,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { ReportForm } from "../../../components/Forms/GeneralForms/ReportForm/ReportForm";
import { saveTotalUsers } from "../../../actions/post";
import Toast from "react-native-toast-message";

function EditReportNoReduxScreen(props) {
  const emptyimage = require("../../../../assets/splash.png");
  const navigation = useNavigation();
  // const {
  //   route: {
  //     params: { Item },
  //   },
  // } = props;
  ///function to date format
  const formatdate = () => {
    const date = new Date();
    const monthNames = [
      "de enero del",
      "de febrero del",
      "de marzo del",
      "de abril del",
      "de mayo del",
      "de junio del",
      "de julio del",
      "de agosto del",
      "de septiembre del",
      "de octubre del",
      "de noviembre del",
      "de diciembre del",
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedDate = `${day} ${month} ${year}, ${hour}:${minute} hrs`;
    const fechaPostFormato = formattedDate;
    return fechaPostFormato;
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //retrieving data from Formik
        const newData = formValue;
        newData.createdAt = new Date();
        newData.fechaPost = formatdate();
        // send profile information
        newData.emailPerfil = props.email || "Anonimo";

        // Posting data to Firebase and adding the ID firestore
        const docRef = await addDoc(collection(db, "Reporte"), newData);
        newData.IDReporte = docRef.id;
        const RefFirebase = doc(db, "Reporte", newData.IDReporte);
        await updateDoc(RefFirebase, newData);

        // this hedlps to go to the begining of the process
        navigation.navigate(screen.home.home);

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha Actualizado correctamente",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de actualizar estos datos",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <Text></Text>
      {/* <Text style={styles.name}>{Item.NombreServicio}</Text> */}

      <View style={styles.sectionForms}>
        <View></View>
      </View>
      <View style={styles.sectionForms}></View>

      <ReportForm formik={formik} />
      <Button
        title="Actualizar"
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

export const EditReportScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
  saveTotalUsers,
})(EditReportNoReduxScreen);
