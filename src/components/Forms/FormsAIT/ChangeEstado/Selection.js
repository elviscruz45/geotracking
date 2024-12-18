import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { areaLists } from "../../../../utils/areaList";
import { EstadoList } from "../../../../utils/EstadoList";

export const SelectExample = (props) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  const { setText, formik } = props;

  function saveProperty(itemValue) {
    setText(itemValue);
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={EstadoList}
      testID="ChangeDisplayArea:SelectList"
      save="value"
      maxHeight={300}
      onSelect={() => saveProperty(selected)}
    />
  );
};
