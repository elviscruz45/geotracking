import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./GeneralForms.styles";
import { Input } from "@rneui/themed";
import * as DocumentPicker from "expo-document-picker";
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDisplayFechaInicio } from "../../FormsGeneral/ChangeFechaInicio/ChangeDisplayFechaInicio";
import { ChangeDisplayLitologia } from "../../FormsGeneral/ChangeLitologia/ChangeDisplayLitologia";
import { ChangeDisplayColor } from "../../FormsGeneral/ChangeColor/ChangeDisplayColor";
import { ChangeDisplayTextura } from "../../FormsGeneral/ChangeTextura/ChangeDisplayTextura";
import { ChangeDisplayFraccionamiento } from "../../FormsGeneral/ChangeFraccionamiento/ChangeDisplayFraccionamiento";
import { ChangeDisplayAlteracion } from "../../FormsGeneral/ChangeAlteracion/ChangeDisplayAlteracion";
import { ChangeDisplayVenillas } from "../../FormsGeneral/ChangeVenillas/ChangeDisplayVenillas";
import { ChangeDisplayMineralizacion } from "../../FormsGeneral/ChangeMineralizacion/ChangeDisplayMineralizacion";

import { connect } from "react-redux";
import Toast from "react-native-toast-message";

function GeneralFormsBare(props) {
  const { formik } = props;
  const [renderComponent, setRenderComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [verprevio, setVerprevio] = useState(true);

  //calculo de Ley de Cobre
  let LeyCobre = (
    0.35 *
    formik.values.porcentajeMin *
    ((10 - formik.values.calcopiritaX) / 10)
  ).toFixed(2);

  //previsualizacion
  previsualizacion = `${formik.values.litologia} de color ${
    formik.values.color
  }, con textura ${formik.values.textura} y ${
    formik.values.fraccionamiento
  } fracturamiento, presenta alteracion ${
    formik.values.alteracion
  }, se observa ${formik.values.venillas}. Mineralización total de sulfuros ${
    formik.values.porcentajeMin
  }%, principalmente pirita y calcopirita en diseminado y venillas. Ratio Pirita/Calcopirita (${
    10 - formik.values.calcopiritaX
  }/${formik.values.calcopiritaX}). Ley estimada de CuT ${LeyCobre}% `;

  //algorith to pick a pdf File to attach to the event
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  ///function to date format
  const formatdate = (item) => {
    if (item === null) {
      return "";
    }
    const date = new Date(item);
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

  const selectComponent = (key) => {
    if (key === "FechaInicio") {
      setRenderComponent(
        <ChangeDisplayFechaInicio onClose={onCloseOpenModal} formik={formik} />
      );
    }

    if (key === "litologia") {
      setRenderComponent(
        <ChangeDisplayLitologia onClose={onCloseOpenModal} formik={formik} />
      );
    }

    if (key === "color") {
      setRenderComponent(
        <ChangeDisplayColor onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "textura") {
      setRenderComponent(
        <ChangeDisplayTextura onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "fraccionamiento") {
      setRenderComponent(
        <ChangeDisplayFraccionamiento
          onClose={onCloseOpenModal}
          formik={formik}
        />
      );
    }
    if (key === "alteracion") {
      setRenderComponent(
        <ChangeDisplayAlteracion onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "venillas") {
      setRenderComponent(
        <ChangeDisplayVenillas onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "mineralizacion") {
      setRenderComponent(
        <ChangeDisplayMineralizacion
          onClose={onCloseOpenModal}
          formik={formik}
        />
      );
    }
    onCloseOpenModal();
  };

  return (
    <>
      <View
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        enableOnAndroid={true}
      >
        <Text style={styles.subtitleForm}>General</Text>

        <Input
          value={formik.values.MetrosLogueoInicio}
          placeholder="Metros Perforados Inicial"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("MetrosLogueoInicio", text);
          }}

          // errorMessage={formik.errors.HorasHombre}
        />
        <Input
          value={formik.values.MetrosLogueoFinal}
          placeholder="Metros Perforados Final"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("MetrosLogueoFinal", text);
          }}

          // errorMessage={formik.errors.HorasHombre}
        />

        <Input
          value={formik.values.MetrosRecepcionadoInicio}
          placeholder="Metros Recepcionados Inicial"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("MetrosRecepcionadoInicio", text);
          }}

          // errorMessage={formik.errors.HorasHombre}
        />
        <Input
          value={formik.values.MetrosRecepcionadoFinal}
          placeholder="Metros Recepcionados Final"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("MetrosRecepcionadoFinal", text);
          }}

          // errorMessage={formik.errors.HorasHombre}
        />
        <Input
          value={formik.values.CajaLogueoInicio}
          placeholder="Caja Inicial"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("CajaLogueoInicio", text);
          }}

          // errorMessage={formik.errors.HorasHombre}
        />
        <Input
          value={formik.values.CajaLogueoFinal}
          placeholder="Caja Final"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("CajaLogueoFinal", text);
          }}

          // errorMessage={formik.errors.HorasHombre}
        />

        <Text></Text>
        <Text style={styles.subtitleForm}>Previsualizacion</Text>
        <Text></Text>

        <Input
          value={formik.values.previa}
          inputContainerStyle={styles.textArea2}
          multiline={true}
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("previa", text);
          }}
        />
      </View>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    profile: reducers.profile.profile,
    email: reducers.profile.email,
  };
};

export const GeneralFormsEdit = connect(mapStateToProps, {})(GeneralFormsBare);
