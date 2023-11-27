import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import COLORS from "../constants/colors";
import styles from "../../Styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hostIP } from "@env";



const Inicio = () => {
  const { theme } = useTheme();
  const [name, setName] = useState("");


  useEffect(() => {
    async function loadUserData() {
      try {
        const userId = await getUserID();
        if (userId !== null && userId !== undefined) {
          const userData = await getUserDataByID(userId);
          if (userData) {
            let name = '';
            name += userData[0]["usr_username"];
            name += ' 👋';
            setName(name);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }

    loadUserData();
  }, []);

  async function getUserID() {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');

      if (storedUserId) {
        const userId = parseInt(storedUserId, 10);
        console.log('Retrieved User ID from AsyncStorage:', userId);
        return userId;
      } else {
        console.log('User ID not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving user ID from AsyncStorage:', error);
    }
  }

  async function getUserDataByID(id) {
    console.log("Ip:", hostIP);
    const user_endpoint = `http://${hostIP}:3000/locationwise/v1/users/data/${id}`;
    console.log("Fetching: " + user_endpoint);
    try {
      const response = await fetch(user_endpoint, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const res = await response.json();
        console.log("User data fetched: " + JSON.stringify(res));
        return res;
      } else {
        console.log("Algo salió mal.");
      }
    }
    catch (error) {
      console.error(error);
      return false;
    }
  }

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
            <View style={styles.containeruser}>
              <Text
                style={
                  theme === "light"
                    ? styles.usertittle
                    : { ...styles.usertittle, color: "white" }
                }
              >
                Hola de nuevo
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.usertittle
                    : { ...styles.usertittle, color: "white" }
                }
              >
                {name || '@user 👋'}
              </Text>
            </View>
            <View>
              <View style={styles.containerexp}>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle3
                      : { ...styles.tittle3, color: "white" }
                  }
                >
                  Location-Wise, una de nuestras soluciones.{" "}
                </Text>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle3
                      : { ...styles.tittle3, color: "white" }
                  }
                >
                  SOLAMENTE CDMX
                </Text>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle3
                      : { ...styles.tittle3, color: "white" }
                  }
                >
                  Dirigido a microempresas y nuevos emprendedores
                </Text>
              </View>
              <View
                style={
                  theme === "light"
                    ? styles.containerinfo
                    : {
                      ...styles.containerinfo,
                      backgroundColor: COLORS.backgr,
                    }
                }
              >
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle2
                      : { ...styles.tittle2, color: "white" }
                  }
                >
                  ¿Qué es Location-Wise?
                </Text>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle4
                      : { ...styles.tittle4, color: "white" }
                  }
                >
                  Location-Wise es una solución geográfica que te ayuda a
                  localizar tu negocio mediante el uso de mapas y datos
                  geoestadísticos.
                </Text>
              </View>
              <View
                style={
                  theme === "light"
                    ? styles.containerinfo
                    : {
                      ...styles.containerinfo,
                      backgroundColor: COLORS.backgr,
                    }
                }
              >
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle2
                      : { ...styles.tittle2, color: "white" }
                  }
                >
                  ¿Cómo funciona?
                </Text>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle4
                      : { ...styles.tittle4, color: "white" }
                  }
                >
                  Location-Wise recopila la información de una área geográfica
                  gracias a los datos abiertos del INEGI, resume los datos más
                  relevantes de un área geoestadística básica (AGEB) para tú
                  negocio y en base a eso te despliega en un mapa el AGEB con
                  mayor probabilidad de clientes potenciales o bien con el mayor
                  número de clientes similares a los que ya tienes.
                </Text>
              </View>
              <View
                style={
                  theme === "light"
                    ? styles.containerinfo
                    : {
                      ...styles.containerinfo,
                      backgroundColor: COLORS.backgr,
                    }
                }
              >
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle2
                      : { ...styles.tittle2, color: "white" }
                  }
                >
                  ¿Cómo puedo usarlo?
                </Text>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle4
                      : { ...styles.tittle4, color: "white" }
                  }
                >
                  Para usar Location-Wise basta con ingresar datos de tú publico
                  objetivo si es que no cuentas con un negocio actualmente, o
                  bien ingresar en un mapa la localización de tu negocio actual
                  para que Location-Wise te muestre el AGEB en un mapa
                  interactivo con mayor probabilidad de clientes potenciales o
                  bien con el mayor número de clientes similares a los que ya
                  tienes.
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
      </SafeAreaView>
    </View>
  );
};

export default Inicio;
