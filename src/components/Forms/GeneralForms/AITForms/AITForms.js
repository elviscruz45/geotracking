import { View, Text, Linking, Button } from "react-native";
import React, { useState } from "react";
import { styles } from "./AITForms.styles";
import { Input } from "@rneui/themed";
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDisplayArea } from "../../FormsAIT/ChangeEstado/ChangeDisplayEstado";

import { ChangeDisplayMonto } from "../../FormsAIT/ChangeProgEjecutado/ChangeDisplayProgEjecutado";

import { ChangeDisplayFechaInicio } from "../../FormsAIT/ChangeFechaInicio/ChangeDisplayFechaInicio";
import { ChangeDisplayFechaFin } from "../../FormsAIT/ChangeFechaFin/ChangeDisplayFechaFin";
import { ChangeDisplayEstado } from "../../FormsAIT/ChangeEstado/ChangeDisplayEstado";
import { ChangeDisplayProgEjecutado } from "../../FormsAIT/ChangeProgEjecutado/ChangeDisplayProgEjecutado";
import { ChangeDisplayProgProgramado } from "../../FormsAIT/ChangeProgProgramado/ChangeDisplayProgProgramado";
import { ChangeDisplayCobertura } from "../../FormsAIT/ChangeCobertura/ChangeDisplayCobertura";
import { ChangeDisplayMetrosLogueo } from "../../FormsAIT/ChangeMetrosLogueo/ChangeDisplayMetrosLogueo";

export function AITForms(props) {
  const { formik, setTituloserv, setAit, setTiposerv, setArea } = props;
  const [renderComponent, setRenderComponent] = useState(null);

  //state to render the header

  //state of displays
  // const [numeroAIT, setnumeroAIT] = useState(null);
  const [Sondaje, setSondaje] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [estado, setEstado] = useState(null);
  const [progEjecutado, setProgEjecutado] = useState(null);
  const [progProgramado, setProgProgramado] = useState(null);
  const [cobertura, setCobertura] = useState(null);

  const [responsableempresausuario, setResponsableempresausuario] =
    useState(null);
  const [responsableempresausuario2, setResponsableempresausuario2] =
    useState(null);
  const [responsableempresausuario3, setResponsableempresausuario3] =
    useState(null);

  const [responsableempresacontratista, setResponsableempresacontratista] =
    useState(null);

  const [responsableempresacontratista2, setResponsableempresacontratista2] =
    useState(null);

  const [responsableempresacontratista3, setResponsableempresacontratista3] =
    useState(null);
  const [fechafin, setFechafin] = useState(null);
  const [numerocotizacion, setNumerocotizacion] = useState(null);
  const [moneda, setMoneda] = useState(null);
  const [monto, setMonto] = useState(null);
  const [supervisorSeguridad, setSupervisorSeguridad] = useState(null);
  const [supervisor, setSupervisor] = useState(null);
  const [tecnicos, setTecnicos] = useState(null);
  const [horashombre, setHorashombre] = useState(null);
  // const [showTimePicker, setShowTimePicker] = useState(false);
  //open or close modal
  const [showModal, setShowModal] = useState(false);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  ///function to date format
  const formatdate = (item) => {
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
    if (!item) {
      return;
    } else {
      return fechaPostFormato;
    }
  };

  //function to format money
  const formatNumber = (item) => {
    const amount = item;

    const formattedAmount = new Intl.NumberFormat("en-US").format(amount);
    if (!item) {
      return;
    } else {
      return formattedAmount;
    }
  };

  const selectComponent = (key) => {
    if (key === "FechaInicio") {
      setRenderComponent(
        <ChangeDisplayFechaInicio onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "FechaFin") {
      setRenderComponent(
        <ChangeDisplayFechaFin onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "Estado") {
      setRenderComponent(
        <ChangeDisplayEstado onClose={onCloseOpenModal} formik={formik} />
      );
    }

    if (key === "ProgEjecutado") {
      setRenderComponent(
        <ChangeDisplayProgEjecutado
          onClose={onCloseOpenModal}
          formik={formik}
        />
      );
    }
    if (key === "ProgProgramado") {
      setRenderComponent(
        <ChangeDisplayProgProgramado
          onClose={onCloseOpenModal}
          formik={formik}
        />
      );
    }
    if (key === "Cobertura") {
      setRenderComponent(
        <ChangeDisplayCobertura onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "MetrosLogueo") {
      setRenderComponent(
        <ChangeDisplayMonto onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "Sector") {
      setRenderComponent(
        <ChangeDisplayArea onClose={onCloseOpenModal} formik={formik} />
      );
    }

    onCloseOpenModal();
  };

  return (
    <View>
      <View style={styles.content}>
        <Input
          value={formik.values.Sondaje}
          placeholder="Sondaje"
          // multiline={true}
          editable={true}
          // errorMessage={formik.errors.EmpresaMinera}
          onChangeText={(text) => {
            formik.setFieldValue("NombreServicio", text);
          }}
        />
        <Input
          value={formatdate(formik.values.FechaInicio)}
          placeholder="Fecha de Inicio"
          multiline={true}
          editable={false}
          // errorMessage={formik.errors.FechaInicio}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => {
              selectComponent("FechaInicio");
            },
          }}
        />

        <Input
          value={formik.values.Estado}
          placeholder="Estado"
          editable={false}
          // errorMessage={formik.errors.TipoServicio}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("Estado"),
          }}
        />
        <Input
          value={formatNumber(formik.values.ProgEjecutado)}
          placeholder="Prog Ejecutado"
          editable={false}
          // errorMessage={formik.errors.HorasHombre}
          rightIcon={{
            type: "material-community",
            name: "numeric",
            // color: getColorIconMap(formik),
            onPress: () => selectComponent("ProgEjecutado"),
          }}
        />
        <Input
          value={formatNumber(formik.values.ProgProgramado)}
          placeholder="Prog Programado"
          editable={false}
          // errorMessage={formik.errors.HorasHombre}
          rightIcon={{
            type: "material-community",
            name: "numeric",
            // color: getColorIconMap(formik),
            onPress: () => selectComponent("ProgProgramado"),
          }}
        />
        <Input
          value={formatNumber(formik.values.Cobertura)}
          placeholder="Cobertura"
          editable={false}
          // errorMessage={formik.errors.HorasHombre}
          rightIcon={{
            type: "material-community",
            name: "numeric",
            // color: getColorIconMap(formik),
            onPress: () => selectComponent("Cobertura"),
          }}
        />

        <Input
          value={formatNumber(formik.values.MetrosLogueo)}
          placeholder="Metros de Logueo"
          editable={false}
          // errorMessage={formik.errors.HorasHombre}
          rightIcon={{
            type: "material-community",
            name: "numeric",
            // color: getColorIconMap(formik),
            onPress: () => selectComponent("MetrosLogueo"),
          }}
        />
        <Input
          value={formik.values.Sector}
          placeholder="Sector"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("Sector", text);
          }}
          // errorMessage={formik.errors.TipoServicio}
          // rightIcon={{
          //   type: "material-community",
          //   name: "arrow-right-circle-outline",
          //   onPress: () => selectComponent("Sector"),
          // }}
        />
        <Input
          value={formatdate(formik.values.FechaFin)}
          placeholder="Opcional* Fecha de Fin"
          multiline={true}
          editable={false}
          // errorMessage={formik.errors.FechaInicio}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => {
              selectComponent("FechaFin");
            },
          }}
        />
      </View>

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}
