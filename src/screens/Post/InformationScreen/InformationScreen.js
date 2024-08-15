import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Avatar, Button } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { styles } from "./InformationScreen.styles";
import { GeneralForms } from "../../../components/Forms/GeneralForms/GeneralForms/GeneralForms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./InformationScreen.data";
import { saveActualPostFirebase } from "../../../actions/post";
import { useFormik } from "formik";
import { db } from "../../../utils";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { areaLists } from "../../../utils/areaList";
import { TitleForms } from "../../../components/Forms/GeneralForms/TitleForms/TitleForms";
import { resetPostPerPageHome } from "../../../actions/home";
import { saveTotalUsers } from "../../../actions/post";
import { Image as ImageExpo } from "expo-image";
import Toast from "react-native-toast-message";

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
  const formattedDate = `${day} ${month} ${year} `;
  const fechaPostFormato = formattedDate;
  return fechaPostFormato;
};

function InformationScreen(props) {
  const navigation = useNavigation();

  // retrieving data from formik forms ,data from ./InfomartionScreen.data.js
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.createdAt = new Date();

        //data of the service AIT information
        newData.IDSondaje = props.actualServiceAIT?.idSondaje;
        newData.AITNombreSondaje = props.actualServiceAIT?.NombreServicio;
        // send profile information
        newData.emailPerfil = props.email || "Anonimo";
        newData.nombrePerfil = props.firebase_user_name || "Anonimo";
        newData.fotoUsuarioPerfil = props.user_photo;
        // Posting data to Firebase and adding the ID firestore
        const docRef = await addDoc(collection(db, "events"), newData);
        newData.IDReporte = docRef.id;
        const RefFirebase = doc(db, "events", newData.IDReporte);
        await updateDoc(RefFirebase, newData);

        //Modifying the Service State ServiciosAIT considering the LasEventPost events
        const RefFirebaseLasEventPostd = doc(
          db,
          "Sondaje",
          props.actualServiceAIT?.idSondaje
        );
        const updateDataLasEventPost = {
          ProgEjecutado: newData.MetrosLogueoFinal,
          FechaUltimaActualizacion: new Date(),
          FechaUltimaActualizacionFormat: formatdate(),
        };

        // if (newData?.HHModificado) {
        //   updateDataLasEventPost.HHModificado = newData.HHModificado;
        // }

        await updateDoc(RefFirebaseLasEventPostd, updateDataLasEventPost);

        navigation.navigate(screen.post.post);
        navigation.navigate(screen.home.tab, {
          screen: screen.home.home,
        });

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "El evento se ha subido correctamente",
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

  useEffect(() => {
    if (props.actualServiceAIT) {
      formik.setFieldValue(
        "MetrosLogueoInicio",
        props.actualServiceAIT?.ProgEjecutado
      );
    }
  }, [props.actualServiceAIT]);

  //algorith to retrieve image source that
  const area = props.actualServiceAIT?.AreaServicio;
  const indexareaList = areaLists.findIndex((item) => item.value === area);
  const imageSource = areaLists[indexareaList]?.image;

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <View>
        <View style={styles.equipments}>
          {props.actualServiceAIT?.photoServiceURL ? (
            <ImageExpo
              source={{ uri: props.actualServiceAIT?.photoServiceURL }}
              style={styles.roundImage}
              cachePolicy={"memory-disk"}
            />
          ) : (
            <ImageExpo
              source={imageSource}
              style={styles.roundImage}
              cachePolicy={"memory-disk"}
            />
          )}
          <View>
            <Text></Text>
            <Text style={styles.name}>
              {props.actualServiceAIT?.NombreServicio || "Titulo del Evento"}
            </Text>
          </View>
        </View>
        <GeneralForms formik={formik} />
        <Button
          title="Agregar Reporte"
          buttonStyle={styles.addInformation}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (reducers) => {
  return {
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,
    actualServiceAIT: reducers.post.actualServiceAIT,
    savePhotoUri: reducers.post.savePhotoUri,
    getTotalUsers: reducers.post.saveTotalUsers,
  };
};

export const ConnectedInformationScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
  resetPostPerPageHome,
  saveTotalUsers,
})(InformationScreen);
