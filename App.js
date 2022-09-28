import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Entry from "./Entry";
import store from "./src/redux/store/store";
import { Provider } from "react-redux";
// import * as Updates from "expo-updates";
import { color } from "./src/utils/color";

export default function App() {
  useEffect(() => {
    checkUpdates();
  }, []);

  const checkUpdates = async () => {
    try {
      // const update = await Updates.checkForUpdateAsync();
      // if (update.isAvailable) {
      //   await Updates.fetchUpdateAsync();
      //   alert("New Update Available");
      //   await Updates.reloadAsync();
      // }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor={color.primary} />
      <Entry />
    </Provider>
  );
}
