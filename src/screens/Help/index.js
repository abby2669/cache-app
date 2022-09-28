import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import Toast from "../../components/Toast/Toast";
import common_axios from "../../utils/axios";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";

export default function Help({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("");
  const [visible, setVisible] = useState(false);

  const submit = async () => {
    let isnum = /^\d+$/.test(phone);
    if (name.length == 0) {
      Toast("Name can't be blank");
      return;
    }

    if (phone.length != 10 || !isnum) {
      Toast("Enter a valid phone num");
      return;
    }

    if (request.length == 0) {
      Toast("Request can't be blank");
      return;
    }

    const { data } = await common_axios.post("/help", {
      name,
      phone,
      request,
    });
    if (data.status == "ok") {
      setName("");
      setRequest("");
      setPhone("");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        navigation.goBack(null);
      }, 3000);
    } else {
      Toast("An error occured");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: color.white }}>
      <Popup
        visible={visible}
        title={"Your help request sent successfully."}
        onClose={() => setVisible(false)}
      />
      <View style={{ height: "100%", width: "100%" }}>
        <Header
          titleStyle={{ ...GlobalStyles.regular_text }}
          type="custom"
          title="Help"
        />
        <View style={{ padding: 15, flex: 1 }}>
          <View>
            <Text style={{ fontSize: 12, ...GlobalStyles.regular_text }}>
              Name
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter name"
              style={{
                height: 48,
                marginTop: 10,
                width: "100%",
                borderRadius: 5,
                borderWidth: 0.8,
                paddingHorizontal: 10,
                borderColor: "rgba(0,0,0,0.2)",
              }}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 12, ...GlobalStyles.regular_text }}>
              Phone Number
            </Text>
            <TextInput
              value={phone}
              maxLength={10}
              keyboardType="phone-pad"
              onChangeText={(text) => setPhone(text)}
              placeholder="Enter Phone Number"
              style={{
                height: 48,
                marginTop: 10,
                width: "100%",
                borderRadius: 5,
                borderWidth: 0.8,
                paddingHorizontal: 10,
                borderColor: "rgba(0,0,0,0.2)",
              }}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 12, ...GlobalStyles.regular_text }}>
              Help Request
            </Text>
            <TextInput
              value={request}
              onChangeText={(text) => setRequest(text)}
              placeholder="Enter Description"
              multiline={true}
              style={{
                height: 96,
                marginTop: 10,
                width: "100%",
                borderRadius: 5,
                borderWidth: 0.8,
                paddingHorizontal: 10,
                borderColor: "rgba(0,0,0,0.2)",
              }}
            />
          </View>
          <Button
            style={{ marginTop: 15 }}
            titleStyle={{ fontSize: 12, ...GlobalStyles.semi_bold_text600 }}
            filled={true}
            onPress={() => submit()}
            title={"SEND"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
