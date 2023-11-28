import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import COLORS from "../constants/colors";
import styles from "../../Styles/styles";
import MapView, { Marker, Polygon, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { textoLargo } from "../constants/textolargo";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";
import { useTheme } from "../context/ThemeContext";
import { hostIP } from "@env";
import * as geolib from "geolib";

const Inputs_Geolocation = ({ route }) => {
  const { theme } = useTheme();
  const [sliderValue, setSliderValue] = useState(100);
  const [isModalVisible, setModalVisible] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);

  const [agebData, setAgebData] = useState([]);
  const [selnivsoc, setSelnivsoc] = useState(null);
  const [selnivesc, setSelnivesc] = useState(null);
  const [selsiteco, setSelsiteco] = useState(null);
  const [selsitcony, setSelsitcony] = useState(null);
  const [seledad, setSeledad] = useState(null);
  const [sellim, setSellim] = useState(null);
  const [selsitescfin, setSelsitescfin] = useState(null);
  const [selrel, setSelrel] = useState(null);
  const [limitedData, setLimitedData] = useState(null);
  const [pobtot1, setPobtot1] = useState(null);
  const [pobmas1, setPobmas1] = useState(null);
  const [pobfem1, setPobfem1] = useState(null);
  const [nivsoc1, setNivsoc1] = useState(null);
  const [gradoesc1, setGradoesc1] = useState(null);
  const [gradoescfem1, setGradoescfem1] = useState(null);
  const [gradoescmas1, setGradoescmas1] = useState(null);
  const [edprom1, setEdprom1] = useState(null);
  const [selectedCvegeo1, setSelectedCvegeo1] = useState(null);

  useEffect(() => {
    // Cuando el componente se monta, actualiza el estado con los datos recibidos
    if (route.params) {
      setAgebData(route.params.agebData);
      setSelnivsoc(route.params.selnivsoc);
      setSelnivesc(route.params.selnivesc);
      setSelsiteco(route.params.selsiteco);
      setSelsitcony(route.params.selsitcony);
      setSeledad(route.params.seledad);
      setSellim(route.params.sellim);
      setSelsitescfin(route.params.selsitescfin);
      setSelrel(route.params.selrel);
      //console.log(limitedData)
    }
  }, [route.params]);

  const handlePressCustom = () => {
    if (sliderValue === 0) {
      Alert.alert("Mueve el slider para seleccionar un numero de zonas");
    } else {
      Alert.alert(
        `${sliderValue}%`,
        "¿Estás seguro de las zonas a geolocalizar? ",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Aceptar",
            onPress: () => {
              getCustomAgeb(
                selnivsoc,
                seledad,
                selnivesc,
                selsiteco,
                selsitescfin,
                selsitcony,
                selrel,
                sellim,
                sliderValue
              );
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const getCustomAgeb = async (
    nivsoc,
    edad,
    esc,
    siteco,
    sitesc,
    sitcony,
    rel,
    lim,
    zones
  ) => {
    // Verifica el valor de similitud...
    if (zones === 0) {
      Alert.alert("Mueve el slider para seleccionar un numero de zonas");
    } else {
      const custom_endpoint =
        `http://${hostIP}:3000/locationwise/v1/customers-inputs/customers-cvegeos/` +
        `${nivsoc}/${edad}/${esc}/${siteco}/${sitesc}/${sitcony}/${rel}/${lim}`;

      try {
        const response = await fetch(custom_endpoint);
        //console.log("Fetching: " + custom_endpoint);
        const data = await response.json();

        //console.log("Data:", data);

        // Limita la cantidad de zonas según el valor de zones
        const limitedData = data.slice(0, zones);
        setLimitedData(limitedData);

        // Utiliza Alert para mostrar mensajes...
        if (limitedData && limitedData.length > 0) {
          Alert.alert(
            "Se encontraron zonas similares",
            JSON.stringify(limitedData)
          );
        } else {
          console.log(
            "La respuesta está vacía o no tiene el formato esperado."
          );
        }
      } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", "Hubo un error.", [{ text: "OK" }]);
      }
    }
  };

  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate(coordinate);
    const selectedAgebData = findAgebDataByCoordinate(coordinate);
    if (selectedAgebData) {
      setSelectedCvegeo1(selectedAgebData.cvegeo);

      try {
        // Load AGEB data asynchronously
        await getAgebDataBycvegeo(selectedAgebData.cvegeo);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
  };

  const findAgebDataByCoordinate = (coordinate) => {
    const selectedAgebData = agebData.find((agebData) => {
      const stAsGeoJSON = JSON.parse(agebData.st_asgeojson);
      const polygonCoordinates = stAsGeoJSON.coordinates[0][0].map(
        ([longitude, latitude]) => ({ latitude, longitude })
      );

      const isPointInside = geolib.isPointInPolygon(
        coordinate,
        polygonCoordinates
      );

      return isPointInside;
    });

    return selectedAgebData || null;
  };

  const getAgebDataBycvegeo = async (cvegeo) => {
    const ageb_endpoint = `http://${hostIP}:3000/locationwise/v1/geocode-settlement/${cvegeo}`;
    //console.log("Ip:", hostIP);
    console.log("Fetching: " + ageb_endpoint);
    try {
      const response = await fetch(ageb_endpoint, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const res = await response.json();

        //console.log("AGEB data fetched: " + JSON.stringify(res));
        //return res;
        if (res && res.length > 0) {
          const agebbycvegeo = res[0];
          setPobtot1(agebbycvegeo?.pobtot);
          setPobmas1(agebbycvegeo?.pobmas);
          setPobfem1(agebbycvegeo?.pobfem);
          setNivsoc1(agebbycvegeo?.lw_economiapred);
          setGradoesc1(agebbycvegeo?.graproes);
          setGradoescfem1(agebbycvegeo?.graproes_f);
          setGradoescmas1(agebbycvegeo?.graproes_m);
          setEdprom1(agebbycvegeo?.lw_edprom);
        } else {
          console.log(
            "La respuesta está vacía o no tiene el formato esperado."
          );
        }
      } else {
        console.log("AGEB data not found");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

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
                      placeholder={selnivsoc}
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
                      placeholder={seledad}
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
                      placeholder={selnivesc}
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
                      placeholder={sellim}
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
                      placeholder={selsiteco}
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
                      placeholder={selsitescfin}
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
                      placeholder={selsitcony}
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
                      placeholder={selrel}
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
                                ? { ...styles.tittle1, color: "white" }
                                : { ...styles.tittle1, color: "white" }
                            }
                          >
                            Aquí encontrarás el significado de los valores de tú
                            tabla
                          </Text>
                          <Text
                            style={
                              theme === "light"
                                ? { ...styles.textmodal, color: "white" }
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
                      onPress={handlePressCustom}
                      style={{ height: 40 }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.containermap}>
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
              onPress={handleMapPress}
            >
              {agebData.map((agebData) => {
                try {
                  const stAsGeoJSON = JSON.parse(agebData.st_asgeojson);
                  const coordinates = stAsGeoJSON.coordinates[0][0].map(
                    ([longitude, latitude]) => ({ latitude, longitude })
                  );

                  // Verificar si el cvegeo está presente en data
                  const cvegeoEnData =
                    limitedData &&
                    limitedData.find((item) => item.cvegeo === agebData.cvegeo);

                  if (cvegeoEnData) {
                    return (
                      <Polygon
                        key={agebData.cvegeo}
                        coordinates={coordinates}
                        strokeWidth={1.5}
                        strokeColor="rgb(40, 221, 160)"
                        fillColor="rgba(117, 244, 209, 0.8)"
                      />
                    );
                  } else {
                    return null;
                  }
                } catch (error) {
                  console.error("Error parsing st_asgeojson:", error);
                  return null;
                }
              })}
              {markerCoordinate && (
                <Marker
                  coordinate={markerCoordinate}
                  title={selectedCvegeo1 || "Sin selección"}
                  description={`Latitud: ${markerCoordinate.latitude}, Longitud: ${markerCoordinate.longitude}`}
                >
                  <Callout>
                    <View>
                      <Text>{selectedCvegeo1}</Text>
                    </View>
                  </Callout>
                </Marker>
              )}
            </MapView>
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
                  value={selectedCvegeo1 !== null ? String(selectedCvegeo1) : ""}
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
                Poblacion total:
              </Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={pobtot1 !== null ? String(pobtot1) : ""}
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
                Poblacion masculina
              </Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={pobmas1 !== null ? String(pobmas1) : ""}
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
                Poblacion femenina
              </Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={pobfem1 !== null ? String(pobfem1) : ""}
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
                  value={nivsoc1 !== null ? String(nivsoc1) : ""}
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
                Grado de escolaridad promedio:
              </Text>
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={gradoesc1 !== null ? String(gradoesc1) : ""}
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
                  value={gradoescfem1 !== null ? String(gradoescfem1) : ""}
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
              <View style={{...styles.textimput , marginBottom: 35}}>
                <TextInput
                  placeholder="Selecciona un punto en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={gradoescmas1 !== null ? String(gradoescmas1) : ""}
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
              <Button
                title="Regresar al inicio"
                onPress={() => navigation.navigate("SolucionesScreen")}
                style={{ height: 40 }}
              />
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
