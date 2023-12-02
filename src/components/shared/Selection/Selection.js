import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { Text } from "react-native";
import { chancadoraSecundaria } from "../../../utils/componentsList";

export const SelectExample = () => {
  const [selected, setSelected] = useState("");

  return (
    <>
      <SelectList
        setSelected={(val) => setSelected(val)}
        testID="SelectExample"
        data={chancadoraSecundaria}
        save="value"
        maxHeight={500}
      />
      {/* <Text testID="SelectExample">hola</Text> */}
    </>
  );
};
