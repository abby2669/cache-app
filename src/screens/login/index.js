import React, { useState } from "react";
import Container from "../../components/Container";
import { View, Text, Image } from "react-native";
import { color } from "../../utils/color";
import Button from "../../components/Button";
import { GlobalStyles } from "../../utils/globalStyles";
import FloatingLabel from "../../components/FloatingLabel";
import common_axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { images } from "../../utils/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "../../components/Toast/Toast";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handlePress = async () => {
    if (loading) return;
    let isnum = /^\d+$/.test(email);
    if (email.length != 10 || !isnum) {
      alert("Enter a valid mobile number");
      return;
    }

    setLoading(true);
    try {
      const { data } = await common_axios.post("/auth/login", {
        phone: email,
      });
      console.log('handlePress',data);
      setLoading(false);
      if (data.status == "ok") {
        navigation.navigate("Verification", {
          phone: email,
          type: "login",
          api: "/auth/verify_login",
          resend: "/auth/resend_login",
        });
      } else {
        console.log('handlePress',JSON.stringify(datae));

        Toast(data.msg);
      }
    } catch (e) {
      console.log('handlePress',JSON.stringify(e));
      alert("Server error");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{ alignItems: "center", backgroundColor: color.white }}
    >
      <View
        style={{
          alignItems: "center",
          width: "100%",
          height: "100%",
          paddingHorizontal: 15,
        }}
      >
        <Image
          style={{
            height: 86,
            marginTop: 80,
            width: 86,
            resizeMode: "contain",
          }}
          source={images.logo}
        />
        <Text
          style={{
            fontSize: 28,
            color: color.primary,
            marginTop: 15,
            ...GlobalStyles.bold_text,
          }}
        >
          Welcome!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: color.primary,
            marginTop: 10,
            ...GlobalStyles.semi_bold_text,
          }}
        >
          Login to explore catch wheels
        </Text>
        <FloatingLabel
          value={email}
          style={{ backgroundColor: color.transparent, marginTop: 60 }}
          placeholder={"Phone number"}
          maxLength={10}
          keyboardType={"phone-pad"}
          autoCapitalize="none"
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <Button
          loading={loading}
          filled={true}
          titleStyle={{ fontSize: 16 }}
          style={{ marginTop: 15 }}
          title={"SEND OTP"}
          onPress={() => handlePress()}
        />
        <Text
          style={{
            fontSize: 14,
            color: color.light_grey,
            marginTop: 15,
            ...GlobalStyles.regular_text,
          }}
        >
          Doesn’t have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{ color: color.black }}
          >
            Register
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Login;
