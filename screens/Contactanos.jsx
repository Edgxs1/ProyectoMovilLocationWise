import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { useFonts } from "expo-font";
import Button from "../components/Button";
import styles from "../Styles/styles";

const Contactanos = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
    <ImageBackground source={require("../assets/bgcontact.png")} style={styles.img}>
      <ScrollView style={styles.scroll}>
        <View>
          <View style={styles.containertittle2}>
            <Text style={styles.principaltittle}>¿Tines alguna duda?</Text>
            <Text style={styles.principaltittle}>Háznoslo saber</Text>
          </View>
          <View style={{marginTop:30}}>
            <View style={styles.containerInputs}>
              <Text style={styles.tittle5}>Nombre de usuario</Text>
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
              <Text style={styles.tittle5}>Correo electrónico</Text>
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
            <View>
              <View style={styles.containerInputs}>
                <Text style={styles.tittle5}>Mensaje</Text>
                <View style={styles.textimput}>
                  <TextInput
                    placeholder="Mensaje"
                    placeholderTextColor={COLORS.grey}
                    keyboardType="default"
                    style={{
                      width: "100%",
                    }}
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                  />
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center", marginTop: "15%", width: "80%", alignSelf: "center"}}>
              <Button
                title="Enviar"
                onPress={handleSendData}
                style={{
                  height: 50,
                }}
              />
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

export default Contactanos;
