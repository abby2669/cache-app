import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { color } from "../../utils/color";
import Header from "../../components/Header";
import { GlobalStyles } from "../../utils/globalStyles";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  setIsUser,
  setLogoutModal,
  setUserData,
} from "../../redux/actions/main";
import Toast from "../../utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";
export default function MyProfile({ navigation }) {
  const { user_data } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch(setIsUser(false));
    dispatch(setUserData({}));
  };

  console.log(user_data);
  return (
    <SafeAreaView style={{ backgroundColor: color.light_primary }}>
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          backgroundColor: color.white,
        }}
      >
        <Header
          type="custom"
          onLeftPress={() => navigation.openDrawer()}
          rightBtnVisible={true}
          right_text={"Edit"}
          onRightBtnPress={() => navigation.navigate("EditProfile")}
          title={"My Profile"}
        />
        <Image
          source={{
            uri: user_data.profile_image,
          }}
          style={{ height: 70, width: 70, borderRadius: 35, marginTop: 60 }}
        />
        <View style={{ width: "90%", marginTop: 27 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "rgba(0, 0, 0, 0.1)",
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_regular }}>
              Username:{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.6)",
                marginLeft: 10,
                ...GlobalStyles.regular_text,
              }}
            >
              {user_data.username}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "rgba(0, 0, 0, 0.1)",
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_regular }}>
              Phone Number:{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.6)",
                marginLeft: 10,
                ...GlobalStyles.regular_text,
              }}
            >
              {user_data.phone}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "rgba(0, 0, 0, 0.1)",
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_regular }}>
              Email Id:{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.6)",
                marginLeft: 10,
                ...GlobalStyles.regular_text,
              }}
            >
              {user_data.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "rgba(0, 0, 0, 0.1)",
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_regular }}>
              Vehicle name:{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.6)",
                marginLeft: 10,
                ...GlobalStyles.regular_text,
              }}
            >
              {user_data.vehicle_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "rgba(0, 0, 0, 0.1)",
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_regular }}>
              Location:{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.6)",
                marginLeft: 10,
                ...GlobalStyles.regular_text,
              }}
            >
              {user_data.short_address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "rgba(0, 0, 0, 0.1)",
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_regular }}>
              Vehicle Type:{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.6)",
                marginLeft: 10,
                ...GlobalStyles.regular_text,
              }}
            >
              {user_data.vehicle_data?.name}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_regular }}>
              Vehicle Images:{" "}
            </Text>
            <FlatList
              horizontal
              style={{ marginVertical: 10 }}
              data={user_data.vehicle_images ? user_data.vehicle_images : []}
              keyExtractor={(item) => item.uri}
              renderItem={({ item }) => (
                <Image
                  style={{
                    height: 74,
                    width: 74,
                    borderRadius: 10,
                    marginRight: 15,
                  }}
                  source={{ uri: item.uri }}
                />
              )}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "rgba(0, 0, 0, 0.1)",
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_regular }}>
              Subscribed:{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.6)",
                marginLeft: 10,
                ...GlobalStyles.regular_text,
              }}
            >
              {user_data.order_status == "successful"
                ? user_data.plan == "monthly"
                  ? "Monthly plan"
                  : "Yearly plan"
                : "Inactive"}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 15,
            left: "5%",
            right: "5%",
            height: 60,
          }}
        >
          <Button
            //onPress={() => Toast("Server error")}
            onPress={() => navigation.navigate("EditProfile")}
            titleStyle={{
              color: color.white,
              fontSize: 16,
              ...GlobalStyles.dm_sans_bold,
            }}
            title="Edit profile"
            style={{
              backgroundColor: color.primary,
              width: "100%",
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
