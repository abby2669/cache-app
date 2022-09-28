import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../../screens/onBoarding";
import Login from "../../screens/login";
import Verification from "../../screens/verification";
import Register from "../../screens/Register";
import { CONSTANTS } from "../../Constants";
import Welcome from "../../screens/Welcome";
import Subscription from "../../screens/subscription";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";

function AuthNav() {
  const Stack = createNativeStackNavigator();
  const [onb, setOnb] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    is_onboarded();
  }, []);
  const is_onboarded = async () => {
    const d = await AsyncStorage.getItem("onBoarded");
    console.log(d);
    if (!d) {
      setOnb(false);
      setLoading(false);
    } else {
      setOnb(true);
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={onb ? CONSTANTS.SCREENS.welcome : "OnBoarding"}
    >
      <Stack.Screen
        component={OnBoarding}
        name="OnBoarding"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Login}
        name={CONSTANTS.SCREENS.login}
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Register}
        name={CONSTANTS.SCREENS.register}
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Verification}
        name="Verification"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Subscription}
        name={CONSTANTS.SCREENS.subscription}
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Welcome}
        name={CONSTANTS.SCREENS.welcome}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}

export default AuthNav;
