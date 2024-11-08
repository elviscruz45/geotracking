import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import { rootReducers } from "./src/reducers";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ConnectedLoginNavigator } from "./src/navigation/LoginNavigator";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// LogBox.ignoreAllLogs();

const middleware = [thunk];
const composedEnhancers = compose(applyMiddleware(...middleware));
export const store = createStore(rootReducers, {}, composedEnhancers);
export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar backgroundColor="white" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <ConnectedLoginNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
      <Toast />
    </>
  );
}
