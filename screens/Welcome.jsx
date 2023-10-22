import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import Inicio from "./Inicio";

const Welcome = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const isAlphaNumeric = (text) => {
    return /^[a-zA-Z0-9]+$/.test(text);
  };

  return (
    <ImageBackground
      source={require("../assets/otrobg.jpg")}
      style={styles.img}
    >
      <View style={styles.container}>
        <Text style={styles.tittle}>LocationWise</Text>

        <Text style={styles.subtittle}>Inicia sesion para continuar!</Text>
        <View style={styles.containerInputs}>
          <View style={styles.containerTextInputs}>
            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor={COLORS.grey}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              style={styles.TextInput}
            />
          </View>

          <View style={styles.containerTextInputs}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor={COLORS.grey}
                secureTextEntry={isPasswordShown}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                style={styles.TextInput}
              />
            </View>

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 14,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View styles={{ marginTop: 20 }}>
          <Button title="Iniciar Sesión" onPress={/**handleSendData**/() => navigation.navigate("Navigation")} style={{height: 50}} />
        </View>

        <View style={styles.pressuser}>
          <Text style={styles.tx}>¿No tienes una cuenta? </Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.txc}>Registrate</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    paddingHorizontal: 22,
    paddingTop: "50%",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  tittle: {
    fontSize: 65,
    marginBottom: "8%",
    alignSelf: "center",
    fontWeight: 800,
    color: COLORS.white,
    fontFamily: "Roboto-Italic",
  },
  subtittle: {
    fontSize: 25,
    color: COLORS.white,
    fontFamily: "Helvetica",
    textAlign: "center",
    marginBottom: "10%",
  },
  containerTextInputs: {
    width: "100%",
    height: 50,
    borderColor: "#F1EFEF",
    backgroundColor: "#F2F2F2",
    borderWidth: 1,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 25,
    marginBottom: 20,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOpacity: 0.8,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 2 },
  },
  TextInput: {
    width: "100%",
    alignItems: "center",
    fontFamily: "Roboto-LightItalic",
  },
  press: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "center",
  },
  pressuser: {
    flexDirection: "row",
    marginTop: "auto",
    justifyContent: "center",
    marginBottom: "30%",
  },
  tx: {
    fontSize: 17,
    color: COLORS.white,
    fontFamily: "Roboto-Italic",
  },
  txc: {
    fontSize: 17,
    color: COLORS.primary,
    fontFamily: "Roboto-Italic",
    textDecorationLine: "underline",
  },
  containerInputs: {
    marginBottom: "10%",
  },
});
