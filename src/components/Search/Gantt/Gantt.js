import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./Gantt.styles";
import { Icon } from "@rneui/themed";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../utils";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import Toast from "react-native-toast-message";

export const GanttHistorial = (props) => {
  const { datas, comentPost } = props;
  const dataSorted = datas?.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  const navigation = useNavigation();

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
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  //Delete function
  const docDelete = async (idDoc) => {
    Alert.alert(
      "Eliminar Evento",
      "Estas Seguro que desear Eliminar el evento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            //delete the doc from events collections
            // navigation.navigate(screen.home.home);
            await deleteDoc(doc(db, "events", idDoc));
            navigation.navigate(screen.search.search);

            Toast.show({
              type: "success",
              position: "bottom",
              text1: "Se ha eliminado correctamente",
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  // go to edit screen
  const goToEditLogueoScreen = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.editLogueo,
      params: { Item: item },
    });
  };

  return (
    <FlatList
      scrollEnabled={false}
      contentContainerStyle={props.listViewContainerStyle}
      data={dataSorted}
      renderItem={({ item, index }) => {
        const timestampData = item.createdAt;
        const timestampInMilliseconds =
          timestampData.seconds * 1000 + timestampData.nanoseconds / 1000000;
        const date = new Date(timestampInMilliseconds); // Function to get the abbreviated month name
        function getAbbreviatedMonthName(monthNumber) {
          const months = [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Oct",
            "Nov",
            "Dic",
          ];
          return months[monthNumber];
        }
        // Create the formatted string "dd MMM" (e.g., "28 Ago")
        const day = date.getDate();
        const month = getAbbreviatedMonthName(date.getMonth());
        const formattedDate = `${day} ${month}`;

        //get the company name from the userEmail
        const regex = /@(.+?)\./i;
        const matches = item.emailPerfil.match(regex);

        return (
          <View style={{ marginLeft: 15 }}>
            <View style={[styles.rowContainer]}>
              <View style={styles.timeWrapper}>
                <View style={[styles.timeContainer, styles.timeContainerStyle]}>
                  <Text
                    style={[
                      styles.time,
                      styles.timeStyle,
                      { textAlign: "center", marginTop: 10, marginLeft: -5 },
                    ]}
                    allowFontScaling={true}
                  >
                    {formattedDate}
                  </Text>
                  <View>
                    <TouchableOpacity
                      onPress={() => goToEditLogueoScreen(item)}
                    >
                      <View style={{ marginRight: "5%" }}>
                        <ImageExpo
                          source={require("../../../../assets/editIcon2.png")}
                          style={styles.editIcon}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.circle]}>
              {matches[1] !== "southernperu" ? (
                <ImageExpo
                  // source={require("../../../../assets/smcv2.jpeg")}
                  source={item.icon}
                  style={{ width: 20, height: 20 }}
                  cachePolicy={"memory-disk"}
                />
              ) : (
                <ImageExpo
                  source={item.icon}
                  style={{ width: 20, height: 20 }}
                  cachePolicy={"memory-disk"}
                />
              )}
            </View>

            <View style={styles.details}>
              <Text style={styles.titledetails}>{item.title}</Text>

              <View style={styles.row}>
                <ImageExpo
                  source={{ uri: item.fotoUsuarioPerfil }}
                  cachePolicy={"memory-disk"}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginLeft: 5,
                  }}
                />
                <Text style={styles.textdetail}>{item.previa}</Text>
              </View>

              <Text></Text>

              <View style={styles.rowavanceNombre}>
                <Text style={styles.avanceNombre}> Ejecutado Inicial: </Text>

                <Text style={styles.detail}>
                  {item.MetrosLogueoInicio} metros
                </Text>
              </View>
              <View style={styles.rowavanceNombre}>
                <Text style={styles.avanceNombre}> Ejecutado Final: </Text>

                <Text style={styles.detail}>
                  {item.MetrosLogueoFinal} metros
                </Text>
              </View>
              <View style={styles.rowavanceNombre}>
                <Text style={styles.avanceNombre}> Recepcionado Inicial: </Text>

                <Text style={styles.detail}>
                  {item.MetrosRecepcionadoInicio} metros
                </Text>
              </View>
              <View style={styles.rowavanceNombre}>
                <Text style={styles.avanceNombre}> Recepcionado Final: </Text>

                <Text style={styles.detail}>
                  {item.MetrosRecepcionadoFinal} metros
                </Text>
              </View>
              <View style={styles.rowavanceNombre}>
                <Text style={styles.avanceNombre}> Cajas Inicial: </Text>

                <Text style={styles.detail}>{item.CajaLogueoInicio}</Text>
              </View>
              <View style={styles.rowavanceNombre}>
                <Text style={styles.avanceNombre}> Cajas Final: </Text>

                <Text style={styles.detail}>{item.CajaLogueoFinal}</Text>
              </View>
              <View style={styles.rowavanceNombre}>
                <Text style={styles.avanceNombre}> Autor: </Text>
                <Text style={styles.detail}> {item.nombrePerfil}</Text>
              </View>
              <View style={styles.rowavanceNombre}>
                <Text style={styles.avanceNombre}> Fecha: </Text>
                <Text style={styles.detail}> {formatDate(item.createdAt)}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => docDelete(item.IDReporte)}
              style={{
                marginRight: "5%",
              }}
            >
              <ImageExpo
                source={require("../../../../assets/deleteIcon.png")}
                style={styles.roundImage10}
                cachePolicy={"memory-disk"}
              />
            </TouchableOpacity>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            {/* <View style={{ width: 2 }}></View> */}
          </View>
        );
      }}
      keyExtractor={(item, index) => `${index}-${item.createdAt}`}
    />
  );
};
