import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { styles } from "./ChangeDisplayContratos.styles";
import { MultiSelectExample } from "./MultiSelection";

export function ChangeDisplayAdminContracts(props) {
  const { onClose, formik, setResponsableempresausuario } = props;
  const [text, setText] = useState([]);

  return (
    <View>
      <View style={styles.content}>
        <MultiSelectExample formik={formik} setText={setText} />
        <Button
          title="Aceptar"
          testID="accept-button"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            setResponsableempresausuario(text.join(","));
            formik.setFieldValue("ResponsableEmpresaUsuario", text.join(","));

            onClose();
          }} // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}
