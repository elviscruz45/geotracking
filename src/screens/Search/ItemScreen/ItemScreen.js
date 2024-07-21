import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { styles } from "./ItemScreen.styles";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
import { screen } from "../../../utils";
import { connect } from "react-redux";
import { saveActualServiceAIT } from "../../../actions/post";
import { EquipmentListUpper } from "../../../actions/home";
import { areaLists } from "../../../utils/areaList";
import { CircularProgress } from "./CircularProgress";
import { GanttHistorial } from "../../../components/Search/Gantt/Gantt";
import Toast from "react-native-toast-message";

function ItemScreenNotRedux(props) {
  const [sondaje, setSondaje] = useState();
  const [events, setEvents] = useState();

  //Retrieve data Item that comes from the previous screen to render the Updated Status
  const {
    route: {
      params: { Item },
    },
  } = props;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const queryRef1 = query(
          collection(db, "events"),
          where("IDSondaje", "==", Item),
          orderBy("createdAt", "desc")
        );
        const getDocs1 = await getDocs(queryRef1);
        const lista = [];
        // Process results from the first query

        getDocs1.forEach((doc) => {
          lista.push(doc.data());
        });

        setEvents(lista);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchDocuments();
  }, [Item]);
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const queryRef1 = query(
          collection(db, "Sondaje"),
          where("idSondaje", "==", Item)
        );
        const getDocs1 = await getDocs(queryRef1);
        const lista = [];
        //Process results from the first query

        getDocs1.forEach((doc) => {
          lista.push(doc.data());
        });

        setSondaje(lista[0]);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchDocuments();
  }, [Item]);
  ///function to date format
  const formatDate = (dateInput) => {
    const { seconds, nanoseconds } = dateInput || {
      seconds: 0,
      nanoseconds: 0,
    };
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const date = new Date(milliseconds);
    const monthNames = [
      "ene.",
      "feb.",
      "mar.",
      "abr.",
      "may.",
      "jun.",
      "jul.",
      "ago.",
      "sep.",
      "oct.",
      "nov.",
      "dic.",
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedDate = `${day} ${month} ${year} `;
    return formattedDate;
  };

  if (sondaje) {
    return (
      <>
        <ScrollView
          style={{ backgroundColor: "white" }} // Add backgroundColor here
          showsVerticalScrollIndicator={false}
        >
          <Text></Text>

          <View style={[styles.row, styles.center]}>
            <View>
              <CircularProgress
                imageStyle={styles.roundImage}
                titulo={sondaje.NombreServicio}
              />
            </View>
            <Text> </Text>
            <View style={{ marginLeft: 0 }}>
              <Text style={styles.name}>{sondaje.NombreServicio}</Text>

              <Text style={styles.info}>
                {"Fecha Inicio:  "} {formatDate(sondaje.FechaInicio)}
              </Text>
              <Text style={styles.info}>
                {"Pro Programado:  "} {sondaje.ProgProgramado}
                {" metros "}
              </Text>

              <Text style={styles.info}>
                {"Prog Ejecutado:  "} {sondaje.ProgEjecutado}
                {" metros "}
              </Text>

              <Text style={styles.info}>
                {"Cobertura:  "} {sondaje.Cobertura}
              </Text>

              <Text style={styles.info}>
                {"Logueado por:  "} {sondaje.LogueadoPor}
              </Text>
              <Text style={styles.info}>
                {"Estado:  "} {sondaje.Estado}
              </Text>
              <Text style={styles.info}>
                {"Metros Logueo:  "} {sondaje.MetrosLogueo}
              </Text>
              <Text style={styles.info}>
                {"Sector:  "} {sondaje.Sector}
              </Text>
            </View>
          </View>
          <Text></Text>

          <Text></Text>
          <Text></Text>

          <Text
            style={{
              marginLeft: 15,
              borderRadius: 5,
              fontWeight: "700",
              alignSelf: "center",
            }}
          >
            Historial de Eventos
          </Text>
          <Text></Text>

          <GanttHistorial datas={events} />
        </ScrollView>
      </>
    );
  } else {
    return <Text>Loading...</Text>;
  }
}

const mapStateToProps = (reducers) => {
  return {
    servicesData: reducers.home.servicesData,
    email: reducers.profile.email,

    // servicesData: reducers.home.servicesData,
    // totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
  };
};

export const ItemScreen = connect(mapStateToProps, {
  saveActualServiceAIT,
  EquipmentListUpper,
})(ItemScreenNotRedux);
