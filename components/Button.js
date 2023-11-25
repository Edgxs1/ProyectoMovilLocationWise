import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../src/constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const Button = (props) => {
  const filledBgColor = props.color || COLORS.white;
  const outlinedColor = COLORS.blue;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.white;

  return (
    <LinearGradient
      style={{width: "100%", borderRadius: 40}}
      colors={[COLORS.buttonsecondary, COLORS.buttonprimary]}
      start={{ y: 0.0, x: 0.0 }}
      end={{ y: 1.0, x: 0.0 }}
    >
      <TouchableOpacity
        style={{
          ...styles.button,
          ...props.style,
        }}
        onPress={props.onPress}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 20, ...{ color: textColor } }}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
});
export default Button;
