import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";
import styles from "../../Styles/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

const Soluciones = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={
        theme === "light"
          ? { flex: 1, backgroundColor: COLORS.light }
          : { flex: 1, backgroundColor: COLORS.dark }
      }
    >
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.containertittle}>
              <Text
                style={
                  theme === "light"
                    ? styles.principaltittle
                    : { ...styles.principaltittle, color: "white" }
                }
              >
                ENCUENTRA TÚ LUGAR EN EL MUNDO.
              </Text>
            </View>
            <View style={styles.containerSol}>
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  height: 60,
                  width: 60,
                  marginRight: 20,
                }}
              />
              <View>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle1
                      : { ...styles.tittle1, color: "white" }
                  }
                >
                  LocationWise
                </Text>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle5
                      : { ...styles.tittle5, color: "white" }
                  }
                >
                  Mas que un mapa, una estrategia
                </Text>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle5
                      : { ...styles.tittle5, color: "white" }
                  }
                >
                  LocationWise optimiza
                </Text>
              </View>
            </View>
            <View style={styles.containerdemo}>
              <View style={styles.container1}>
                <View styles={styles.containerSol}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.textodemo
                        : { ...styles.textodemo, color: "white" }
                    }
                  >
                    Ingresa la ubicacion de tu negocio
                  </Text>
                  <View style={styles.containerbtn}>
                    <LinearGradient
                      style={{
                        width: "60%",
                        borderRadius: 40,
                        alignSelf: "center",
                        justifyContent: "center", // Añade esta línea
                        alignItems: "center", // Añade esta línea
                      }}
                      colors={[COLORS.buttonsecondary, COLORS.buttonprimary]}
                      start={{ y: 0.0, x: 0.0 }}
                      end={{ y: 1.0, x: 0.0 }}
                    >
                      <TouchableOpacity
                        style={{
                          width: "100%",
                          height: 40,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center", // Añade esta línea
                        }}
                        onPress={() => navigation.navigate("Locwise")}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            color: "white",
                            alignSelf: "center",
                          }}
                        >
                          Comenzar
                        </Text>
                        <Icon
                          name="arrow-right"
                          size={30}
                          color="white"
                          style={{ marginLeft: 10 }}
                        />
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
                <Image
                  source={require("../../assets/demostrativas/demostrativo1.png")}
                  style={styles.imagedemo}
                />
                <Icon
                  name="arrow-down"
                  size={35}
                  color={theme === "light" ? COLORS.buttonprimary : "white"}
                  style={{ marginTop: 10 }}
                />
              </View>
              <View style={styles.container1}>
                <Text
                  style={
                    theme === "light"
                      ? styles.textodemo
                      : { ...styles.textodemo, color: "white" }
                  }
                >
                  Confirma
                </Text>
                <Image
                  source={require("../../assets/demostrativas/demostrativo2.png")}
                  style={styles.imagedemo}
                />
                <Icon
                  name="arrow-down"
                  size={40}
                  color={theme === "light" ? COLORS.buttonprimary : "white"}
                  style={{ marginTop: 10 }}
                />
              </View>
              <View style={styles.container1}>
                <Text
                  style={
                    theme === "light"
                      ? styles.textodemo
                      : { ...styles.textodemo, color: "white" }
                  }
                >
                  Ingresa una similaridad en base a la zona de tu negocio
                </Text>
                <Image
                  source={require("../../assets/demostrativas/demostrativo3.png")}
                  style={styles.imagedemo1}
                />
                <Icon
                  name="arrow-down"
                  size={40}
                  color={theme === "light" ? COLORS.buttonprimary : "white"}
                  style={{ marginTop: 10 }}
                />
              </View>
              <View style={styles.container1}>
                <Text
                  style={
                    theme === "light"
                      ? styles.textodemo
                      : { ...styles.textodemo, color: "white" }
                  }
                >
                  Visualiza las zonas similares
                </Text>
                <Image
                  source={require("../../assets/demostrativas/demostrativo4.png")}
                  style={styles.imagedemo}
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
      </SafeAreaView>
    </View>
  );
};

export default Soluciones;
