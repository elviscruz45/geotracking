import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./LoginForm.data";
import { styles } from "./LoginForm.styles";
import { connect } from "react-redux";
import { update_firebaseUserUid } from "../../../actions/auth";
import { update_firebaseProfile } from "../../../actions/profile";
import { db } from "../../../utils";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const onShowHidePassword = () => setShowPassword((prevState) => !prevState);

  const retrieveData = async () => {
    try {
      const emailPersist = (await AsyncStorage.getItem("emailPersist")) ?? "";
      const passwordPersist =
        (await AsyncStorage.getItem("passwordPersist")) ?? "";

      formik.setFieldValue("email", JSON.parse(emailPersist));
      formik.setFieldValue("password", JSON.parse(passwordPersist));
    } catch (error) {
      console.log("error", error);
      // Error retrieving data
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );

        const user_uid = userCredential.user.uid;

        const docRef = doc(db, "users", user_uid);

        const docSnap = await getDoc(docRef);

        props.update_firebaseUserUid(userCredential.user.uid);
        await AsyncStorage.setItem(
          "emailPersist",
          JSON.stringify(formValue.email)
        );
        await AsyncStorage.setItem(
          "passwordPersist",
          JSON.stringify(formValue.password)
        );
        if (docSnap?.exists()) {
          props.update_firebaseProfile(docSnap.data());
        } else {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Actualice sus datos en el perfil para comenzar",
          });
          navigation.navigate(screen.profile.tab, {
            screen: screen.profile.account,
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Usuario o contraseña incorrectos",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        value={formik.values.email}
        placeholder="Correo electronico"
        autoCapitalize="none"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        value={formik.values.password}
        placeholder="Contraseña"
        autoCapitalize="none"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={onShowHidePassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Iniciar sesión"
        testID="submitButton" // Add testID here
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return reducers.auth;
};

export const ConnectedLoginForm = connect(mapStateToProps, {
  update_firebaseUserUid,
  update_firebaseProfile,
})(LoginForm);
