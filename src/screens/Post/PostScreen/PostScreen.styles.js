import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  space: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerPost: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
  },
  center: {
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
  },
  row: {
    flexDirection: "row",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  facebookButton: {
    backgroundColor: "#3b5998",
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "#3b5998",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  border: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  postPhoto: {
    height: 250,
    width: width,
    marginTop: 0,
  },

  cameraButton: {
    borderRadius: 50,
    alignSelf: "flex-end",
    marginLeft: 80,
  },
  roundImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 5,
    alignSelf: "center",
  },

  // roundImageUpload: {
  //   width: 40,
  //   height: 40,
  //   // borderRadius: 20,
  //   margin: 10,
  //   alignItems: "center",
  // },

  buttonSmall: {
    margin: 10,
    marginBottom: 0,
    padding: 5,
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    width: 125,
  },
  bordercomment: {
    width: "85%",
    margin: 10,
    padding: 10,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  postcomment: {
    width: "0%",
    margin: 0,
    padding: 0,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 0,
    textAlign: "left",
  },
  left: {
    alignItems: "flex-start",
  },
  right: {
    alignItems: "flex-end",
  },
  bold: {
    fontWeight: "bold",
  },
  white: {
    color: "#fff",
  },
  gray: {
    color: "#adadad",
  },
  small: {
    fontSize: 10,
  },
  input: {
    width: width * 0.9,
    margin: 15,
    padding: 15,
    alignSelf: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 16,
  },
  btnContainer1: {
    // position: "absolute",
    top: 30,
    right: width * 0.2,
  },
  btnContainer2: {
    // position: "absolute",
    // bottom: 10,
    // right: 10,
    // marginHorizontal: 100,
    paddingHorizontal: 60,
  },
  btnContainer3: {
    // position: "absolute",
    // bottom: 80,
    // right: 10,
    // paddingHorizontal: 0,
  },
  btnContainer4: {
    // position: "absolute",
    // bottom: 150,
    // right: 10,
    paddingHorizontal: 60,
  },
  roundImageUpload: {
    width: 50,
    height: 50,
    // borderRadius: 50, // half of width and height
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "#D7DDE9",
    zIndex: 10,
  },
  equipments: {
    flexDirection: "row",
    // margin: 10,
    padding: 10,
    width: "100%",
    alignItems: "center", // Align contents vertically
    backgroundColor: "white", // Add backgroundColor here
  },
  equipments2: {
    flexDirection: "row",
    margin: 10,
    // padding: 10,
    // paddingHorizontal: 30,
    // width: "75%",

    alignSelf: "center",
    // alignItems: "center", // Align contents vertically
    // backgroundColor: "red", // Add backgroundColor here
  },
  name: {
    fontWeight: "bold",
    marginRight: 65,
  },
  name2: {
    fontWeight: "bold",

    alignSelf: "center",
    alignContent: "center",
  },
  name3: {
    fontWeight: "bold",
    fontSize: 20,

    alignSelf: "center",
    alignContent: "center",
  },
  info: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
  },
});
