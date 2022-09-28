import React from "react";
import Container from "../../components/Container";
import { View, Image, Text } from "react-native";
import { color } from "../../utils/color";
import Button from "../../components/Button";
import { images } from "../../utils/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AppIntroSlider from "react-native-app-intro-slider";
import { CONSTANTS } from "../../Constants";
import { GlobalStyles } from "../../utils/globalStyles";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

function OnBoarding({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: CONSTANTS.JUSTIFY_CONTENT.around,
          alignItems: CONSTANTS.ALIGN_ITEMS.center,
        }}
      >
        <Image
          style={{
            width: CONSTANTS.SCREEN_WIDTH * 0.85,
            height: CONSTANTS.SCREEN_WIDTH * 0.85,
          }}
          source={item.image}
        />
        <Text
          style={{
            color: color.white,
            textAlign: CONSTANTS.TEXT_ALIGN.center,
            ...GlobalStyles.regular_text,
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: color.primary, flex: 1 }}>
      <StatusBar style={"light"} />
      <View style={{ height: "100%", width: "100%" }}>
        <AppIntroSlider
          data={CONSTANTS.ONBOARDING_SLIDES}
          renderItem={renderItem}
          onDone={async () => {
            await AsyncStorage.setItem("onBoarded", "true");
            navigation.navigate(CONSTANTS.SCREENS.welcome);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default OnBoarding;
