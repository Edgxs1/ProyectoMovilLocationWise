import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import COLORS from "../constants/colors";
import styles from "../../Styles/styles";
import MapView, { Marker, Polygon, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { useTheme } from "../context/ThemeContext";
import { hostIP } from "@env";
import * as geolib from "geolib";

const Locwise = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [agebData, setAgebData] = useState([]);
  const [selectedCvegeo, setSelectedCvegeo] = useState(null);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [pobtot, setPobtot] = useState(null);
  const [pobmas, setPobmas] = useState(null);
  const [pobfem, setPobfem] = useState(null);
  const [nivsoc, setNivsoc] = useState(null);
  const [gradoesc, setGradoesc] = useState(null);
  const [gradoescfem, setGradoescfem] = useState(null);
  const [gradoescmas, setGradoescmas] = useState(null);
  const [edprom, setEdprom] = useState(null);
  const [loadedAgebs, setLoadedAgebs] = useState(false);

  useEffect(() => {
    if (!loadedAgebs) {
      loadAgebs();
    }
  }, [loadedAgebs, loadAgebs]);

  async function loadAgebs() {
    try {
      const agebData = await getAllAgebs();
      if (agebData) {
        setAgebData(agebData);
        setLoadedAgebs(true);
      } else {
        console.error("AGEBS data is undefined or null");
      }
    } catch (error) {
      console.error("Error loading AGEBS data:", error);
    }
  }

  async function getAllAgebs() {
    //console.log("Ip:", hostIP);
    const agebs_endpoint = `http://${hostIP}:3000/locationwise/v1/geocode-settlement/`;
    //console.log("End_point:", agebs_endpoint);
    try {
      const response = await fetch(agebs_endpoint);
      const json = await response.json();
      console.log("API fetched:", agebs_endpoint);
      //console.log("Data from API:", json); // Agrega este log
      //console.log("\nJson returned:", JSON.stringify(json, null, 2));
      return json;
    } catch (error) {
      console.error("Error fetching AGEBS data:", error);
    }
  }

  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate(coordinate);
    const selectedAgebData = findAgebDataByCoordinate(coordinate);
    if (selectedAgebData) {
      setSelectedCvegeo(selectedAgebData.cvegeo);
      
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
          setPobtot(agebbycvegeo?.pobtot);
          setPobmas(agebbycvegeo?.pobmas);
          setPobfem(agebbycvegeo?.pobfem);
          setNivsoc(agebbycvegeo?.lw_economiapred);
          setGradoesc(agebbycvegeo?.graproes);
          setGradoescfem(agebbycvegeo?.graproes_f);
          setGradoescmas(agebbycvegeo?.graproes_m);
          setEdprom(agebbycvegeo?.lw_edprom);
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

  const initialRegion = {
    latitude: 19.4326,
    longitude: -99.1332,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
          <View style={styles.containersP}>
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

                    return (
                      <Polygon
                        key={agebData.cvegeo} //clave única de cada ageb
                        coordinates={coordinates}
                        strokeWidth={0.001}
                      />
                    );
                  } catch (error) {
                    console.error("Error parsing st_asgeojson:", error);
                    return null;
                  }
                })}
                {markerCoordinate && (
                  <Marker
                    coordinate={markerCoordinate}
                    title={selectedCvegeo || "Sin selección"}
                    description={`Latitud: ${markerCoordinate.latitude}, Longitud: ${markerCoordinate.longitude}`}
                  >
                    <Callout>
                      <View>
                        <Text>{selectedCvegeo}</Text>
                      </View>
                    </Callout>
                  </Marker>
                )}
              </MapView>
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
                  Ingresa la localizacion de tu comercio.
                </Text>
                <Pressable onPress={() => navigation.navigate("Inputs")}>
                  <Text
                    style={
                      theme === "light"
                        ? styles.txtcom
                        : { ...styles.txtcom, color: "white" }
                    }
                  >
                    ¿No tienes un comercio?
                  </Text>
                </Pressable>
              </View>
              <View>
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
                    INFORMACION DE LA ZONA:
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
                        style={{
                          width: "100%",
                        }}
                        value={selectedCvegeo}
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
                        placeholder="Selecciona un punto en el mapa"
                        placeholderTextColor={COLORS.grey}
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
                        placeholder="Selecciona un punto en el mapa"
                        placeholderTextColor={COLORS.grey}
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
                        placeholder="Selecciona un punto en el mapa"
                        placeholderTextColor={COLORS.grey}
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
                        placeholder="Selecciona un punto en el mapa"
                        placeholderTextColor={COLORS.grey}
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
                        placeholder="Selecciona un punto en el mapa"
                        placeholderTextColor={COLORS.grey}
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
                        placeholder="Selecciona un punto en el mapa"
                        placeholderTextColor={COLORS.grey}
                        value={gradoescmas !== null ? String(gradoescmas) : ""}
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
            <View style={{ width: "85%", alignSelf: "center" }}>
              <Button
                title="Geolocalizar"
                onPress={() =>
                  navigation.navigate("Geolocation", {
                    selectedCvegeo,
                    pobtot,
                    pobmas,
                    pobfem,
                    nivsoc,
                    gradoesc,
                    gradoescfem,
                    gradoescmas,
                    edprom,
                    agebData
                  })
                }
                style={{ height: 50 }}
              />
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
                Location-Wise es una solución de análisis de datos que te
                permite analizar y visualizar la información de tu público
                objetivo. Con Location-Wise puedes analizar la información de tu
                comercio y tomar decisiones basadas en datos.
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
                ¿Qué obtengo al usar Location-Wise?
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle4
                    : { ...styles.tittle4, color: "white" }
                }
              >
                Al usar Location-Wise puedes visualizar zonas similares a la de
                tú negocio actual, lo que se traduce en mayor número de clientes
                similares a los que ya cuentas y un mayor abanico de
                posibilidades hacia a dónde expandir tú negocio
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
    </View>
  );
};

export default Locwise;
