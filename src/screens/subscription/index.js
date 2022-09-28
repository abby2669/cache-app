import React, { useState } from "react";
import Container from "../../components/Container";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { color } from "../../utils/color";
import Button from "../../components/Button";
import { GlobalStyles } from "../../utils/globalStyles";
import FloatingLabel from "../../components/FloatingLabel";
import Feather from "@expo/vector-icons/Feather";
import common_axios from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, setIsUser, setUserData } from "../../redux/actions/main";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../utils/toast";
import { CONSTANTS } from "../../Constants";
import Popup from "../../components/Popup";
import RazorpayCheckout from "react-native-razorpay";
import { useEffect } from "react";

function Subscription({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [visible, setVisible] = useState(false);
  const { user_data } = useSelector((state) => state.reducer);
  console.log(user_data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(true));
  }, []);

  const subscribe = async () => {
    if (selected.length == 0) {
      Toast("Please select subscription plan.");
      return;
    }
    var options = {
      description: `Catch wheels ${selected} subscription`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/battle-arena-635c8.appspot.com/o/icon.png?alt=media&token=784831f0-bf18-426a-a5e9-4744813121c1",
      currency: "INR",
      key: "rzp_test_XFLPovBnguubjI", // Your api key
      amount: selected == "monthly" ? "10000" : "100000",
      name: "Catch Wheels",
      prefill: {
        email: user_data.email,
        contact: user_data.phone,
        name: user_data.username,
      },
      theme: { color: color.primary },
    };
    RazorpayCheckout.open(options)
      .then(async (res) => {
        setLoading(true);
        try {
          const { data } = await common_axios.post("/sub", {
            type: selected,
            status: "successful",
            payment_id: res.razorpay_payment_id,
          });
          console.log(data);
          if (data.status == "ok") {
            setVisible(true);
            setTimeout(() => {
              dispatch(getUser());
              dispatch(setIsUser(true));
              setVisible(false);
            }, 3000);
            console.log(data);
          } else {
            Toast(data.msg);
          }
          setLoading(false);
        } catch (error) {
          Toast("An error occured");
          setLoading(false);
        }
      })
      .catch((error) => {
        // handle failure
        console.log(error);
        alert(`Error: ${error.code} | ${error.description}`);
      });
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
          Subscription
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
          You need to get subscription plan to continue with this app.
        </Text>
        <View style={{ width: "100%", paddingHorizontal: 15, marginTop: 50 }}>
          <Text
            style={{
              fontSize: 16,
              color: "rgba(10, 10, 10, 0.6)",
              ...GlobalStyles.semi_bold_text,
            }}
          >
            Select subscriptions plans
          </Text>
          <TouchableOpacity
            onPress={() => setSelected("monthly")}
            style={{
              alignItems: "center",
              flexDirection: "row",
              ...GlobalStyles.input_container,
            }}
          >
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderColor: color.primary,
                borderWidth: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selected == "monthly" && (
                <View
                  style={{
                    height: 13,
                    width: 13,
                    borderRadius: 8,
                    backgroundColor: color.primary,
                  }}
                />
              )}
            </View>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: color.black,
                ...GlobalStyles.semi_bold_text,
              }}
            >
              Monthly Plan:{" "}
              <Text style={{ ...GlobalStyles.dm_sans_medium }}>₹100</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected("yearly")}
            style={{
              alignItems: "center",
              flexDirection: "row",
              ...GlobalStyles.input_container,
            }}
          >
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderColor: color.primary,
                borderWidth: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selected == "yearly" && (
                <View
                  style={{
                    height: 13,
                    width: 13,
                    borderRadius: 8,
                    backgroundColor: color.primary,
                  }}
                />
              )}
            </View>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: color.black,
                ...GlobalStyles.semi_bold_text,
              }}
            >
              Yearly Plan:{" "}
              <Text style={{ ...GlobalStyles.dm_sans_medium }}>₹1000</Text>
            </Text>
          </TouchableOpacity>
          <Button
            loading={loading}
            filled={true}
            titleStyle={{ fontSize: 16 }}
            style={{ marginTop: 15 }}
            title={"CONTINUE TO PAY"}
            onPress={() => subscribe()}
          />
        </View>
        <Popup
          title={"Subscription Succesfull"}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </View>
    </Container>
  );
}

export default Subscription;
