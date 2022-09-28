import React, { useState } from "react";
import Container from "../../components/Container";
import { View, Text, Image } from "react-native";
import { color } from "../../utils/color";
import Button from "../../components/Button";
import { GlobalStyles } from "../../utils/globalStyles";
import FloatingLabel from "../../components/FloatingLabel";
import common_axios from "../../utils/axios";
import { images } from "../../utils/icons";
import CustomPicker from "../../components/CustomPicker";
import { useSelector } from "react-redux";
import Toast from "../../utils/toast";

function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { vehicle_types } = useSelector((state) => state.reducer);
  const [selected, setSelected] = useState("select");
  const handlePress = async () => {
    let isnum = /^\d+$/.test(phone);
    setLoading(true);
    if (username.length == 0) {
      alert("Enter a valid name");
      return;
    }

    if (phone.length != 10 || !isnum) {
      alert("Enter a valid phone num");
      return;
    }

    if (selected.length == 0 || selected == "select") {
      alert("Select vehicle type");
      return;
    }

    try {
      const { data } = await common_axios.post("/auth/register", {
        username,
        phone,
        vehicle_type: selected,
      });
      console.log(data);
      if (data.status == "ok") {
        navigation.navigate("Verification", {
          phone,
          type: "register",
          api: "/auth/verify",
          resend: "/auth/resend",
        });
        setLoading(false);
      } else {
        Toast(data.msg);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      Toast("Server error");
      setLoading(false);
    }
  };

  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ height: 80, width: 80, resizeMode: "contain" }}
        source={images.logo}
      />
      <Text
        style={{
          fontSize: 28,
          color: color.primary,
          marginTop: 20,
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
        Create your account to Catch Wheels.
      </Text>
      <View style={{ paddingHorizontal: 15, width: "100%" }}>
        <FloatingLabel
          value={username}
          style={{
            backgroundColor: color.transparent,
            marginTop: 40,
            width: "100%",
          }}
          placeholder={"Full name"}
          autoCapitalize="none"
          onChangeText={(value) => {
            setUsername(value);
          }}
        />
        <FloatingLabel
          value={phone}
          style={{ backgroundColor: color.transparent, marginTop: 20 }}
          placeholder={"Phone number"}
          maxLength={10}
          keyboardType="phone-pad"
          autoCapitalize="none"
          onChangeText={(value) => {
            setPhone(value);
          }}
        />
        <CustomPicker
          style={{ elevation: 0, marginTop: 20 }}
          val={selected}
          placeholder={{ value: "select", label: "Select vehicle type" }}
          setValue={setSelected}
          data={vehicle_types.data ? vehicle_types.data : []}
        />
        <Button
          filled={true}
          loading={loading}
          titleStyle={{ fontSize: 16, ...GlobalStyles.dm_sans_bold }}
          style={{ marginTop: 25 }}
          title={"REGISTER"}
          onPress={() => handlePress()}
        />
      </View>
      <Text
        style={{
          fontSize: 14,
          color: "rgba(0,0,0,0.6)",
          marginTop: 10,
          ...GlobalStyles.regular_text,
        }}
      >
        Already have an account?{" "}
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ color: color.black }}
        >
          Login
        </Text>
      </Text>
    </Container>
  );
}

export default Register;
