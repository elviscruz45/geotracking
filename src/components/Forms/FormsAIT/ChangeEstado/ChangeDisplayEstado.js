import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayEstado.styles";
import { SelectExample } from "./Selection";

export function ChangeDisplayEstado(props) {
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
          testID="ChangeDisplayArea:Button"
          onPress={() => {
            formik.setFieldValue("Estado", text.toString());
            onClose();
          }}
          // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}
