import { Dimensions } from "react-native";
import { color } from "../utils/color";
import { images } from "../utils/icons";

export const CONSTANTS = {
  ONBOARDING_SLIDES: [
    {
      key: 1,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text",
      image: images.tractor,
      backgroundColor: color.primary,
    },
    {
      key: 2,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text",
      image: images.jcb,
      backgroundColor: color.primary,
    },
    {
      key: 3,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text",
      image: images.taxi,
      backgroundColor: color.primary,
    },
  ],
  SCREENS: {
    welcome: "Welcome",
    vehicleDetails: "VehicleDetails",
    register: "Register",
    login: "Login",
    subscription: "Subscription",
    selectLocationMap: "SelectLocationMap",
  },
  SCREEN_HEIGHT: Dimensions.get("window").height,
  SCREEN_WIDTH: Dimensions.get("window").width,
  TEXT_ALIGN: {
    center: "center",
    justify: "justify",
    auto: "auto",
    left: "left",
    right: "right",
  },
  JUSTIFY_CONTENT: {
    center: "center",
    between: "space-between",
    evenly: "space-evenly",
    around: "space-around",
    start: "flex-start",
    end: "flex-end",
  },
  ALIGN_ITEMS: {
    center: "center",
    start: "flex-start",
    end: "flex-end",
    stretch: "stretch",
    baseline: "baseline",
  },
};
