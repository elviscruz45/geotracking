import { View, Text, Linking, Button } from "react-native";
import React, { useState } from "react";
import { styles } from "./ReportForm.styles";
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

export function ReportForm(props) {
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
        <ChangeDisplayMetrosLogueo onClose={onCloseOpenModal} formik={formik} />
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
        <View style={styles.container22}>
          <Text style={styles.titleText}>Avance de Guardia</Text>
        </View>
        <Text></Text>
        <Input
          value={formik.values.GuardiaDia}
          label="Guardia Dia"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("GuardiaDia", text);
          }}
        />
        <Input
          value={formik.values.GuardiaNoche}
          label="Guardia Noche"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("GuardiaNoche", text);
          }}
        />
        <View style={styles.container22}>
          <Text style={styles.titleText}>Avance del Mes Actual</Text>
        </View>
        <Text></Text>

        <Input
          value={formik.values.MesPlanificado}
          label="Mes Planificado"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("MesPlanificado", text);
          }}
        />
        <Input
          value={formik.values.MesAvanzado}
          label="Mes Avanzado"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("MesAvanzado", text);
          }}
        />
        <View style={styles.container22}>
          <Text style={styles.titleText}>Avance Total</Text>
        </View>
        <Text></Text>

        <Input
          value={formik.values.TotalPlanificado}
          label="Total Planificado"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("TotalPlanificado", text);
          }}
        />
        <Input
          value={formik.values.TotalAvanzado}
          label="Total Avanzado"
          keyboardType="numeric"
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("TotalAvanzado", text);
          }}
        />
      </View>

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}
