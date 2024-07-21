import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, FlatList, Text, Image } from "react-native";
import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { ConnectedInfoUser } from "../../../components/Account";
import { styles } from "./ProfileScreen.styles";
import { connect } from "react-redux";
import { update_firebaseUserUid } from "../../../actions/auth";
import { ConnectedChangeDisplayNameForm } from "../../../components/Account/ChangeDisplayNameForm";
import { Modal } from "../../../components/shared/Modal";
import { update_firebaseProfile } from "../../../actions/profile";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { ProfileDateScreen } from "../../../components/Profile/ProfileDateScreen/ProfileDateScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getExcelReportData } from "../../../utils/excelData";

function ProfileScreen(props) {
  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const regex = /@(.+?)\./i;
  const companyName =
    capitalizeFirstLetter(props.email?.match(regex)?.[1]) || "Anonimo";

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [post, setPost] = useState(null);
  //states of filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [removeFilter, setRemoveFilter] = useState(true);
  const [data, setData] = useState();

  const navigation = useNavigation();

  const logout = async () => {
    const auth = getAuth();

    await signOut(auth);
    props.update_firebaseUserUid("");
    props.update_firebaseProfile("");
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const update_Data = () => {
    setRenderComponent(
      <ConnectedChangeDisplayNameForm onClose={onCloseOpenModal} />
    );
    setShowModal(true);
  };

  useEffect(() => {
    setData(
      props.servicesData?.filter(
        (item) => item.companyName?.toUpperCase() === company
      )
    );
  }, []);
  return (
    <>
      <KeyboardAwareScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <Text></Text>
        <View>
          <ConnectedInfoUser />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              title="Editar"
              buttonStyle={styles.btnActualizarStyles}
              titleStyle={styles.btnTextStyle}
              onPress={() => update_Data()}
            />

            <Button
              title="Cerrar "
              buttonStyle={styles.btncerrarStyles}
              titleStyle={styles.btnTextStyle}
              onPress={logout}
            />
          </View>
        </View>
        <Text></Text>
        <Text></Text>

        <TouchableOpacity
          onPress={() => getExcelReportData(props.totalEventServiceAITLIST)}
        >
          <Image
            source={require("../../../../assets/excel2.png")}
            style={styles.excel}
          />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    profile: reducers.profile.firebase_user_name,
    email: reducers.profile.email,
    approvalQuantity: reducers.profile.approvalQuantity,
    approvalList: reducers.home.approvalList,
    totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
  };
};

export const ConnectedProfileScreen = connect(mapStateToProps, {
  update_firebaseUserUid,
  update_firebaseProfile,
})(ProfileScreen);
