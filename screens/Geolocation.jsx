import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  Alert,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { useFonts } from "expo-font";
import styles from "../Styles/styles";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import { useState } from "react";
import { textoLargo } from "../constants/textolargo";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";

const Geolocation = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const initialRegion = {
    latitude: 19.4326, // Latitud de la Ciudad de México
    longitude: -99.1332, // Longitud de la Ciudad de México
    latitudeDelta: 0.0922, // Zoom inicial
    longitudeDelta: 0.0421, // Zoom inicial
  };
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../assets/bgform.png")}
      style={styles.img}
    >
      <ScrollView style={styles.scroll}>
        <View>
          <View style={{ marginBottom: 40 }}>
            <View style={styles.containerinfo}>
              <Text style={styles.tittle2}>¿Qué es similaridad?</Text>
              <Text style={styles.tittle4}>
                LocationWise proporciona una herramienta para ayudar a medir la
                similaridad de una Área Geoestadística básica (AGEB) con
                respecto a otra. La similaridad se mide en base a la cantidad de
                clientes que tienen características similares a los clientes de
                su negocio.
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: 50 }}>
            <View style={styles.containertext}>
              <Text style={styles.tittle1}>SIMILARIDAD EN BASE A: @zona</Text>
            </View>
            <View>
              <View>
                <View>
                  <Slider
                    style={styles.slider}
                    value={sliderValue}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    onValueChange={(value) => setSliderValue(value)}
                  />
                  <Text style={styles.tittle3}>{sliderValue}%</Text>
                  <View style={{ width: "60%", alignSelf: "center" }}>
                    <Button
                      title="Desplegar zonas"
                      onPress={() => console.log("Desplegar zonas")}
                      style={{ height: 40 }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: COLORS.white,
                marginTop: 35,
                fontSize: 20,
                paddingLeft: 15,
                textDecorationLine: "underline",
              }}
            >
              INFORMACIÓN DE TU ZONA:
            </Text>
          </View>
          <View>
            {/*view de inputs */}
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>Clave unica:</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>Poblacion total:</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>Poblacion masculina</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>Poblacion femenina</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>
                Nivel socioeconomico predominante:
              </Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>Grado de escolaridad promedio:</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>
                Grado de escolaridad promedio de mujeres:
              </Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>
                Grado de escolaridad promedio de hombres:
              </Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
          </View>
          <View style={styles.containermap}>
            {/*Leaflet goes here instead of google maps */}
            <View>
            <Text
              style={{
                color: COLORS.white,
                marginTop: 35,
                fontSize: 20,
                paddingLeft: 15,
                textDecorationLine: "underline",
                marginBottom: 10,
              }}
            >
              ZONAS CON CARACTERÍSTICAS SIMILARES A LA TUYA:
            </Text>
          </View>
            <MapView style={styles.map} initialRegion={initialRegion} />
            <Marker
              coordinate={{
                latitude: 19.4326, // Latitud de la Ciudad de México
                longitude: -99.1332, // Longitud de la Ciudad de México
              }}
              title="Ciudad de México"
              description="Capital de México"
            />
          </View>
          <View>
            <Text
              style={{
                color: COLORS.white,
                marginTop: 70,
                fontSize: 20,
                paddingLeft: 15,
                textDecorationLine: "underline",
              }}
            >
              ZONA EN EL MAPA:
            </Text>
          </View>
          <View>
            {/*view de inputs */}
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>Clave unica:</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>Poblacion total:</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>Poblacion masculina</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>Poblacion femenina</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>
                Nivel socioeconomico predominante:
              </Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>Grado de escolaridad promedio:</Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>
                Grado de escolaridad promedio de mujeres:
              </Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerSolucion}>
              <Text style={styles.tittle5}>
                Grado de escolaridad promedio de hombres:
              </Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
          </View>
          <View style={styles.textend}>
            <Text style={styles.ref}>
              Location-Wise® 2023 - Marketing Automated Geographic Engine
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Geolocation;
