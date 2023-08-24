import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  FlatList,
  Text,
  Image,
} from "react-native";
import { Button, Icon } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { ConnectedInfoUser } from "../../../components/Account";
import { styles } from "./ProfileScreen.styles";
import { connect } from "react-redux";
import { update_firebaseUserUid } from "../../../actions/auth";
import { ConnectedChangeDisplayNameForm } from "../../../components/Account/ChangeDisplayNameForm";
import { Modal } from "../../../components/shared/Modal";
import { update_firebaseProfile } from "../../../actions/profile";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { ProfileDateScreen } from "../../../components/Profile/ProfileDateScreen/ProfileDateScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ProfileScreen(props) {
  const [_, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [post, setPost] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [removeFilter, setRemoveFilter] = useState(true);
  const [quantityBell, setQuantityBell] = useState(0);

  const navigation = useNavigation();

  const onReload = () => setReload((prevState) => !prevState);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    props.update_firebaseUserUid("");
    props.update_firebaseProfile("");
  };

  const update_Data = () => {
    setRenderComponent(
      <ConnectedChangeDisplayNameForm onClose={onCloseOpenModal} />
    );
    setShowModal(true);
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  //Changing the value to activate again the filter to rende the posts
  const filter = (start, end) => {
    console.log(start, end);
    setStartDate(start);
    setEndDate(end);
  };
  const quitfilter = () => {
    setRemoveFilter((prev) => !prev);
    setStartDate(null);
    setEndDate(null);
    console.log("removeFilter");
  };

  //This hook used to retrieve post data from Firebase and sorted by date

  useEffect(() => {
    console.log("UseEffectProfileScreen");

    let unsubscribe;
    let q;
    async function fetchData() {
      if (startDate && endDate) {
        q = query(
          collection(db, "events"),
          orderBy("createdAt", "desc"),
          where("emailPerfil", "==", props.email),
          where("createdAt", ">=", startDate),
          where("createdAt", "<=", endDate)
        );
      } else {
        q = query(
          collection(db, "events"),
          orderBy("createdAt", "desc"),
          where("emailPerfil", "==", props.email),
          limit(10) // Add the desired limit value here
        );
      }

      try {
        const querySnapshot = await getDocs(q);
        const lista = [];
        querySnapshot.forEach((doc) => {
          lista.push(doc.data());
        });
        // console.log("1.---GetDocsProfileScreen Item with date profile");
        console.log("1.---longitudListaProfileScreen", lista.length);

        setPost(lista);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
    return () => {
      // Unsubscribe from the previous listener when the component is unmounted or when the dependencies change
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [startDate, endDate, removeFilter, props.totalEventServiceAITLIST]);

  const comentPost = (item) => {
    console.log("item", item);
    navigation.navigate(screen.home.tab, {
      screen: screen.home.comment,
      params: { Item: item },
    });
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
      >
        <Text></Text>
        <View>
          {/* <ConnectedInfoUser bellQuantity={props?.approvalList?.length} /> */}
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
              onPress={update_Data}
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

        <ProfileDateScreen
          filterButton={filter}
          quitFilterButton={quitfilter}
        />

        <FlatList
          data={post}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => comentPost(item)}>
                <View>
                  <View style={styles.equipments2}>
                    <ImageExpo
                      source={{ uri: item.fotoPrincipal }}
                      style={styles.image2}
                      cachePolicy={"memory-disk"}
                    />
                    <View style={{ marginLeft: 5 }}>
                      <Text style={styles.name2}>{item.AITNombreServicio}</Text>
                      <Text style={styles.name2}>
                        {"Evento: "}
                        {item.titulo}
                      </Text>
                      <Text style={styles.info2}>{item.comentarios}</Text>
                      <Text style={styles.info2}>{item.fechaPostFormato}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.fotoPrincipal}
        />
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
