import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { GlobalStyles } from "./src/utils/globalStyles";
import Navigation from "./src/navigation";
import {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  getUser,
  getVehicleTypes,
  setIsUser,
  setUserData,
} from "./src/redux/actions/main";
import common_axios from "./src/utils/axios";
import jwt_decode from "jwt-decode";

export default function Entry() {
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_900Black,
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check_auth();
    dispatch(getVehicleTypes());
  }, []);

  const check_auth = async () => {
    const is_normal = await AsyncStorage.getItem("is_normal");
    if (is_normal == "true") {
      dispatch(setIsUser(true));
      setLoading(false);
      return;
    }
    try {
      const value = await AsyncStorage.getItem("access_token");
      if (value != null) {
        var decoded = jwt_decode(value);
        if (decoded.exp < Date.now() / 1000) {
          refresh();
        } else {
          dispatch(getUser());
          setLoading(false);
        }
      } else {
        dispatch(setIsUser(false));
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      await AsyncStorage.removeItem("access_token");
      check_auth();
    }
  };

  const logOut = async () => {
    await AsyncStorage.clear();
    dispatch(setIsUser(false));
    setLoading(false);
  };

  const refresh = async () => {
    try {
      const value = await AsyncStorage.getItem("refresh_token");
      if (value != null) {
        const { data } = await axios.post(`${BACKEND_URL}/auth/refresh`, {
          refresh_token,
        });

        if (data?.status == "ok") {
          const access_token = data.access_token;
          await AsyncStorage.setItem("access_token", access_token);
          dispatch(setIsUser(true));
          setLoading(false);
        } else {
          logOut();
        }
      } else {
        dispatch(setIsUser(false));
        setLoading(false);
      }
    } catch (e) {
      await AsyncStorage.removeItem("refresh_token");
    }
  };

  if (!fontsLoaded || loading) {
    return <AppLoading />;
  }

  if (loading) return null;

  return <Navigation />;
}
