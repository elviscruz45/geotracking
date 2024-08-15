import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Avatar, Button } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { styles } from "./EditLogueoScreen.styles";
import { GeneralFormsEdit } from "../../../components/Forms/GeneralForms/GeneralForms/GeneralFormsEdit";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./EditLogueoScreen.data";
// import { saveActualPostFirebase } from "../../../actions/post";
import { Formik, useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

// import { db } from "../../../utils";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
// import { areaLists } from "../../../utils/areaList";
import { TitleForms } from "../../../components/Forms/GeneralForms/TitleForms/TitleForms";
// import { resetPostPerPageHome } from "../../../actions/home";
// import { saveTotalUsers } from "../../../actions/post";
// import {
//   dateFormat,
//   useUserData,
//   uploadPdf,
//   uploadImage,
// } from "./InformatioScreen.calc";
import { Image as ImageExpo } from "expo-image";
import Toast from "react-native-toast-message";
import { db } from "../../../utils";
import { areaLists } from "../../../utils/areaList";

function EditLogueoScreenBare(props) {
  const navigation = useNavigation();

  console.log(props.route.params.Item.IDReporte);

  // retrieving data from formik forms ,data from ./InfomartionScreen.data.js
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;

        //Modifying the Service State ServiciosAIT considering the LasEventPost events
        const RefFirebaseLasEventPostd = doc(
          db,
          "events",
          props.route.params.Item.IDReporte
        );

        const updateDataLasEventPost = {};

        if (newData?.MetrosLogueoInicio) {
          updateDataLasEventPost.MetrosLogueoInicio =
            newData.MetrosLogueoInicio;
        }
        if (newData?.MetrosLogueoFinal) {
          updateDataLasEventPost.MetrosLogueoFinal = newData.MetrosLogueoFinal;
        }
        if (newData?.MetrosRecepcionadoInicio) {
          updateDataLasEventPost.MetrosRecepcionadoInicio =
            newData.MetrosRecepcionadoInicio;
        }
        if (newData?.MetrosRecepcionadoFinal) {
          updateDataLasEventPost.MetrosRecepcionadoFinal =
            newData.MetrosRecepcionadoFinal;
        }
        if (newData?.CajaLogueoInicio) {
          updateDataLasEventPost.CajaLogueoInicio = newData.CajaLogueoInicio;
        }
        if (newData?.CajaLogueoFinal) {
          updateDataLasEventPost.CajaLogueoFinal = newData.CajaLogueoFinal;
        }

        if (newData?.litologia) {
          updateDataLasEventPost.litologia = newData.litologia;
        }
        if (newData?.color) {
          updateDataLasEventPost.color = newData.color;
        }
        if (newData?.textura) {
          updateDataLasEventPost.textura = newData.textura;
        }
        if (newData?.fraccionamiento) {
          updateDataLasEventPost.fraccionamiento = newData.fraccionamiento;
        }
        if (newData?.alteracion) {
          updateDataLasEventPost.alteracion = newData.alteracion;
        }
        if (newData?.venillas) {
          updateDataLasEventPost.venillas = newData.venillas;
        }
        if (newData?.mineralizacion) {
          updateDataLasEventPost.mineralizacion = newData.mineralizacion;
        }
        if (newData?.porcentajeMin) {
          updateDataLasEventPost.porcentajeMin = newData.porcentajeMin;
        }
        if (newData?.calcopiritaX) {
          updateDataLasEventPost.calcopiritaX = newData.calcopiritaX;
        }

        if (newData?.previa) {
          updateDataLasEventPost.previa = newData.previa;
        }

        await updateDoc(RefFirebaseLasEventPostd, updateDataLasEventPost);

        navigation.navigate(screen.search.search);

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
    formik.setValues({
      MetrosLogueoInicio: props.route.params.Item.MetrosLogueoInicio,
      MetrosLogueoFinal: props.route.params.Item.MetrosLogueoFinal,
      MetrosRecepcionadoInicio:
        props.route.params.Item.MetrosRecepcionadoInicio,
      MetrosRecepcionadoFinal: props.route.params.Item.MetrosRecepcionadoFinal,
      CajaLogueoInicio: props.route.params.Item.CajaLogueoInicio,
      CajaLogueoFinal: props.route.params.Item.CajaLogueoFinal,

      previa: props.route.params.Item.previa,
    });
  }, []);

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
        <GeneralFormsEdit formik={formik} />
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

export const EditLogueoScreen = connect(mapStateToProps, {
  // saveActualPostFirebase,
  // resetPostPerPageHome,
  // saveTotalUsers,
})(EditLogueoScreenBare);
