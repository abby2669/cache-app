import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { CONSTANTS } from "../../Constants";
import { setIsUser } from "../../redux/actions/main";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import { images } from "../../utils/icons";

export default function Welcome({ navigation }) {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ backgroundColor: color.white }}>
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: color.white,
          padding: 15,
        }}
      >
        <Text
          onPress={() => navigation.navigate(CONSTANTS.SCREENS.register)}
          style={{
            fontSize: 12,
            textAlign: CONSTANTS.TEXT_ALIGN.right,
            ...GlobalStyles.regular_text,
          }}
        >
          Driver Profile
        </Text>
        <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
          <Image source={images.logo} style={{ height: 100, width: 100 }} />
          <Text
            style={{
              ...GlobalStyles.bold_text,
              marginTop: 15,
              color: color.primary,
              fontSize: 28,
            }}
          >
            Welcome!
          </Text>
          <Text
            style={{
              ...GlobalStyles.semi_bold_text,
              marginTop: 30,
              textAlign: CONSTANTS.TEXT_ALIGN.center,
              color: color.primary,
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <Button
            onPress={async () => {
              await AsyncStorage.setItem("is_normal", "true");
              dispatch(setIsUser(true));
            }}
            filled={true}
            style={{ marginTop: 85 }}
            title="CONTINUE"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
