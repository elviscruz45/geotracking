import React, { useEffect, useState, useCallback } from "react";
import { Text, View, FlatList, TouchableOpacity, Linking } from "react-native";
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

function HomeScreen(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const navigation = useNavigation();
  //Data about the company belong this event
  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const regex = /@(.+?)\./i;

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
            limit(20),
            where("visibilidad", "==", "Todos"),
            where(
              "AITEmpresaMinera",
              "==",
              mineraCorreosList[companyNameLowercase]
            ),

            orderBy("createdAt", "desc")
          );
        } else {
          queryRef = query(
            collection(db, "events"),
            limit(10),
            where("AITcompanyName", "==", companyName),
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

  useEffect(() => {
    let unsubscribe;
    if (props.email) {
      function fetchData() {
        let queryRef = query(
          collection(db, "approvals"),
          orderBy("date", "desc"),
          where("ApprovalRequestSentTo", "array-contains", props.email),
          limit(25)
        );
        unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
          const lista = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
          });
          props.saveApprovalListnew(lista);
        });
      }
      fetchData();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [props.email]);

  const loadMorePosts = () => {
    props.resetPostPerPageHome(props.postPerPage);
  };

  //---This is used to get the attached file in the post that contain an attached file---
  const uploadFile = useCallback(async (uri) => {
    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Unable to open PDF document",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error opening PDF document",
      });
    }
  }, []);

  //---activate like/unlike Post using useCallback--------
  const likePost = useCallback(
    async (item) => {
      const postRef = doc(db, "events", item.idDocFirestoreDB);

      if (item.likes?.includes(props.email)) {
        await updateDoc(postRef, {
          likes: arrayRemove(props.email),
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(props.email),
        });
      }
    },
    [props.email]
  );

  //--To goes to comment screen using callBack-----
  const commentPost = useCallback(
    (item) => {
      navigation.navigate(screen.home.tab, {
        screen: screen.home.comment,
        params: { Item: item },
      });
    },
    [navigation]
  );

  // goToServiceInfo
  const goToServiceInfo = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item.AITidServicios },
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (true) {
    return (
      <View
        style={{
          // alignItems: "center",
          flex: 1,
          marginLeft: 5,
        }}
      >
        <View
          style={{
            // alignItems: "center",
            opacity: 0,
            height: 0,
          }}
        >
          <HeaderScreen />
        </View>
        <View
          style={{
            // flex: 1,
            backgroundColor: "white",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 50,
              // fontFamily: "Arial",
              color: "#2A3B76",

              textAlign: "center",
            }}
          >
            Sondajes App
          </Text>
          <Text></Text>
          <Text
            style={{
              fontSize: 30,
              // fontFamily: "Arial",
              color: "#2A3B76",
            }}
          >
            Instrucciones de uso:
          </Text>
          <Text></Text>

          <Text
            style={{
              fontSize: 20,
              // fontFamily: "Arial",
              color: "#2A3B76",
            }}
          >
            1. En la parte superior se encuentran todos los sondeos
          </Text>
          <Text
            style={{
              fontSize: 20,
              // fontFamily: "Arial",
              color: "#2A3B76",
            }}
          >
            2. En el boton de publicar, se crearan nuevos sondeos o se reportara
            una actualizacion de los mismos
          </Text>
          <Text
            style={{
              fontSize: 20,
              // fontFamily: "Arial",
              color: "#2A3B76",
            }}
          >
            3. En el boton de buscar, se encuentra tambien la lista de todos los
            sondeos
          </Text>
          <Text></Text>

          <ImageExpo
            source={require("../../../../assets/michiquillay.jpg")}
            style={styles.roundImage1}
            cachePolicy={"memory-disk"}
          />
        </View>
      </View>
    );
  } else {
    return (
      <>
        <FlatList
          data={posts}
          ListHeaderComponent={<HeaderScreen />}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white" }}
          renderItem={({ item }) => {
            //the algoritm to retrieve the image source to render the icon
            const area = item.AITAreaServicio;
            const indexareaList = areaLists.findIndex(
              (item) => item.value === area
            );
            const imageSource =
              areaLists[indexareaList]?.image ??
              require("../../../../assets/icon1.png");

            return (
              <View
                style={{
                  // margin: 2,
                  borderBottomWidth: 5,
                  borderBottomColor: "#f0f8ff",
                  paddingVertical: 10,
                }}
              >
                <View style={[styles.row, styles.center]}>
                  <View style={[styles.row, styles.center]}>
                    <TouchableOpacity
                      style={[styles.row, styles.center]}
                      onPress={() => goToServiceInfo(item)}
                    >
                      {item.AITphotoServiceURL ? (
                        <ImageExpo
                          source={{ uri: item.AITphotoServiceURL }}
                          style={styles.roundImage}
                          cachePolicy={"memory-disk"}
                        />
                      ) : (
                        <ImageExpo
                          source={imageSource}
                          style={styles.roundImage}
                          cachePolicy={"memory-disk"}
                        />
                      )}
                      <Text style={styles.NombreServicio}>
                        {item.AITNombreServicio}
                      </Text>
                    </TouchableOpacity>

                    <ImageExpo
                      source={{ uri: item.fotoUsuarioPerfil }}
                      style={styles.roundImage}
                      cachePolicy={"memory-disk"}
                    />
                    <Text style={styles.NombrePerfilCorto}>
                      {item.nombrePerfil}
                    </Text>
                  </View>
                </View>
                <View style={[styles.row, styles.center]}>
                  <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                    {"Empresa Minera:  "}
                    {item.AITEmpresaMinera}
                  </Text>
                </View>

                <View style={[styles.row, styles.center]}>
                  {companyName === "Southernperu" && (
                    <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                      {"Visibilidad:  "}
                      {item.visibilidad}
                    </Text>
                  )}
                </View>
                <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                  {"Fecha:  "}
                  {item.fechaPostFormato}
                </Text>
                <Text></Text>
                <View style={styles.equipments}>
                  <TouchableOpacity onPress={() => commentPost(item)}>
                    <ImageExpo
                      source={{ uri: item.fotoPrincipal }}
                      style={styles.postPhoto}
                      cachePolicy={"memory-disk"}
                    />
                  </TouchableOpacity>

                  <View>
                    <Text style={styles.textAreaTitle}>
                      {/* {"Evento: "} */}
                      {item.titulo}
                    </Text>
                    <Text></Text>
                    <Text style={styles.textAreaComment} selectable={true}>
                      {item.comentarios}
                    </Text>
                  </View>
                </View>
                <View style={styles.rowlikes}>
                  <View style={styles.likeComment}>
                    <TouchableOpacity
                      onPress={() => likePost(item)}
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        type="material-community"
                        name={
                          item.likes?.includes(props.email)
                            ? "thumb-up"
                            : "thumb-up-outline"
                        }
                      />

                      <Text> {item.likes.length} Revisado</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.likeComment}>
                    <TouchableOpacity
                      onPress={() => commentPost(item)}
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        type="material-community"
                        name="comment-processing-outline"
                      />
                      <Text>
                        {item?.comentariosUsuarios?.length} Comentarios
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {item.pdfPrincipal && (
                    <TouchableOpacity
                      onPress={() => uploadFile(item.pdfPrincipal)}
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon type="material-community" name="paperclip" />
                      <Text>Pdf File</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => `${index}-${item.fechaPostFormato}`} // Provide a unique key for each item
          // onEndReached={() => {
          // }}
          // onEndReached={() => loadMorePosts()}
          // onEndReachedThreshold={0.1}
        />
      </>
    );
  }
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
