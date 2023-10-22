import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { useFonts } from "expo-font";
import styles from "../Styles/styles";

const Inicio = () => {
  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={styles.img}>
      <ScrollView>
        <View>
          <View style={styles.containeruser}>
            <Text style={styles.usertittle}>Hola de nuevo</Text>
            <Text style={styles.usertittle}>@user 👋</Text>
          </View>
          <View>
            <View style={styles.containerexp}>
              <Text style={styles.tittle3}>
                Location-Wise, una de nuestras soluciones.{" "}
              </Text>
              <Text style={styles.tittle3}>SOLAMENTE CDMX</Text>
              <Text style={styles.tittle3}>
                Dirigido a microempresas y nuevos emprendedores
              </Text>
            </View>
            <View style={styles.containerinfo}>
              <Text style={styles.tittle2}>¿Qué es Location-Wise?</Text>
              <Text style={styles.tittle4}>
                Location-Wise es una solución geográfica que te ayuda a
                localizar tu negocio mediante el uso de mapas y datos
                geoestadísticos.
              </Text>
            </View>
            <View style={styles.containerinfo}>
              <Text style={styles.tittle2}>¿Cómo funciona?</Text>
              <Text style={styles.tittle4}>
                Location-Wise recopila la información de una área geográfica
                gracias a los datos abiertos del INEGI, resume los datos más
                relevantes de un área geoestadística básica (AGEB) para tú
                negocio y en base a eso te despliega en un mapa el AGEB con
                mayor probabilidad de clientes potenciales o bien con el mayor
                número de clientes similares a los que ya tienes.
              </Text>
            </View>
            <View style={styles.containerinfo}>
              <Text style={styles.tittle2}>¿Cómo puedo usarlo?</Text>
              <Text style={styles.tittle4}>
                Para usar Location-Wise basta con ingresar datos de tú publico
                objetivo si es que no cuentas con un negocio actualmente, o bien
                ingresar en un mapa la localización de tu negocio actual para
                que Location-Wise te muestre el AGEB en un mapa interactivo con
                mayor probabilidad de clientes potenciales o bien con el mayor
                número de clientes similares a los que ya tienes.
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

export default Inicio;
