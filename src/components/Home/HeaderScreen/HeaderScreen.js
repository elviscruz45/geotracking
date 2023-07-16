import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, where } from "firebase/firestore";
import { Image as ImageExpo } from "expo-image";
import { equipmentList } from "../../../utils/equipmentList";
import { styles } from "./HeaderScreen.styles";
import { connect } from "react-redux";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { EquipmentListUpper } from "../../../actions/home";
import { screen } from "../../../utils";
import { areaLists } from "../../../utils/areaList";
import { CircularProgress } from "./CircularProgress";

function HeaderScreenNoRedux(props) {
  const navigation = useNavigation();
  const [postsHeader, setPostsHeader] = useState(equipmentList);
  const [service, setServices] = useState();

  const selectAsset = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item },
    });
  };

  // Retrieve of all the servicie AIT List to render the icons in this component (home screen)

  useEffect(() => {
    setServices(props.ActualServiceAITList);
  }, [props.ActualServiceAITList]);

  // create an algorithm to reduce the total text of the service description

  const ShortTextComponent = (item) => {
    const longText = item;
    const maxLength = 20; // Maximum length of the short text
    let shortText = longText;
    if (longText.length > maxLength) {
      shortText = `${longText.substring(0, maxLength)}...`;
    }

    return <Text style={styles.Texticons}>{shortText}</Text>;
  };

  return (
    <View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={service}
        renderItem={({ item }) => {
          //the algoritm to retrieve the image source to render the icon
          const area = item.AreaServicio;
          const indexareaList = areaLists.findIndex(
            (item) => item.value === area
          );
          const imageSource = areaLists[indexareaList]?.image;
          return (
            <TouchableOpacity onPress={() => selectAsset(item)}>
              <View style={styles.textImage}>
                <CircularProgress
                  imageSource={imageSource}
                  imageStyle={styles.roundImage5}
                  avance={item.AvanceEjecucion}
                />
                {/* <ImageExpo
                  source={imageSource}
                  style={styles.roundImage5}
                  cachePolicy={"memory-disk"}
                /> */}

                {/* <Text style={styles.Texticons}>{item.NombreServicio}</Text> */}
                {ShortTextComponent(item.NombreServicio)}
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.NumeroAIT} // Provide a unique key for each item
      />
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return {
    ActualPostFirebase: reducers.post.ActualPostFirebase,
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,
    equipmentListHeader: reducers.home.equipmentList,

    ActualServiceAITList: reducers.post.ActualServiceAITList,
  };
};

export const HeaderScreen = connect(mapStateToProps, { EquipmentListUpper })(
  HeaderScreenNoRedux
);
