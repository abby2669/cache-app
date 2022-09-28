import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Animated,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";

class FloatingLabel extends Component {
  state = {
    isFocused: false,
    isEye: false,
  };

  componentWillMount() {
    this._animatedLabelValue = new Animated.Value(
      this.props.value === "" ? 0 : 1
    );
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedLabelValue, {
      toValue: this.state.isFocused || this.props.value !== "" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  toggleEye = () => {
    this.setState({ isEye: !this.state.isEye });
    this.props.onEyePress();
  };

  render() {
    const { eyeIcon, label, labelColor, ...props } = this.props;
    const { isFocused, isEye } = this.state;

    const labelStyle = {
      position: "absolute",
      left: 0,
      padding: 10,
      top: this._animatedLabelValue.interpolate({
        inputRange: [0, 1],
        outputRange: [3, -35],
      }),
      fontSize: this._animatedLabelValue.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 15],
      }),
      color: this._animatedLabelValue.interpolate({
        inputRange: [0, 1],
        outputRange: [
          labelColor ? labelColor : color.white,
          labelColor ? labelColor : color.white,
        ],
      }),
      ...GlobalStyles.regular_text,
    };
    return (
      <TextInput
        {...props}
        style={{ ...GlobalStyles.input_container, ...props.style }}
        maxLength={this.props.maxLength}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }
}
const widthScreen = Dimensions.get("window").width;
const style = StyleSheet.create({
  inputWrapper: {
    marginTop: 25,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 10,
    backgroundColor: color.white,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: widthScreen / 1.1,
    zIndex: -1,
    borderWidth: 1,
    borderColor: color.white,
  },
  floatInput: {
    flex: 1,
    fontSize: 12,
    padding: 10,
    width: "100%",
    height: "100%",
    zIndex: 100,
    color: color.white,
    ...GlobalStyles.regular_text,
  },
  eyeIcon: {
    position: "absolute",
    top: 2,
    bottom: 2,
    right: 2,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 100,
  },
});
export default FloatingLabel;
