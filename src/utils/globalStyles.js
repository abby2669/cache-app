import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  bold_text: {
    fontFamily: "Poppins_700Bold",
  },
  semi_bold_text: {
    fontFamily: "Poppins_500Medium",
  },
  semi_bold_text600: {
    fontFamily: "Poppins_600SemiBold",
  },
  regular_text: {
    fontFamily: "Poppins_400Regular",
  },
  regular_text_14: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  regular_text_16: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  regular_text_17: {
    fontFamily: "Poppins_400Regular",
    fontSize: 17,
  },

  regular_icon: {
    height: 30,
    width: 30,
  },

  middle_icon: {
    height: 40,
    width: 40,
  },

  large_icon: {
    height: 45,
    width: 45,
  },

  tab_bar_icon: {
    height: 35,
    width: 35,
  },
  tab_bar_icon_large: {
    height: 28,
    width: 28,
  },
  container: {
    padding: 15,
    flex: 1,
  },
  input_container: {
    height: 48,
    marginTop: 10,
    width: "100%",
    borderRadius: 5,
    borderWidth: 0.8,
    paddingHorizontal: 10,
    fontSize: 12,
    borderColor: "rgba(0,0,0,0.2)",
  },
  input_container_multiline: {
    width: "100%",
    paddingRight: 10,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "white",
    marginTop: 15,
    textAlignVertical: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },

  dm_sans_bold: {
    fontFamily: "DMSans_700Bold",
  },

  dm_sans_medium: {
    fontFamily: "DMSans_500Medium",
  },

  dm_sans_regular: {
    fontFamily: "DMSans_400Regular",
  },
});
