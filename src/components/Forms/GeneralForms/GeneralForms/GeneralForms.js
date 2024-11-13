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
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDisplayFechaInicio } from "../../FormsGeneral/ChangeFechaInicio/ChangeDisplayFechaInicio";
import { ChangeDisplayLitologia } from "../../FormsGeneral/ChangeLitologia/ChangeDisplayLitologia";
import { ChangeDisplayColor } from "../../FormsGeneral/ChangeColor/ChangeDisplayColor";
import { ChangeDisplayTextura } from "../../FormsGeneral/ChangeTextura/ChangeDisplayTextura";
import { ChangeDisplayFraccionamiento } from "../../FormsGeneral/ChangeFraccionamiento/ChangeDisplayFraccionamiento";
import { ChangeDisplayAlteracion } from "../../FormsGeneral/ChangeAlteracion/ChangeDisplayAlteracion";
import { ChangeDisplayVenillas } from "../../FormsGeneral/ChangeVenillas/ChangeDisplayVenillas";
import { ChangeDisplayMineralizacion } from "../../FormsGeneral/ChangeMineralizacion/ChangeDisplayMineralizacion";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Image as ImageExpo } from "expo-image";

import { connect } from "react-redux";
import Toast from "react-native-toast-message";

function GeneralFormsBare(props) {
  const { formik, setMoreImages } = props;
  const [renderComponent, setRenderComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [verprevio, setVerprevio] = useState(true);
  const [shortNameFileUpdated, setShortNameFileUpdated] = useState("");
  const [images, setImages] = useState([]);

  //calculo de Ley de Cobre
  let LeyCobre = (
    0.35 *
    formik.values.porcentajeMin *
    (formik.values.calcopiritaX / 10)
  ).toFixed(1);

  //previsualizacion
  previsualizacion = `${formik.values.litologia} de color ${
    formik.values.color
  }, con textura ${formik.values.textura} y ${
    formik.values.fraccionamiento
  } fracturamiento, presenta alteración ${
    formik.values.alteracion
  }, se observa ${formik.values.venillas}. Mineralización total de sulfuros ${
    formik.values.porcentajeMin
  }%, principalmente pirita y calcopirita en diseminado y venillas. Ratio Pirita/Calcopirita (${
    10 - formik.values.calcopiritaX
  }/${formik.values.calcopiritaX}). Ley estimada de ${LeyCobre}% CuT. `;

  useEffect(() => {
    formik.setFieldValue("previa", previsualizacion);
  }, [previsualizacion]);

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
  //method to retrieve the picture required in the event post (pick Imagen, take a photo)
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 7,
      aspect: [4, 3],
      quality: 1,
    });
    let uriImages = [];

    if (!result.canceled) {
      const imageManipulationPromises = result.assets.map(async (item) => {
        const resizedPhoto = await ImageManipulator.manipulateAsync(
          item.uri,
          [{ resize: { width: 800 } }],
          { compress: 0.1, format: "jpeg", base64: true }
        );
        return resizedPhoto.uri;
      });

      uriImages = await Promise.all(imageManipulationPromises);
    }
    setImages(uriImages);
    setMoreImages(uriImages);
  };
  return (
    <>
      <View
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        enableOnAndroid={true}
      >
        <Text style={styles.subtitleForm}>General</Text>

        {/* <Input
          value={formatdate(formik.values.FechaInicio)}
          placeholder="Fecha de Inicio"
          multiline={false}
          editable={false}
          // errorMessage={formik.errors.FechaInicio}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => {
              selectComponent("FechaInicio");
            },
          }}
        /> */}

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
        <Text style={styles.subtitleForm}>Descripcion Litologica</Text>
        <Text></Text>

        <Input
          value={formik.values.litologia}
          // inputContainerStyle={styles.textArea}
          placeholder="Litologia"
          multiline={true}
          editable={true}
          // errorMessage={formik.errors.etapa}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("litologia"),
          }}
        />

        <Input
          value={formik.values.color}
          // inputContainerStyle={styles.textArea}
          placeholder="Color"
          multiline={true}
          editable={true}
          // errorMessage={formik.errors.etapa}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("color"),
          }}
        />

        <Input
          value={formik.values.textura}
          // inputContainerStyle={styles.textArea}
          placeholder="Textura"
          multiline={true}
          editable={true}
          // errorMessage={formik.errors.etapa}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("textura"),
          }}
        />

        <Input
          value={formik.values.fraccionamiento}
          // inputContainerStyle={styles.textArea}
          placeholder="Fracturamiento"
          multiline={true}
          editable={true}
          // errorMessage={formik.errors.etapa}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("fraccionamiento"),
          }}
        />
        <Input
          value={formik.values.alteracion}
          // inputContainerStyle={styles.textArea}
          placeholder="Alteración"
          multiline={true}
          editable={true}
          // errorMessage={formik.errors.etapa}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("alteracion"),
          }}
        />
        <Input
          value={formik.values.venillas}
          // inputContainerStyle={styles.textArea}
          placeholder="Venillas"
          multiline={true}
          editable={true}
          // errorMessage={formik.errors.etapa}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("venillas"),
          }}
        />

        <Text></Text>
        <Text style={styles.subtitleForm}>Calculo de mineralizacion</Text>
        <Text></Text>

        <Input
          value={formik.values.porcentajeMin}
          placeholder="Porcentaje de mineralizacion %"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("porcentajeMin", text);
          }}
        />
        <Input
          value={formik.values.calcopiritaX}
          placeholder="Valor de Calcopirita (0-10)"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("calcopiritaX", text);
          }}
        />
        <Text></Text>
        <Text style={styles.subtitleForm}>Previsualizacion</Text>
        <Text></Text>

        {verprevio && (
          <Text
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              formik.setFieldValue("previa", previsualizacion);
              setVerprevio(false);
            }}
          >
            {previsualizacion.length > 0 ? previsualizacion : ""}
          </Text>
        )}
        {!verprevio && (
          <Input
            value={formik.values.previa}
            inputContainerStyle={styles.textArea2}
            multiline={true}
            editable={true}
            onChangeText={(text) => {
              formik.setFieldValue("previa", text);
            }}
          />
        )}
        <Text></Text>
        <Text></Text>

        <View style={styles.pickImagesButton}>
          <Button title="Agregar Imagenes" onPress={pickImages} />
        </View>
        <FlatList
          style={{
            backgroundColor: "white",
            paddingTop: 10,
            paddingVertical: 10,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({ item }) => {
            return (
              <View>
                <ImageExpo
                  source={{ uri: item }}
                  style={{
                    marginLeft: 20,
                    width: 80,
                    height: 80,
                    // borderRadius: 80,
                    // borderWidth: 0.3,
                  }}
                  // cachePolicy={"memory-disk"}
                />
              </View>
            );
          }}
          keyExtractor={(index) => `${index}`}
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

export const GeneralForms = connect(mapStateToProps, {})(GeneralFormsBare);
