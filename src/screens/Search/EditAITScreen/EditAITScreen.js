import { View, Text } from "react-native";
import { Icon, Avatar, Input, Button } from "@rneui/themed";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { styles } from "./EditAITScreen.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./EditAITScreen.data";
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
} from "firebase/firestore";
import { AITForms } from "../../../components/Forms/GeneralForms/AITForms/AITForms";
import { saveTotalUsers } from "../../../actions/post";
import Toast from "react-native-toast-message";

function EditAITNoReduxScreen(props) {
  const emptyimage = require("../../../../assets/splash.png");
  const navigation = useNavigation();
  const {
    route: {
      params: { Item },
    },
  } = props;
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //retrieving data from Formik
        const newData = formValue;

        //Modifying the Service State ServiciosAIT considering the LasEventPost events
        const RefFirebaseLasEventPostd = doc(db, "Sondaje", Item.idSondaje);
        const updateDataLasEventPost = {};

        if (newData?.NombreServicio) {
          updateDataLasEventPost.NombreServicio = newData.NombreServicio;
        }
        if (newData?.FechaInicio) {
          updateDataLasEventPost.FechaInicio = newData.FechaInicio;
        }
        if (newData?.FechaFin) {
          updateDataLasEventPost.FechaFin = newData.FechaFin;
        }
        if (newData?.Estado) {
          updateDataLasEventPost.Estado = newData.Estado;
        }
        if (newData?.ProgEjecutado) {
          updateDataLasEventPost.ProgEjecutado = newData.ProgEjecutado;
        }
        if (newData?.ProgProgramado) {
          updateDataLasEventPost.ProgProgramado = newData.ProgProgramado;
        }
        if (newData?.Cobertura) {
          updateDataLasEventPost.Cobertura = newData.Cobertura;
        }
        if (newData?.LogueadoPor) {
          updateDataLasEventPost.LogueadoPor = newData.LogueadoPor;
        }
        if (newData?.MetrosLogueo) {
          updateDataLasEventPost.MetrosLogueo = newData.MetrosLogueo;
        }
        if (newData?.Sector) {
          updateDataLasEventPost.Sector = newData.Sector;
        }
        if (newData?.Coord1) {
          updateDataLasEventPost.Coord1 = newData.Coord1;
        }
        if (newData?.Coord2) {
          updateDataLasEventPost.Coord2 = newData.Coord2;
        }
        if (newData?.Azimut) {
          updateDataLasEventPost.Azimut = newData.Azimut;
        }
        if (newData?.Dip) {
          updateDataLasEventPost.Dip = newData.Dip;
        }
        if (newData?.Cota) {
          updateDataLasEventPost.Cota = newData.Cota;
        }
        if (newData?.Maquina) {
          updateDataLasEventPost.Maquina = newData.Maquina;
        }
        if (newData?.Responsable) {
          updateDataLasEventPost.Responsable = newData.Responsable;
        }
        if (newData?.Taladro) {
          updateDataLasEventPost.Taladro = newData.Taladro;
        }

        await updateDoc(RefFirebaseLasEventPostd, updateDataLasEventPost);

        // this hedlps to go to the begining of the process
        navigation.navigate(screen.search.search);
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
      <Text style={styles.name}>{Item.NombreServicio}</Text>

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

export const EditAITScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
  saveTotalUsers,
})(EditAITNoReduxScreen);
