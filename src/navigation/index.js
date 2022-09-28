import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./auth";
import MainNav from "./main";
import { useDispatch, useSelector } from "react-redux";
import { BottomSheet } from "react-native-btr";
import { setIsUser, setLogoutModal, setUserData } from "../redux/actions/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import { color } from "../utils/color";
import { GlobalStyles } from "../utils/globalStyles";
import common_axios from "../utils/axios";

function Navigation() {
  const { is_user, logout_modal } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const logout = async () => {
    const { data } = await common_axios.post("/user/deactivate");
    console.log(data);
    await AsyncStorage.clear();
    await AsyncStorage.setItem("onBoarded", "true");
    dispatch(setIsUser(false));
    dispatch(setUserData({}));
    dispatch(setLogoutModal(false));
  };

  return (
    <NavigationContainer>
      {is_user ? <MainNav /> : <AuthNav />}
      <BottomSheet
        visible={logout_modal}
        onBackButtonPress={() => dispatch(setLogoutModal(false))}
        onBackdropPress={() => dispatch(setLogoutModal(false))}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: color.white,
            paddingTop: 15,
          }}
        >
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={{ ...GlobalStyles.bold_text, fontSize: 16 }}>
              Logout
            </Text>
            <Text
              style={{
                color: color.semiBlack,
                marginTop: 2,
                ...GlobalStyles.regular_text,
              }}
            >
              Are you sure you want to logout?
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              borderTopColor: color.light_grey,
              borderTopWidth: 0.5,
              marginTop: 32,
              marginBottom: Platform.OS == "android" ? 0 : 20,
            }}
          >
            <TouchableOpacity
              onPress={() => dispatch(setLogoutModal(false))}
              style={{
                width: "50%",
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 0.5,
                borderRightColor: color.light_grey,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: color.light_grey,
                  ...GlobalStyles.semi_bold_text,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => logout()}
              style={{
                width: "50%",
                height: 45,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: color.red,
                  ...GlobalStyles.semi_bold_text,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </NavigationContainer>
  );
}

export default Navigation;
