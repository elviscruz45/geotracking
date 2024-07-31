import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import {
  litologia,
  color,
  textura,
  fraccionamiento,
  alteracion,
  venillas,
  mineralizacion,
} from "../../../../utils/litologiaList";
import { connect } from "react-redux";

export const SelectExampleBare = (props) => {
  const [selected, setSelected] = useState("");
  const { setText, formik } = props;

  const regex = /@(.+?)\./i;

  const companyName = props.email?.match(regex)?.[1].toUpperCase() || "Anonimo";

  const userType = props.profile?.userType;

  function saveProperty(itemValue) {
    setText(itemValue);
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={venillas}
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
