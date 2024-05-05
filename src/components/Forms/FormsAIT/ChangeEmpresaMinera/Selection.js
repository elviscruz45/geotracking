import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { tipoServicioList } from "../../../../utils/tipoServicioList";
import { mineraList } from "../../../../utils/MineraList";

export const SelectExample = (props) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  const { formik, setText } = props;

  function saveProperty(itemValue) {
    setText(itemValue);
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={mineraList}
      save="value"
      maxHeight={200}
      onSelect={() => saveProperty(selected)}
    />
  );
};
