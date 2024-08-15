import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Icon, SearchBar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveActualServiceAIT } from "../../../actions/post";
import { styles } from "./PostScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import * as ImagePicker from "expo-image-picker";
import { savePhotoUri } from "../../../actions/post";
import * as ImageManipulator from "expo-image-manipulator";
import { areaLists } from "../../../utils/areaList";
import { saveActualAITServicesFirebaseGlobalState } from "../../../actions/post";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image as ImageExpo } from "expo-image";
import Toast from "react-native-toast-message";

function PostScreen(props) {
  const emptyimage = require("../../../../assets/splash.png");
  const navigation = useNavigation();
  const [equipment, setEquipment] = useState(null);
  const [AIT, setAIT] = useState(null);
  const [logueo, setLogueo] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  //retrieving serviceAIT list data from firebase
  useEffect(() => {
    let servicesList = props.servicesData;
    if (Array.isArray(servicesList)) {
      servicesList.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      setPosts(servicesList);
    }
  }, [props.servicesData]);

  //This is used to retrieve the servicies AIT we are looking for

  useEffect(() => {
    if (searchText === "") {
      setSearchResults(posts.slice(0, 50));
    } else {
      const result = posts.filter((item) => {
        const re = new RegExp(searchText, "ig");
        return re.test(item.NumeroAIT) || re.test(item.NombreServicio);
      });
      setSearchResults(result.slice(0, 50));
    }
  }, [searchText, posts]);

  //method to retrieve the picture required in the event post (pick Imagen, take a photo)
  const pickImage = async (AITServiceNumber) => {
    if (!logueo) {
      Toast.show({
        type: "error",
        text1: "Escoge un logueo para continuar",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }
    if (!logueo) return;

    navigation.navigate(screen.post.form);
  };

  //Addin a new Service asigned called AIT

  const addAIT = () => {
    navigation.navigate(screen.post.aitform);
    setEquipment(null);
    setAIT(null);
  };

  const selectAsset = async (AIT) => {
    await setAIT(AIT);
    await setLogueo(AIT);
    await props.saveActualServiceAIT(AIT);

    pickImage(AIT?.TipoServicio);
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "white" }}
    >
      <SearchBar
        placeholder="Buscar Sondaje"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        lightTheme={true}
        inputContainerStyle={{ backgroundColor: "white" }}
      />

      {props.firebase_user_name && (
        <View style={styles.equipments2}>
          <View>
            {/* <ImageExpo
              source={equipment ?? emptyimage}
              style={styles.roundImage}
              cachePolicy={"memory-disk"}
            /> */}

            <View>
              <Text style={styles.name2}>Logueo</Text>
              <Text style={styles.name3}>
                {logueo ? logueo?.NombreServicio : "Numero de Logueo"}
              </Text>
            </View>
          </View>
        </View>
      )}
      {props.firebase_user_name && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            justifyContent: "space-between",

            // paddingHorizontal: 150,
          }}
        >
          <TouchableOpacity
            style={styles.btnContainer2}
            // onPress={() => pickImage(AIT?.TipoServicio)}
          >
            <Image
              source={require("../../../../assets/AddImage.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer3}
            // onPress={() => camera(AIT?.TipoServicio)}
          >
            {/* <Image
              source={require("../../../../assets/TakePhoto2.png")}
              style={styles.roundImageUpload}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer4}
            onPress={() => addAIT()}
          >
            <Image
              source={require("../../../../assets/newService7.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={searchResults}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          const area = item.AreaServicio;
          const indexareaList = areaLists.findIndex(
            (item) => item.value === area
          );
          const imageSource = areaLists[indexareaList]?.image;

          return (
            <TouchableOpacity
              onPress={() => selectAsset(item)}
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
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => `${index}-${item.fechaPostFormato}`} // Provide a unique key for each item
      />
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (reducers) => {
  return {
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    servicesData: reducers.home.servicesData,
  };
};

export const ConnectedPostScreen = connect(mapStateToProps, {
  saveActualServiceAIT,
  savePhotoUri,
  saveActualAITServicesFirebaseGlobalState,
})(PostScreen);
