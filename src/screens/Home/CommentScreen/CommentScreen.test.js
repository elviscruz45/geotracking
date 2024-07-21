// import React from "react";
// import { render, waitFor, screen } from "@testing-library/react-native";
// import { ConnectedCommentScreen } from "./CommentScreen";
// import { Provider } from "react-redux";
// import { legacy_createStore as createStore, applyMiddleware } from "redux";

// jest.mock("expo-image-picker", () => ({
//   launchImageLibraryAsync: jest.fn(() =>
//     Promise.resolve({ canceled: false, assets: [{ uri: "test-uri" }] })
//   ),
// }));
// jest.mock("firebase/app", () => ({
//   initializeApp: jest.fn(),
// }));
// jest.mock("firebase/auth", () => ({
//   getAuth: jest.fn(),
//   updateProfile: jest.fn(),
// }));
// jest.mock("@react-native-async-storage/async-storage", () => ({
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
// }));
// jest.mock("firebase/analytics", () => ({
//   getAnalytics: jest.fn(),
// }));
// jest.mock("firebase/firestore", () => ({
//   getFirestore: jest.fn(),
//   collection: jest.fn(),
//   query: jest.fn(),
//   limit: jest.fn(),
//   where: jest.fn(),
//   orderBy: jest.fn(),
//   onSnapshot: jest.fn(),
//   doc: jest.fn(),
// }));
// jest.mock("@react-navigation/bottom-tabs", () => ({
//   createBottomTabNavigator: jest.fn(),
// }));
// jest.mock("@react-navigation/native-stack", () => ({
//   createNativeStackNavigator: jest.fn(),
// }));
// jest.mock("victory-native", () => ({
//   VictoryPie: jest.fn(() => null), // Mocked component returns null
//   VictoryLabel: jest.fn(() => null), // Mocked component returns null
// }));
// jest.mock("firebase/storage", () => ({
//   getStorage: jest.fn(),
//   ref: jest.fn(),
//   uploadBytes: jest.fn(() =>
//     Promise.resolve({ metadata: { fullPath: "test-path" } })
//   ),
//   getDownloadURL: jest.fn(() => Promise.resolve("test-url")),
// }));

// jest.mock("@react-navigation/native", () => ({
//   useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
// }));

// jest.mock("react-native-keyboard-aware-scroll-view", () => ({
//   KeyboardAwareScrollView: ({ children }) => <>{children}</>,
// }));
// describe("HomeScreen", () => {
//   it("should render loading spinner when isLoading is true", () => {
//     // const props = {
//     //   email: "test@example.com",
//     // };
//     // Create a mock reducer that sets the email state when it receives the SET_EMAIL action

//     const mockReducer = (state = {}, action) => {
//       switch (action.type) {
//         case "SET_EMAIL":
//           return {
//             ...state,
//             profile: {
//               ...state.profile,
//               email: action.email,
//             },
//           };
//         default:
//           return state;
//       }
//     };
//     // Create a mock store with the initial state
//     const mockStore = createStore(mockReducer, {
//       profile: {
//         user_photo: "test-photo",
//         email: "initial-email",
//         firebase_user_name: "test-uid",
//       },
//       home: {
//         totalEventServiceAITLIST: 0,
//       },
//     });

//     // Dispatch the SET_EMAIL action to set the email state to "test-email"
//     mockStore.dispatch({ type: "SET_EMAIL", email: "test-email" });
//     const route = {
//       params: {
//         Item: {
//           idDocFirestoreDB: "1",
//           AITidServicios: "1",
//           idDocAITFirestoreDB: "1",
//           AITNombreServicio: "Service 1",
//           emailPerfil: "elviscruz45@gamil.com",
//           fotoPrincipal: "https://example.com/image1.jpg",
//           titulo: "Post 1",
//           comentarios: "This is a comment",
//           pdfPrincipal: "https://example.com/file1.pdf",
//           fechaPostFormato: "2022-01-01",
//         }, // Replace this with the actual item
//       },
//     };
//     const { getByTestId } = render(
//       <Provider store={mockStore}>
//         <ConnectedCommentScreen route={route} />
//       </Provider>
//     );
//   });
// });
