import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import COLORS from "../constants/colors";
import { useFonts } from "expo-font";
import styles from "../Styles/styles";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const Inputs = () => {
    const navigation = useNavigation();
  const initialRegion = {
    latitude: 19.4326, // Latitud de la Ciudad de México
    longitude: -99.1332, // Longitud de la Ciudad de México
    latitudeDelta: 0.0922, // Zoom inicial
    longitudeDelta: 0.0421, // Zoom inicial
  };
  return (
    <ImageBackground
      source={require("../assets/bgform.png")}
      style={styles.img}
    >
      <ScrollView style={styles.scroll}>
        <View>
          <View style={styles.containersP}>
            <View style={styles.containerinfo}>
              <Text style={styles.tittle2}>
                ¿Cómo puedo usar LocationWise-kickstarter?
              </Text>
              <Text style={styles.tittle4}>
                Para usar LocationWise-kickstarter, primero debes ingresar los
                datos de tú público objetivo en el siguiente formulario, después
                de ingresar los datos, puedes visualizar la información de tú
                público objetivo en un mapa interactivo.
              </Text>
            </View>
            <View style={styles.containerinfo}>
              <Text style={styles.tittle2}>
                ¿Qué datos necesito para usar LocationWise-kickstarter?
              </Text>
              <Text style={styles.tittle4}>
                Para usar LocationWise-kickstarter, necesitas ingresar los datos
                de tú público objetivo en el siguiente formulario, los datos que
                necesitas de tú público objetivo son:
              </Text>
              <Text style={styles.tittle7}>
                Nivel socioeconómico predominante Obligatorio
              </Text>
              <Text style={styles.tittle7}>Rango(s) de edad Obligatorio</Text>
              <Text style={styles.tittle7}>
                Nivel de escolaridad promedio Recomendado
              </Text>
              <Text style={styles.tittle7}>Sexo</Text>
              <Text style={styles.tittle7}>
                Situación económica (Activo/Inactivo)
              </Text>
              <Text style={styles.tittle7}>
                Situación escolar (Primaria, Secundaria, . . . , Primaria
                Incompleta, . . . , No asiste, . . .)
              </Text>
              <Text style={styles.tittle7}>Situacion conyugal</Text>
              <Text style={styles.tittle7}>Religión</Text>
              <Text style={styles.tittle7}>Limitación (Analfabetismo)</Text>
              <Text style={styles.tittle7}>
                Cabe destacar que puedes elegir diferentes rangos de edad, nivel
                socioeconomico, entre otros. Si deseas omitir alguna
                característica también es posible (excepto las obligatorias),
                sin embargo la exactitud será menor.
              </Text>
            </View>
            <View style={{marginBottom: 50}}>
              <View>
                <Text style={styles.tittle8}>
                  Ingresa los datos de tu publico objetivo
                </Text>
              </View>
              <View>
                <View>
                  {/*view de inputs */}
                  <View style={styles.containerSolucion}>
                    <Text style={styles.tittle6}>Nivel socioeconomico:</Text>
                    <View style={styles.textinput1}>
                      <TextInput
                        placeholder="Prospero (A/B)"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        style={{
                          width: "100%",
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text style={styles.tittle6}>
                      Nivel de escolaridad actual:
                    </Text>
                    <View style={styles.textinput1}>
                      <TextInput
                        placeholder="Poblacion de 3 a 5 años que no asiste a la escuela"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        style={{
                          width: "100%",
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text style={styles.tittle6}>Situacion economica: </Text>
                    <View style={styles.textinput1}>
                      <TextInput
                        placeholder="Poblacion de 12 años y mas economicamente activa"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        style={{
                          width: "100%",
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text style={styles.tittle6}>Situacion conyugal</Text>
                    <View style={styles.textinput1}>
                      <TextInput
                        placeholder="Poblacion de 12 años y mas soltera o nunca unida "
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        style={{
                          width: "100%",
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text style={styles.tittle6}>Edad:</Text>
                    <View style={styles.textinput1}>
                      <TextInput
                        placeholder="Poblacion de 0 a 14 años"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        style={{
                          width: "100%",
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text style={styles.tittle6}>Limitacion:</Text>
                    <View style={styles.textinput1}>
                      <TextInput
                        placeholder="Poblacion de 8 a 14 años qe es analfabeta"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        style={{
                          width: "100%",
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text style={styles.tittle6}>Situacion escolar final:</Text>
                    <View style={styles.textinput1}>
                      <TextInput
                        placeholder="Poblacion de 15 años y mas sin escolaridad"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        style={{
                          width: "100%",
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text style={styles.tittle6}>Religion:</Text>
                    <View style={styles.textinput1}>
                      <TextInput
                        placeholder="Poblacion con religion catolica de 12 años y mas"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        style={{
                          width: "100%",
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{width: "85%", alignSelf: "center"}}>
              <Button
                title="Geolocalizar"
                onPress={() => navigation.navigate("Inputs_Geolocation")}
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

export default Inputs;
