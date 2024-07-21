import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayFraccionamiento.styles";
import { SelectExample } from "./Selection";

export function ChangeDisplayFraccionamiento(props) {
  const { onClose, formik } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <SelectExample setText={setText} formik={formik} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            formik.setFieldValue("fraccionamiento", text.toString());

            onClose();
          }}
        />
      </View>
    </View>
  );
}
