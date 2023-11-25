import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { hostIP } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from "../constants/colors";
import Button from "../../components/Button";
import styles from "../../Styles/styles";

const Welcome = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const isAlphaNumeric = (text) => {
    return /^[a-zA-Z0-9]+$/.test(text);
  };

  const isEmail = (text) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  }

  async function getAllUsers() {
    const users_endpoint = `http://${hostIP}:3000/locationwise/v1/users/all`
    console.log("Ip:", hostIP);
    return fetch(users_endpoint)
      .then((response) => response.json())
      .then((json) => {
        console.log("\nAPI fetched: " + users_endpoint);
        console.log("\nJson returned: " + json);
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async function authLogin(email, password) {
    const login_endpoint = `http://${hostIP}:3000/locationwise/v1/auth/login/${email}/${password}`;
    console.log("Ip:", hostIP);
    console.log("Fetching: " + login_endpoint);

    try {
      const response = await fetch(login_endpoint, {
        method: 'GET',
        credentials: 'include',
      });


      if (response.ok) {
        const res = await response.text();
        const message = JSON.parse(res).message;
        const userId = JSON.parse(res).userId;
        console.log("res: " + res);
        console.log("message: " + message);
        console.log("userId: " + userId);
        if (message == "Usuario validado.") {
          console.log("Usuario validado.");
          return { success: true, userId };
        } else {
          console.log('Login failed');
          return { success: false, message };
        }
      } else {
        console.log('Login failed');
        return { success: false, message: 'Login failed.' };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error occurred.' };
    }
  }


  const handleSendData = async () => {
    if (!isEmail(email) || !isAlphaNumeric(password)) {
      Alert.alert("Caracteres no válidos", "Solo se aceptan letras y números");
    } else if (email === "" || password === "") {
      Alert.alert("Campos vacíos", "Por favor llena todos los campos");
    } else {
      try {
        console.log("Correo electrónico:", email);
        console.log("Password:", password);
        console.log("pre data, fetching . . .");
        const data = await authLogin(email, password);
        console.log("data: " + data);
        if (data && data.success && data != null && data != undefined) {
          console.log("post data");
          console.log("data: " + JSON.stringify(data));
          console.log("userId: " + data.userId);
          try {
            await AsyncStorage.setItem('userId', data.userId.toString());
            console.log('User ID saved in AsyncStorage');
            navigation.navigate("Navigation");
          } catch (error) {
            console.error('Error saving user ID in AsyncStorage:', error);
          }
        } else {
          Alert.alert("Error", "Datos incorrectos");
        }

      } catch (error) {
        console.error("Error in handleSendData:", error);
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/otrobg.jpg")}
      style={styles.imgwelcome}
    >
      <View style={styles.container}>
        <Text style={styles.tittle}>LocationWise</Text>

        <Text style={styles.subtittle}>Inicia sesion para continuar!</Text>
        <View style={styles.containerInputswelcome}>
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
          <Button
            title="Iniciar Sesión"
            onPress={handleSendData}
            style={{ height: 50 }}
          />
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
