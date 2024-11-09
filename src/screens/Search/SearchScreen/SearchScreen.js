import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./SearchScreen.styles";
import { SearchBar, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { connect } from "react-redux";
import { EquipmentListUpper } from "../../../actions/home";
import { areaLists } from "../../../utils/areaList";

function convertFirestoreTimestamp(timestamp) {
  return new Date(timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000);
}

function SearchScreenNoRedux(props) {
  let AITServiceList;
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();

  //Data about the company belong this event
  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const regex = /@(.+?)\./i;
  const companyName =
    capitalizeFirstLetter(props.email?.match(regex)?.[1]) || "Anonimo";

  // if (!data && !searchResults) {
  //   setData(props.servicesData);
  //   setSearchResults(props.servicesData?.slice(0, 100));
  // }

  //This is used to retrieve the the services we are filtering and sorting
  useEffect(() => {
    AITServiceList = props.servicesData;
    if (Array.isArray(AITServiceList)) {
      let AITServiceListSorted = AITServiceList.sort((a, b) => {
        const dateA = convertFirestoreTimestamp(a?.FechaUltimaActualizacion);
        const dateB = convertFirestoreTimestamp(b?.FechaUltimaActualizacion);
        return dateB - dateA;
      });
      setData(AITServiceListSorted);
      setSearchResults(AITServiceListSorted?.slice(0, 100));
    }
  }, [props.servicesData]);

  useEffect(() => {
    if (searchText === "") {
      setSearchResults(data?.slice(0, 100));
    } else {
      const result = data?.filter((item) => {
        const re = new RegExp(searchText, "ig");
        return (
          re.test(item.NombreServicio) ||
          re.test(item.NumeroAIT) ||
          re.test(item.NumeroCotizacion) ||
          re.test(item.TipoServicio) ||
          re.test(item.companyName) ||
          re.test(item.EmpresaMinera)
        );
      });

      setSearchResults(result.slice(0, 50));
    }
  }, [searchText]);
  //to initialize the data in null

  useEffect(() => {
    if (!data && !searchResults) {
      AITServiceList = props.servicesData;
      setData(props.servicesData);
      setSearchResults(props.servicesData?.slice(0, 100));
    }
  }, []);

  //this method is used to go to a screen to see the status of the item
  const selectAsset = (idServiciosAIT) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: idServiciosAIT },
    });
  };

  if (props.servicesData?.length === 0 || !props.email || !data) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 50,
            // fontFamily: "Arial",
            color: "#2A3B76",
          }}
        >
          Bienvenido
        </Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={searchResults}
        ListHeaderComponent={
          <SearchBar
            placeholder="Buscar Sondaje"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            lightTheme={true}
            inputContainerStyle={{ backgroundColor: "white" }}
          />
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item, index }) => {
          //the algoritm to retrieve the image source to render the icon

          const area = item.AreaServicio;
          const indexareaList = areaLists.findIndex(
            (item) => item.value === area
          );
          const imageSource = areaLists[indexareaList]?.image;

          return (
            <TouchableOpacity
              onPress={() => selectAsset(item.idSondaje)}
              style={{ backgroundColor: "white" }} // Add backgroundColor here
            >
              <View style={styles.equipments}>
                {item.photoServiceURL ? (
                  <ImageExpo
                    source={{ uri: item.photoServiceURL }}
                    style={styles.image}
                    cachePolicy={"memory-disk"}
                  />
                ) : (
                  <ImageExpo
                    source={
                      imageSource ||
                      require("../../../../assets/perforadora.jpg")
                    }
                    style={styles.image}
                    cachePolicy={"memory-disk"}
                  />
                )}
                <View>
                  <Text style={styles.name}>{item.NombreServicio}</Text>
                  <Text style={styles.info}>
                    {"Estado: "}
                    {item.Estado}
                  </Text>
                  <Text style={styles.info}>
                    {"Metros Perforados: "}
                    {item.ProgEjecutado}
                  </Text>
                  <Text style={styles.info}>
                    {"Ultima actualización: "}
                    {item.FechaUltimaActualizacionFormat}
                  </Text>

                  {companyName !== item.companyName && (
                    <Text style={styles.info}>
                      {"Empresa: "}
                      {item.companyName}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => `${index}-${item.fechaPostFormato}`}
      />
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return {
    servicesData: reducers.home.servicesData,
    email: reducers.profile.email,
    // user_photo: reducers.profile.user_photo,
  };
};

export const SearchScreen = connect(mapStateToProps, { EquipmentListUpper })(
  SearchScreenNoRedux
);
