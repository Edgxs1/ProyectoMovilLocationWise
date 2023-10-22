import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Button from "../components/Button";
import styles from "../Styles/styles";

const Perfil = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleSendData = () => {
    if (name === "" || email === "" || message === "") {
      Alert.alert("Campos vacios", "Por favor llena todos los campos");
    } else {
      console.log("Nombre de usuario:", name);
      console.log("Correo electrónico:", email);
      console.log("Mensaje enviado:", message);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={styles.img}>
      <ScrollView>
        <View>
          <View style={styles.containertittle}>
            <Text style={styles.principaltittle}>Consulta tu perfil</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={styles.containerInputs}>
              <Text style={styles.tittle3}>Nombre de usuario</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Nombre de Usuario"
                  placeholderTextColor={COLORS.grey}
                  value={name}
                  onChangeText={(text) => setName(text)}
                  style={{
                    width: "100%",
                  }}
                />
              </View>
            </View>
            <View style={styles.containerInputs}>
              <Text style={styles.tittle3}>Correo electrónico</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Correo Electrónico"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={{
                    width: "100%",
                  }}
                />
              </View>
            </View>
            <View style={styles.containerInputs}>
              <Text style={styles.tittle3}>Contraseña</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Contraseña"
                  placeholderTextColor={COLORS.grey}
                  secureTextEntry={isPasswordShown}
                  style={{
                    width: "100%",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{
                    position: "absolute",
                    right: 12,
                  }}
                >
                  {isPasswordShown == true ? (
                    <Ionicons name="eye-off" size={24} color={COLORS.grey} />
                  ) : (
                    <Ionicons name="eye" size={24} color={COLORS.grey} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerbtn}>
              <Button
                title="Guardar cambios"
                onPress={handleSendData}
                style={{
                  height: 50,
                }}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.tittle1}>Historial de uso</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.tittle1}>Borrar tu cuenta</Text>
              <View style={styles.containerbtn}>
                <LinearGradient
                  style={{ width: "80%", borderRadius: 40, alignSelf: "center"}}
                  colors={[COLORS.secondary, COLORS.red]}
                  start={{ y: 0.0, x: 0.0 }}
                  end={{ y: 1.0, x: 0.0 }}
                >
                  <TouchableOpacity
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: 35,
                    }}
                    onPress={() => console.log("Borrar cuenta")}
                    activeOpacity={0.7}
                  >
                    <Text style={{ fontSize: 20 }}>Borrar cuenta</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              <Text style={styles.tittle4}>
                Al hacer esto pierdes acceso a todo lo relacionado a tu cuenta,
                incluyendo tus datos y tu historial de uso.
              </Text>
            </View>
            <View style={styles.textend}>
              <Text style={styles.ref}>
                Location-Wise® 2023 - Marketing Automated Geographic Engine
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </ImageBackground>
  );
};

export default Perfil;
