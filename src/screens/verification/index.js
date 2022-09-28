import React, { useState } from "react";
import Container from "../../components/Container";
import { View, Text, Image } from "react-native";
import { color } from "../../utils/color";
import Button from "../../components/Button";
import { GlobalStyles } from "../../utils/globalStyles";
import FloatingLabel from "../../components/FloatingLabel";
import Feather from "@expo/vector-icons/Feather";
import common_axios from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, setIsUser, setUserData } from "../../redux/actions/main";
import { useDispatch } from "react-redux";
import Toast from "../../utils/toast";
import Timer from "./timer";
import { BottomSheet } from "react-native-btr";
import { icons } from "../../utils/icons";
import { CONSTANTS } from "../../Constants";

function Verification({ navigation, route }) {
  const { phone, type, api, resend } = route.params;
  const [otp, setOtp] = useState("");
  const [bottom, setBottom] = useState(false);
  const [bottomType, setBottomType] = useState("not_available");
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pinloading, setPinLoading] = useState(false);
  const dispatch = useDispatch();

  const verify = async () => {
    setLoading(true);
    try {
      const { data } = await common_axios.post(api, {
        phone,
        otp,
      });
      if (data.status == "ok") {
        //dispatch(setIsUser(true))
        if (api == "/auth/verify") {
          console.log(data.data.access_token);
          await AsyncStorage.setItem("access_token", data.data.access_token);
          await AsyncStorage.setItem("refresh_token", data.data.refresh_token);
          //navigation.navigate(CONSTANTS.SCREENS.subscription);
          dispatch(getUser());
          dispatch(setIsUser(true));
        } else {
          await AsyncStorage.setItem("access_token", data.data.access_token);
          await AsyncStorage.setItem("refresh_token", data.data.refresh_token);
          dispatch(getUser());
        }
      } else {
        Toast("Invalid Code");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Invalid Code");
      setLoading(false);
    }
  };

  return (
    <Container>
      <Feather
        onPress={() => navigation.goBack(null)}
        style={{ position: "absolute", top: 45, left: 20 }}
        name="arrow-left"
        size={24}
        color={color.primary}
      />
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            color: color.primary,
            ...GlobalStyles.bold_text,
          }}
        >
          Verification!
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: color.primary,
            maxWidth: "90%",
            marginTop: 10,
            ...GlobalStyles.semi_bold_text,
          }}
        >
          Enter 4 digits code that sent to your mobile no {phone}.
        </Text>
        <View style={{ width: "100%", paddingHorizontal: 15 }}>
          <FloatingLabel
            value={otp}
            style={{ backgroundColor: color.transparent, marginTop: 60 }}
            placeholder={"Enter OTP"}
            autoCapitalize="none"
            keyboard={"phone-pad"}
            maxLength={4}
            onChangeText={(value) => {
              setOtp(value);
            }}
          />
          <Button
            loading={loading}
            filled={true}
            titleStyle={{ fontSize: 16 }}
            style={{ marginTop: 15 }}
            title={"VERIFY"}
            onPress={() => verify()}
          />
        </View>
        <Timer phone={phone} init_seconds={30} api={resend} />
      </View>
    </Container>
  );
}

export default Verification;
