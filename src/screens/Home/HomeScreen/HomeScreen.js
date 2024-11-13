import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "@rneui/themed";
import { styles } from "./HomeScreen.styles";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  limit,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../utils";
import { LoadingSpinner } from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";
import { HeaderScreen } from "../../../components/Home";
import { saveTotalEventServiceAITList } from "../../../actions/home";
import { areaLists } from "../../../utils/areaList";
import { resetPostPerPageHome } from "../../../actions/home";
import { saveApprovalListnew } from "../../../actions/search";
import { updateAITServicesDATA } from "../../../actions/home";
import { mineraCorreosList } from "../../../utils/MineraList";
import Toast from "react-native-toast-message";
import { MontoEDPList } from "../RecursosScreen/MontoEDPList";
import { AvanceGuardia } from "../RecursosScreen/AvanceGuardia";
import { AvanceMes } from "../RecursosScreen/AvanceMes";
import { AvanceTotal } from "../RecursosScreen/AvanceTotal";

function HomeScreen(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [data, setData] = useState();
  const navigation = useNavigation();
  const [dataReport, setDataReport] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  console.log("actualizar", actualizar);
  //Data about the company belong this event
  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const regex = /@(.+?)\./i;
  useEffect(() => {
    // Function to fetch data from Firestore
    async function fetchData() {
      try {
        const queryRef1 = query(
          collection(db, "Reporte"),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const getDocs1 = await getDocs(queryRef1);
        const lista = [];

        // Process results from the first query
        if (getDocs1) {
          getDocs1.forEach((doc) => {
            lista.push(doc.data());
          });
        }

        setDataReport(lista);
      } catch (error) {
        // console.error("Error fetching data:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cargar los datos",
        });
        // Handle the error as needed
      }
    }
    // Call the fetchData function when the component mounts
    fetchData();
  }, [actualizar]);

  useEffect(() => {
    if (Array.isArray(props.servicesData)) {
      setData(props.servicesData);
    }
  }, [props.servicesData]);

  // this useEffect is used to retrive all data from firebase
  useEffect(() => {
    let unsubscribe;

    if (props.email) {
      const companyName =
        capitalizeFirstLetter(props.email?.match(regex)?.[1]) || "Anonimo";
      const companyNameLowercase = companyName.toLowerCase();

      async function fetchData() {
        let queryRef;
        if (companyName !== "Southernperu") {
          queryRef = query(
            collection(db, "events"),
            limit(25),
            orderBy("createdAt", "desc")
          );
        } else {
          queryRef = query(
            collection(db, "events"),
            limit(25),
            orderBy("createdAt", "desc")
          );
        }
        unsubscribe = onSnapshot(queryRef, async (ItemFirebase) => {
          const lista = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
          });
          //order the list by date
          lista.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });

          setPosts(lista);
          setCompanyName(companyName);
          props.saveTotalEventServiceAITList(lista);
        });
        setIsLoading(false);
      }

      fetchData();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [props.email]);

  const goToEdit = () => {
    navigation.navigate(screen.home.comment);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <Text></Text>

      <View style={{ flexDirection: "row", alignContent: "space-around" }}>
        <TouchableOpacity onPress={() => setActualizar((prev) => !prev)}>
          <Image
            source={require("../../../../assets/southernLogoVer2.png")}
            style={{
              marginHorizontal: 30,
              width: 38,
              height: 38,
              // alignSelf: "center",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToEdit()}>
          <Image
            source={require("../../../../assets/editIcon2.png")}
            style={{
              width: 30,
              height: 30,
              // alignSelf: "center",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: 0, width: 0 }}>
        <HeaderScreen />
      </View>

      <Text></Text>
      <Text></Text>

      <Image
        source={require("../../../../assets/empresa.png")}
        style={styles.roundImageUpload}
      />
      <Text></Text>

      <Text style={styles.company}>Reporte General</Text>
      <Text></Text>
      <Text></Text>
      <Text style={{ marginLeft: 5 }}>Fecha: {dataReport[0]?.fechaPost}</Text>
      <Text></Text>

      <Text style={{ marginLeft: 5 }}>
        Reportado por: {dataReport[0]?.emailPerfil}
      </Text>
      <Text></Text>
      <Text></Text>
      <View style={styles.container22}>
        <Text style={styles.titleText}>Avance de Guardia</Text>
      </View>
      <AvanceGuardia dataReport={dataReport} />
      <View style={styles.container22}>
        <Text style={styles.titleText}>Avance del Mes Actual</Text>
      </View>
      <AvanceMes dataReport={dataReport} />
      <View style={styles.container22}>
        <Text style={styles.titleText}>Avance Total</Text>
      </View>
      <AvanceTotal dataReport={dataReport} />
    </ScrollView>
  );
}

const mapStateToProps = (reducers) => {
  return {
    email: reducers.profile.email,
    user_photo: reducers.profile.user_photo,
    // postPerPage: reducers.home.postPerPage,
  };
};

export const ConnectedHomeScreen = connect(mapStateToProps, {
  saveTotalEventServiceAITList,
  resetPostPerPageHome,
  saveApprovalListnew,
  updateAITServicesDATA,
})(HomeScreen);
