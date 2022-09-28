import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { View, Text, Linking } from "react-native";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import { setIsUser, setLogoutModal } from "../../redux/actions/main";

export default function DrawerContent(props) {
  const dispatch = useDispatch();

  const { user_data } = useSelector((state) => state.reducer);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          height: 55,
          width: "100%",
          justifyContent: "center",
          shadowColor: color.black,
          shadowOffset: { height: 3, width: 0 },
          shadowRadius: 3,
          shadowOpacity: 0.5,
          elevation: 5,
          backgroundColor: color.white,
        }}
      >
        <Text style={{ marginLeft: "10%", ...GlobalStyles.dm_sans_bold }}>
          MENU
        </Text>
      </View>
      <View style={{ height: 20 }} />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        icon={() => <Feather name="phone" color={color} size={18} />}
        onPress={() => Linking.openURL("tel:+919986687477")}
        labelStyle={{
          marginLeft: -10,
          fontSize: 16,
          color: color.black,
          ...GlobalStyles.dm_sans_regular,
        }}
        style={{
          marginHorizontal: "7%",
          marginTop: 0,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.1)",
        }}
      />
      {user_data?.type == "driver" && (
        <DrawerItem
          label="Logout"
          icon={() => <Feather name="lock" color={color.black} size={18} />}
          onPress={() => dispatch(setLogoutModal(true))}
          labelStyle={{
            marginLeft: -10,
            fontSize: 16,
            color: color.black,
            ...GlobalStyles.dm_sans_regular,
          }}
          style={{ marginHorizontal: "7%", marginTop: 0 }}
        />
      )}
    </DrawerContentScrollView>
  );
}
