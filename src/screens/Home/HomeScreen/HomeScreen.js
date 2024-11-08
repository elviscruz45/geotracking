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

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <Text></Text>
      <Image
        source={require("../../../../assets/empresa.png")}
        style={styles.roundImageUpload}
      />

      <Text style={styles.company}>Reporte General</Text>

      {/*
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Servicios Activos Asignados</Text>
          </View>
          <TouchableOpacity onPress={() => setServiciosActivos(true)}>
            <Image
              source={require("../../../../assets/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setServiciosActivos(false)}>
            <Image
              source={require("../../../../assets/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>

        {serviciosActivos && (
          <>
            <PieChartView data={data} />
            <ServiceList data={data} />
          </>
        )}
        <Text></Text>
        <Text></Text>

        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Estado de Servicios Activos</Text>
          </View>
          <TouchableOpacity onPress={() => setEstadoServicios(true)}>
            <Image
              source={require("../../../../assets/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setEstadoServicios(false)}>
            <Image
              source={require("../../../../assets/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>
        {estadoServicios && <EstadoServiceList data={data} />}
        <Text></Text>

        <Text></Text>
        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Servicios Inactivos</Text>
          </View>
          <TouchableOpacity onPress={() => setServiciosInactivos(true)}>
            <Image
              source={require("../../../../assets/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setServiciosInactivos(false)}>
            <Image
              source={require("../../../../assets/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>
        <Text></Text>

        {serviciosInactivos && (
          <>
            <Text style={{ margin: 10 }}>
              <BarInactiveServices
                data={data}
                titulo={"Stand by"}
                unidad={"servicios"}
              />
            </Text>
            <Text style={{ marginLeft: 10 }}>
              <BarInactiveServices
                data={data}
                titulo={"Cancelacion"}
                unidad={"servicios"}
              />
            </Text>
            <InactiveServiceList data={data} />
          </>
        )}
        <Text></Text>

        {(userType === "Gerente" ||
          userType === "Planificador" ||
          userType === "GerenteContratista" ||
          userType === "PlanificadorContratista") && (
          <View style={styles.iconMinMax}>
            <View style={styles.container22}>
              <Text style={styles.titleText}>Monto Servicios</Text>
            </View>
            <TouchableOpacity onPress={() => setMontoServicios(true)}>
              <Image
                source={require("../../../../assets/plus3.png")}
                style={styles.roundImageUploadmas}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMontoServicios(false)}>
              <Image
                source={require("../../../../assets/minus3.png")}
                style={styles.roundImageUploadmas}
              />
            </TouchableOpacity>
          </View>
        )}
        {montoServicios &&
          (userType === "Gerente" ||
            userType === "Planificador" ||
            userType === "GerenteContratista" ||
            userType === "PlanificadorContratista") && (
            <>
              <BarChartMontoServicios data={data} />
              <MontoServiceList data={data} />
            </>
          )}
        <Text></Text>

        <Text></Text>
        {(userType === "Gerente" ||
          userType === "Planificador" ||
          userType === "GerenteContratista" ||
          userType === "PlanificadorContratista") && (
          <View style={styles.iconMinMax}>
            <View style={styles.container22}>
              <Text style={styles.titleText}>Monto Estado de Pago</Text>
            </View>
            <TouchableOpacity onPress={() => setMontoEDP(true)}>
              <Image
                source={require("../../../../assets/plus3.png")}
                style={styles.roundImageUploadmas}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMontoEDP(false)}>
              <Image
                source={require("../../../../assets/minus3.png")}
                style={styles.roundImageUploadmas}
              />
            </TouchableOpacity>
          </View>
        )}
        {montoEDP &&
          (userType === "Gerente" ||
            userType === "Planificador" ||
            userType === "GerenteContratista" ||
            userType === "PlanificadorContratista") && (
            <>
              <BarChartProceso data={data} />
              <MontoEDPList data={data} />
            </>
          )}

        <Text></Text>

        <Text></Text>

        {(userType === "Gerente" ||
          userType === "Planificador" ||
          userType === "GerenteContratista" ||
          userType === "PlanificadorContratista") && (
          <View style={styles.iconMinMax}>
            <View style={styles.container22}>
              <Text style={styles.titleText}>Montos Comprometidos</Text>
            </View>
            <TouchableOpacity onPress={() => setComprometido(true)}>
              <Image
                source={require("../../../../assets/plus3.png")}
                style={styles.roundImageUploadmas}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setComprometido(false)}>
              <Image
                source={require("../../../../assets/minus3.png")}
                style={styles.roundImageUploadmas}
              />
            </TouchableOpacity>
          </View>
        )}

        {comprometido &&
          (userType === "Gerente" ||
            userType === "Planificador" ||
            userType === "GerenteContratista" ||
            userType === "PlanificadorContratista") && (
            <MontoComprometido data={data} />
          )}
        <Text></Text>

        <TouchableOpacity
          onPress={
            userType === "Gerente" ||
            userType === "Planificador" ||
            userType === "GerenteContratista" ||
            userType === "PlanificadorContratista"
              ? () => getExcelReportData(data)
              : () => userTypeWarn()
          }
        >
          <Image
            source={require("../../../../assets/excel2.png")}
            style={styles.excel}
          />
        </TouchableOpacity> */}
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
