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
import styles from "../../Styles/styles";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { useState } from "react";
import { textoLargo } from "../constants/textolargo";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";
import { useTheme } from "../context/ThemeContext";

const Inputs_Geolocation = () => {
  const { theme } = useTheme();
  const [sliderValue, setSliderValue] = useState(100);
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
    <View
      style={
        theme === "light"
          ? { flex: 1, backgroundColor: COLORS.light }
          : { flex: 1, backgroundColor: COLORS.dark }
      }
    >
      <ScrollView style={styles.scroll}>
        <View>
          <View style={{ marginBottom: 10 }}>
            <View style={styles.containerinfo}>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle2
                    : { ...styles.tittle2, color: "white" }
                }
              >
                ¿Qué es similaridad?
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle4
                    : { ...styles.tittle4, color: "white" }
                }
              >
                LocationWise proporciona una herramienta para ayudar a medir la
                similaridad de una Área Geoestadística básica (AGEB) con
                respecto a otra. La similaridad se mide en base a la cantidad de
                clientes que tienen características similares a los clientes de
                su negocio.
              </Text>
            </View>
          </View>
          <View>
            <View>
              <View>
                <Text
                  style={
                    theme === "light"
                      ? { ...styles.tittle1, marginTop: 40, marginBottom: 20 }
                      : {
                          ...styles.tittle1,
                          marginTop: 40,
                          marginBottom: 20,
                          color: "white",
                        }
                  }
                >
                  SIMILARIDAD EN BASE A LAS CARACTERÍSTICAS SELECCIONADAS:
                </Text>
              </View>
              <View>
                {/*view de inputs */}
                <View style={styles.containerSolucion1}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle5
                        : { ...styles.tittle5, color: "white" }
                    }
                  >
                    Caracteristicas:
                  </Text>
                  <View
                    style={
                      theme === "light"
                        ? styles.textinput2
                        : {
                            ...styles.textinput2,
                            borderColor: "white",
                          }
                    }
                  >
                    <TextInput
                      placeholder="Valor"
                      placeholderTextColor={
                        theme === "light" ? COLORS.buttonprimary : "white"
                      }
                      editable={false}
                      keyboardType="default"
                      style={{}}
                    />
                  </View>
                </View>
                <View style={styles.containerSolucion1}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle5
                        : { ...styles.tittle5, color: "white" }
                    }
                  >
                    Nivel socioeconómico:
                  </Text>
                  <View
                    style={
                      theme === "light"
                        ? styles.textinput2
                        : {
                            ...styles.textinput2,
                            borderColor: "white",
                          }
                    }
                  >
                    <TextInput
                      placeholder="valor"
                      placeholderTextColor={
                        theme === "light" ? COLORS.buttonprimary : "white"
                      }
                      editable={false}
                      keyboardType="default"
                      style={{}}
                    />
                  </View>
                </View>
                <View style={styles.containerSolucion1}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle5
                        : { ...styles.tittle5, color: "white" }
                    }
                  >
                    Rango de edad:
                  </Text>
                  <View
                    style={
                      theme === "light"
                        ? styles.textinput2
                        : {
                            ...styles.textinput2,
                            borderColor: "white",
                          }
                    }
                  >
                    <TextInput
                      placeholder="valor"
                      placeholderTextColor={
                        theme === "light" ? COLORS.buttonprimary : "white"
                      }
                      editable={false}
                      keyboardType="default"
                      style={{}}
                    />
                  </View>
                </View>
                <View style={styles.containerSolucion1}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle5
                        : { ...styles.tittle5, color: "white" }
                    }
                  >
                    Nivel de escolaridad actual:
                  </Text>
                  <View
                    style={
                      theme === "light"
                        ? styles.textinput2
                        : {
                            ...styles.textinput2,
                            borderColor: "white",
                          }
                    }
                  >
                    <TextInput
                      placeholder="valor"
                      placeholderTextColor={
                        theme === "light" ? COLORS.buttonprimary : "white"
                      }
                      editable={false}
                      keyboardType="default"
                      style={{}}
                    />
                  </View>
                </View>
                <View style={styles.containerSolucion1}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle5
                        : { ...styles.tittle5, color: "white" }
                    }
                  >
                    Limitación:
                  </Text>
                  <View
                    style={
                      theme === "light"
                        ? styles.textinput2
                        : {
                            ...styles.textinput2,
                            borderColor: "white",
                          }
                    }
                  >
                    <TextInput
                      placeholder="valor"
                      placeholderTextColor={
                        theme === "light" ? COLORS.buttonprimary : "white"
                      }
                      editable={false}
                      keyboardType="default"
                      style={{}}
                    />
                  </View>
                </View>
                <View style={styles.containerSolucion1}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle5
                        : { ...styles.tittle5, color: "white" }
                    }
                  >
                    Situación económica:
                  </Text>
                  <View
                    style={
                      theme === "light"
                        ? styles.textinput2
                        : {
                            ...styles.textinput2,
                            borderColor: "white",
                          }
                    }
                  >
                    <TextInput
                      placeholder="valor"
                      placeholderTextColor={
                        theme === "light" ? COLORS.buttonprimary : "white"
                      }
                      editable={false}
                      keyboardType="default"
                      style={{}}
                    />
                  </View>
                </View>
                <View style={styles.containerSolucion1}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle5
                        : { ...styles.tittle5, color: "white" }
                    }
                  >
                    Situación escolar final:
                  </Text>
                  <View
                    style={
                      theme === "light"
                        ? styles.textinput2
                        : {
                            ...styles.textinput2,
                            borderColor: "white",
                          }
                    }
                  >
                    <TextInput
                      placeholder="valor"
                      placeholderTextColor={
                        theme === "light" ? COLORS.buttonprimary : "white"
                      }
                      editable={false}
                      keyboardType="default"
                      style={{}}
                    />
                  </View>
                </View>
                <View style={styles.containerSolucion1}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle5
                        : { ...styles.tittle5, color: "white" }
                    }
                  >
                    Situación conyugal:
                  </Text>
                  <View
                    style={
                      theme === "light"
                        ? styles.textinput2
                        : {
                            ...styles.textinput2,
                            borderColor: "white",
                          }
                    }
                  >
                    <TextInput
                      placeholder="valor"
                      placeholderTextColor={
                        theme === "light" ? COLORS.buttonprimary : "white"
                      }
                      editable={false}
                      keyboardType="default"
                      style={{}}
                    />
                  </View>
                </View>
                <View style={styles.containerSolucion1}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle5
                        : { ...styles.tittle5, color: "white" }
                    }
                  >
                    Religión:
                  </Text>
                  <View
                    style={
                      theme === "light"
                        ? styles.textinput2
                        : {
                            ...styles.textinput2,
                            borderColor: "white",
                          }
                    }
                  >
                    <TextInput
                      placeholder="valor"
                      placeholderTextColor={
                        theme === "light" ? COLORS.buttonprimary : "white"
                      }
                      editable={false}
                      keyboardType="default"
                      style={{}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: "55%",
                    alignSelf: "center",
                    height: "auto",
                    marginTop: 20,
                  }}
                >
                  <Button
                    title="Diccionario de valores"
                    onPress={toggleModal}
                    style={{ height: 40 }}
                  />
                  <Modal isVisible={isModalVisible}>
                    <SafeAreaView>
                      <ScrollView>
                        <View
                          style={{
                            flex: 1,
                            width: "95%",
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={
                              theme === "light"
                                ? {...styles.tittle1, color: "white"}
                                : { ...styles.tittle1, color: "white" }
                            }
                          >
                            Aquí encontrarás el significado de los valores de tú
                            tabla
                          </Text>
                          <Text
                            style={
                              theme === "light"
                                ? {...styles.textmodal, color: "white"}
                                : { ...styles.textmodal, color: "white" }
                            }
                          >
                            {textoLargo}
                          </Text>
                          <View
                            style={{
                              width: "60%",
                              alignSelf: "center",
                              height: "auto",
                              marginTop: 20,
                            }}
                          >
                            <Button
                              title="Cerrar"
                              onPress={toggleModal}
                              style={{ height: 50 }}
                            />
                          </View>
                        </View>
                      </ScrollView>
                    </SafeAreaView>
                  </Modal>
                </View>
                <View>
                  <Slider
                    style={styles.slider}
                    value={sliderValue}
                    minimumValue={0}
                    maximumValue={200}
                    step={1}
                    onValueChange={(value) => setSliderValue(value)}
                  />
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle3
                        : { ...styles.tittle3, color: "white" }
                    }
                  >
                    Desplegar las {sliderValue} zonas con mayores
                    características proporcionadas
                  </Text>
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
                color: theme === "light" ? "black" : "white",
                marginTop: 35,
                fontSize: 20,
                paddingLeft: 15,
                textDecorationLine: "underline",
              }}
            >
              AGEBS CON MAYOR POBLACIÓN SELECCIONADA:
            </Text>
          </View>
          <View>
            {/*view de inputs */}
            <View style={styles.containerSolucion}>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
                Próspero
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
              <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
                pob0_14
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
              <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
                p3a5_noa
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
              <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
                pea
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
              <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
                p15ym_se
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
              <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
                p12ym_solt
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
              <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
                pcatolica
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
              <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
                p8a14an
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
          <View>
            <Text
              style={{
                color: theme === "light" ? "black" : "white",
                marginTop: 35,
                fontSize: 20,
                paddingLeft: 15,
                textDecorationLine: "underline",
              }}
            >
              INFORMACIÓN DEL AGEB:
            </Text>
          </View>
          <View>
            {/*view de inputs */}
            <View style={styles.containerSolucion}>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
                Clave unica:
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
            <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >Poblacion total:</Text>
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
            <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >Poblacion masculina</Text>
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
            <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >Poblacion femenina</Text>
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
            <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
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
            <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >Grado de escolaridad promedio:</Text>
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
            <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
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
            <Text
                style={
                  theme === "light"
                    ? styles.tittle5
                    : { ...styles.tittle5, color: "white" }
                }
              >
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
    </View>
  );
};

export default Inputs_Geolocation;
