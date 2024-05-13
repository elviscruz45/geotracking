import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeTecnicos.styles";
import Toast from "react-native-toast-message";

export function ChangeTecnicos(props) {
  const { onClose, ChangeTecnicos, formik } = props;
  const [text, setText] = useState("0");

  return (
    <View>
      <View style={styles.content}>
        <Input
          value={text}
          testID="ChangeDisplayHH:Input"
          placeholder="Horas Hombre en Cotizacion"
          // editable={true}
          keyboardType="numeric"
          onChangeText={(text) => setText(text)}
          // errorMessage={formik.errors.NumeroAIT}
        />
        <Button
          title="Aceptar"
          testID="ChangeDisplayHH:Button"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            if (isNaN(text)) {
              Toast.show({
                type: "error",
                position: "bottom",
                text1: "Ingrese un número válido",
              });
              onClose();
            } else if (text.trim() === "" || text < 0) {
              Toast.show({
                type: "error",
                position: "bottom",
                text1: "Solo numeros mayores a 0",
              });
              onClose();
            } else {
              ChangeTecnicos(text.toString());
              formik.setFieldValue("Tecnicos", text.toString());

              onClose();
            }
          }}
          // loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}