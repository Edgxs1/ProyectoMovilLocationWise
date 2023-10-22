import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { useFonts } from "expo-font";
import styles from "../Styles/styles";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const Locwise = () => {
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
          <View style={styles.containersP}>
            <View style={styles.containerinfo}>
              <Text style={styles.tittle2}>¿Qué es Location-Wise?</Text>
              <Text style={styles.tittle4}>
                Location-Wise es una solución de análisis de datos que te
                permite analizar y visualizar la información de tu público
                objetivo. Con Location-Wise puedes analizar la información de tu
                comercio y tomar decisiones basadas en datos.
              </Text>
            </View>
            <View style={styles.containerinfo}>
              <Text style={styles.tittle2}>¿Cómo funciona?</Text>
              <Text style={styles.tittle4}>
                Location-Wise recopila la información de sistemas de información
                geográfica (SIG) gracias a los datos abiertos del INEGI, los
                indicadores a niveles geográficos desagregados del AMAI , resume
                los datos más relevantes de un área geoestadística básica
                (AGEB),entre otros, y te muestra la información más relevante
                para tú negocio y despliega un mapa con zonas similares a la de
                tú negocio actual con el mayor número de clientes similares a
                los que ya tienes
              </Text>
            </View>
            <View style={styles.containerinfo}>
              <Text style={styles.tittle2}>
                ¿Qué obtengo al usar Location-Wise?
              </Text>
              <Text style={styles.tittle4}>
                Al usar Location-Wise puedes visualizar zonas similares a la de
                tú negocio actual, lo que se traduce en mayor número de clientes
                similares a los que ya cuentas y un mayor abanico de
                posibilidades hacia a dónde expandir tú negocio
              </Text>
            </View>
            <View style={styles.containermap}>
              {/*Leaflet goes here instead of google maps */}
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
            <View style={{marginBottom: 50}}>
              <View style={styles.containertext}>
                <Text style={styles.tittle1}>
                  Ingresa la localizacion de tu comercio.
                </Text>
                <Pressable onPress={() => navigation.navigate("Inputs")}>
                  <Text style={styles.txtcom}>¿No tienes un comercio?</Text>
                </Pressable>
              </View>
              <View>
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
                    INFORMACION DE LA ZONA:
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
                    <Text style={styles.tittle5}>
                      Grado de escolaridad promedio:
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
              </View>
            </View>
            <View style={{width: "85%", alignSelf: "center"}}>
              <Button
                title="Geolocalizar"
                onPress={() => navigation.navigate("Geolocation")
                }
                style={{height: 50}}
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

export default Locwise;
