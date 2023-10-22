import React from "react";
import { View, Text, ScrollView, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { useFonts } from "expo-font";
import styles from "../Styles/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const images = [
  require("../assets/demostrativas/demostrativo1.png"),
  require("../assets/demostrativas/demostrativo2.png"),
  require("../assets/demostrativas/demostrativo3.png"),
  require("../assets/demostrativas/demostrativo4.png"),
];
const Soluciones = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={styles.img}>
      <ScrollView>
        <View>
          <View style={styles.containertittle}>
            <Text style={styles.principaltittle}>
              ENCUENTRA TÚ LUGAR EN EL MUNDO.
            </Text>
          </View>
          <View style={styles.containerSol}>
            <Image
              source={require("../assets/logo.png")}
              style={{
                height: 60,
                width: 60,
                marginRight: 20,
              }}
            />
            <View>
              <Text style={styles.tittle1}>LocationWise</Text>
              <Text style={styles.tittle5}>
                Mas que un mapa, una estrategia
              </Text>
              <Text style={styles.tittle5}>LocationWise optimiza</Text>
            </View>
          </View>
          <View style={styles.containerdemo}>
            <View style={styles.container1}>
              <Text style={styles.textodemo}>
                Ingresa la ubicacion de tu negocio
              </Text>
              <Image
                source={require("../assets/demostrativas/demostrativo1.png")}
                style={styles.imagedemo}
              />
              <Icon
                name="arrow-down"
                size={40}
                color="grey"
                style={{ marginTop: 20 }}
              />
            </View>
            <View style={styles.container1}>
              <Text style={styles.textodemo}>Confirma</Text>
              <Image
                source={require("../assets/demostrativas/demostrativo2.png")}
                style={styles.imagedemo}
              />
              <Icon
                name="arrow-down"
                size={40}
                color="grey"
                style={{ marginTop: 20 }}
              />
            </View>
            <View style={styles.container1}>
              <Text style={styles.textodemo}>
                Ingresa una similaridad en base a la zona de tu negocio
              </Text>
              <Image
                source={require("../assets/demostrativas/demostrativo3.png")}
                style={styles.imagedemo1}
              />
              <Icon
                name="arrow-down"
                size={40}
                color="grey"
                style={{ marginTop: 20 }}
              />
            </View>
            <View style={styles.container1}>
              <Text style={styles.textodemo}>
                Visualiza las zonas similares
              </Text>
              <Image
                source={require("../assets/demostrativas/demostrativo4.png")}
                style={styles.imagedemo}
              />
            </View>
            <View style={{marginTop: 50}}>
              <Button
                title="Comenzar"
                onPress={() => navigation.navigate("Locwise")}
                style={{
                  height: 50,
                }}
              />
            </View>
            <View style={{marginTop: 45, width: "80%", alignSelf: "center"}}>
              <Button
                title="Contactanos"
                onPress={() => navigation.navigate("Contactanos")}
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
          {/*<View style={styles.containerdemo}>
            <MyCarousel />
            <View style={{marginTop: 50}}>
              <Button
                title="Comenzar"
                onPress={() => navigation.navigate("Inputs_Geolocation")}
                style={{}}
              />
            </View>
            <View style={{marginTop: 45, width: "80%", alignSelf: "center"}}>
              <Button
                title="Contactanos"
                onPress={() => navigation.navigate("Contactanos")}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>*/}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Soluciones;
