import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import {
  etapaListGeneral,
  etapaListUsuario,
  etapaListContratista,
  etapaListUsuarioSupervision,
  etapaListContratistaPlanificador,
} from "../../../../utils/etapaList";
import { connect } from "react-redux";

export const SelectExampleBare = (props) => {
  const [selected, setSelected] = useState("");
  const { setText, formik } = props;

  const regex = /@(.+?)\./i;

  const companyName = props.email?.match(regex)?.[1].toUpperCase() || "Anonimo";
  console.log("companyName", companyName);

  const userType = props.profile?.userType;
  console.log("userType", userType);

  const etapaLists =
    
    companyName !== "PRODISE" &&
    userType === "Trabajador"
      ? etapaListUsuario
      : 
        companyName !== "PRODISE" &&
        userType !== "Trabajador"
      ? etapaListUsuarioSupervision
      : ( companyName === "PRODISE") &&
        userType === "Trabajador"
      ? etapaListContratista
      : etapaListContratistaPlanificador;

  function saveProperty(itemValue) {
    setText(itemValue);
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={etapaLists}
      save="value"
      maxHeight={300}
      onSelect={() => saveProperty(selected)}
    />
  );
};

const mapStateToProps = (reducers) => {
  return {
    email: reducers.profile.email,
    profile: reducers.profile.profile,
  };
};

export const SelectExample = connect(mapStateToProps, {})(SelectExampleBare);
