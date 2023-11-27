import React, { useState, useEffect } from "react";
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
import { textoLargo } from "../constants/textolargo";
import Slider from "@react-native-community/slider";
import { useTheme } from "../context/ThemeContext";
import { hostIP } from "@env";
import Modal from "react-native-modal";
import * as geolib from "geolib";

const Geolocation = ({ route }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [sliderValue, setSliderValue] = useState(50);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCvegeo, setSelectedCvegeo] = useState(null);
  const [pobtot, setPobtot] = useState(null);
  const [pobmas, setPobmas] = useState(null);
  const [pobfem, setPobfem] = useState(null);
  const [nivsoc, setNivsoc] = useState(null);
  const [gradoesc, setGradoesc] = useState(null);
  const [gradoescfem, setGradoescfem] = useState(null);
  const [gradoescmas, setGradoescmas] = useState(null);
  const [edprom, setEdprom] = useState(null);
  const [data, setData] = useState(null);
  const [agebData, setAgebData] = useState([]);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [zonesDeployed, setZonesDeployed] = useState(false);
  const [cvegeo1, setCvegeo1] = useState(null);
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
      setSelectedCvegeo(route.params.selectedCvegeo);
      setPobtot(route.params.pobtot);
      setPobmas(route.params.pobmas);
      setPobfem(route.params.pobfem);
      setNivsoc(route.params.nivsoc);
      setGradoesc(route.params.gradoesc);
      setGradoescfem(route.params.gradoescfem);
      setGradoescmas(route.params.gradoescmas);
      setEdprom(route.params.edprom);
      setAgebData(route.params.agebData);
    }
  }, [route.params]);

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
    console.log("Ip:", hostIP);
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

  const handleButtonPress = () => {
    if (sliderValue === 0) {
      Alert.alert(
        "Mueve el slider para seleccionar un porcentaje de similaridad"
      );
    } else {
      Alert.alert(
        `${sliderValue}%`,
        "¿Estás seguro del porcentaje de similaridad seleccionado? ",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Aceptar",
            onPress: () => {
              // Llama a la función para obtener datos similares
              getSimilarSettlements(selectedCvegeo, sliderValue);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const getSimilarSettlements = async (cvegeo, similarity) => {
    // Verifica el valor de similitud...
    if (similarity === 0) {
      Alert.alert(
        "Mueve el slider para seleccionar un porcentaje de similaridad"
      );
    } else {
      let percent = similarity * 0.01;
      let pobtot1 = parseFloat(pobtot);
      let lw_economiapred = String(nivsoc);
      let graproes = parseFloat(gradoesc);
      let lw_edprom = parseFloat(edprom);

      let pobtotSTART = parseFloat(pobtot1 * percent);
      let pobtotEND = parseFloat(pobtot1 + (pobtot1 - pobtotSTART));
      let graproesSTART = parseFloat(graproes * percent);
      let graproesEND = parseFloat(graproes + (graproes - graproesSTART));
      let lw_edpromSTART = parseFloat(lw_edprom * percent);
      let lw_edpromEND = parseFloat(lw_edprom + (lw_edprom - lw_edpromSTART));

      if (lw_economiapred == "A/B") {
        lw_economiapred = "A%2FB";
      }
      //console.log("ip" + hostIP);
      const similarity_endoint =
        `http://${hostIP}:3000/locationwise/v1/geocode-settlement/getsimilarsettlements/` +
        nivsoc +
        "/" +
        pobtotSTART +
        "/" +
        pobtotEND +
        "/" +
        graproesSTART +
        "/" +
        graproesEND +
        "/" +
        lw_edpromSTART +
        "/" +
        lw_edpromEND;
      try {
        const response = await fetch(similarity_endoint);
        console.log("Fetching: " + similarity_endoint);
        const data = await response.json();

        // Utiliza Alert para mostrar mensajes...
        setData(data);
        //console.log("data: " + JSON.stringify(data));
        if (data && data.length > 0) {
          const agebbycvegeo = data[0];
          //console.log("cvegeo: " + agebbycvegeo?.cvegeo);
          if (agebbycvegeo?.cvegeo == selectedCvegeo) {
            console.log("son iguales");
          } else {
            setModalVisible(true);
          }
        } else {
          console.log(
            "La respuesta está vacía o no tiene el formato esperado."
          );
        }
        //console.log("Cantidad de elementos en el array:", data.length);
        //Alert.alert("Éxito", `Datos: ${JSON.stringify(data)}`);
        //console.log("data: " + JSON.stringify(data));

        // Otra lógica...
      } catch (error) {
        console.error("Error:", error);
        // Maneja los errores...
      }
    }
  };

  const initialRegion = {
    latitude: 19.4326, // Latitud de la Ciudad de México
    longitude: -99.1332, // Longitud de la Ciudad de México
    latitudeDelta: 0.0922, // Zoom inicial
    longitudeDelta: 0.0421, // Zoom inicial
  };

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
          <View style={{ marginBottom: 40 }}>
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

          <View style={{ marginBottom: 50 }}>
            <View style={styles.containertext}>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle1
                    : { ...styles.tittle1, color: "white" }
                }
              >
                SIMILARIDAD EN BASE A TU ZONA
              </Text>
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
                  <Text
                    style={
                      theme === "light"
                        ? styles.tittle3
                        : { ...styles.tittle3, color: "white" }
                    }
                  >
                    {sliderValue}%
                  </Text>
                  <View style={{ width: "60%", alignSelf: "center" }}>
                    <Button
                      title="Desplegar zonas"
                      onPress={handleButtonPress}
                      style={{ height: 40 }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
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
                        ? { ...styles.tittle1, color: "white", fontSize: 20 }
                        : { ...styles.tittle1, color: "white", fontSize: 20 }
                    }
                  >
                    Exito
                  </Text>
                  <Text
                    style={
                      theme === "light"
                        ? {
                            ...styles.textmodal,
                            color: "white",
                            textAlign: "center",
                          }
                        : {
                            ...styles.textmodal,
                            color: "white",
                            textAlign: "center",
                          }
                    }
                  >
                    "se han encontrado", {data?.length ?? 0}, " zonas similares
                    a la tuya";
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
              INFORMACIÓN DE TU ZONA:
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
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={selectedCvegeo !== null ? String(selectedCvegeo) : ""}
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
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={pobtot !== null ? String(pobtot) : ""}
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
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={pobmas !== null ? String(pobmas) : ""}
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
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={pobfem !== null ? String(pobfem) : ""}
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
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={nivsoc !== null ? String(nivsoc) : ""}
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
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={gradoesc !== null ? String(gradoesc) : ""}
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
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={gradoescfem !== null ? String(gradoescfem) : ""}
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
                  placeholder="@valor"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={gradoescmas !== null ? String(gradoescmas) : ""}
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
                  color: theme === "light" ? "black" : "white",
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
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
              onPress={handleMapPress}
            >
              {agebData.map((agebData) => {
                try {
                  //console.log("DIBUJANDOOOOO");
                  const stAsGeoJSON = JSON.parse(agebData.st_asgeojson);
                  const coordinates = stAsGeoJSON.coordinates[0][0].map(
                    ([longitude, latitude]) => ({ latitude, longitude })
                  );

                  // Verificar si el cvegeo está presente en data
                  const cvegeoEnData =
                    data &&
                    data.find((item) => item.cvegeo === agebData.cvegeo);

                  if (cvegeoEnData) {
                    return (
                      <Polygon
                        key={agebData.cvegeo}
                        coordinates={coordinates}
                        strokeWidth={1}
                        strokeColor="rgb(113, 201, 206)"
                        fillColor="rgba(203, 241, 245, 0.7)"
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
                  placeholder="Selecciona una zona en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={
                    selectedCvegeo1 !== null ? String(selectedCvegeo1) : ""
                  }
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
                  placeholder="Selecciona una zona en el mapa"
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
                  placeholder="Selecciona una zona en el mapa"
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
                  placeholder="Selecciona una zona en el mapa"
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
                  placeholder="Selecciona una zona en el mapa"
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
                  placeholder="Selecciona una zona en el mapa"
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
                  placeholder="Selecciona una zona en el mapa"
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
              <View style={styles.textimput}>
                <TextInput
                  placeholder="Selecciona una zona en el mapa"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={gradoescmas1 !== null ? String(gradoescmas1) : ""}
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>
            <View style={{ width: "60%", alignSelf: "center", marginTop: 30 }}>
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

export default Geolocation;