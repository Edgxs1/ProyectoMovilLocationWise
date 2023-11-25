import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import COLORS from "../constants/colors";
import styles from "../../Styles/styles";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { useTheme } from "../context/ThemeContext";
import CustomPicker from "../../components/CustomPicker";
import {
  opnivelso,
  opnivesc,
  opnsiteco,
  opnsitcony,
  opnedad,
  opnlim,
  opnsitescfin,
  opnrel,
} from "../constants/opciones";

const Inputs = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [selnivsoc, setSelnivsoc] = useState("");
  const [selnivsoclabel, setSelnivsoclabel] = useState("");
  const [selnivesc, setSelnivesc] = useState("");
  const [selsiteco, setSelsiteco] = useState("");
  const [selsitcony, setSelsitcony] = useState("");
  const [seledad, setSeledad] = useState("");
  const [sellim, setSellim] = useState("");
  const [selsitescfin, setSelsitescfin] = useState("");
  const [selrel, setSelrel] = useState("");


  const getLabelFromValue = (value) => {
    const option = opnivelso.find((option) => option.value === value);
    //console.log("option", selnivsoclabel);
    setSelnivsoc(option.value);
    //console.log("option", selnivsoc);
    return option ? option.label : ""; // Devuelve el label si se encuentra, de lo contrario, cadena vacía
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
            <View style={{ marginBottom: 50 }}>
              <View>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle8
                      : { ...styles.tittle8, color: "white" }
                  }
                >
                  Ingresa los datos de tu publico objetivo
                </Text>
              </View>
              <View>
                <View>
                  {/*view de inputs */}
                  <View style={styles.containerSolucion}>
                    <Text
                      style={
                        theme === "light"
                          ? styles.tittle6
                          : { ...styles.tittle6, color: "white" }
                      }
                    >
                      Nivel socioeconomico:
                    </Text>
                    <CustomPicker
                      selectedValue={selnivsoclabel}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelnivsoclabel(getLabelFromValue(itemValue));
                      }}
                      options={opnivelso}
                      placeholder="Selecciona una opción"
                    />
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text
                      style={
                        theme === "light"
                          ? styles.tittle6
                          : { ...styles.tittle6, color: "white" }
                      }
                    >
                      Nivel de escolaridad actual:
                    </Text>
                    <CustomPicker
                      selectedValue={selnivesc}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelnivesc(itemValue)
                      }
                      options={opnivesc}
                      placeholder="Selecciona una opción"
                    />
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text
                      style={
                        theme === "light"
                          ? styles.tittle6
                          : { ...styles.tittle6, color: "white" }
                      }
                    >
                      Situacion economica:
                    </Text>
                    <CustomPicker
                      selectedValue={selsiteco}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelsiteco(itemValue)
                      }
                      options={opnsiteco}
                      placeholder="Selecciona una opción"
                    />
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text
                      style={
                        theme === "light"
                          ? styles.tittle6
                          : { ...styles.tittle6, color: "white" }
                      }
                    >
                      Situacion conyugal
                    </Text>
                    <CustomPicker
                      selectedValue={selsitcony}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelsitcony(itemValue)
                      }
                      options={opnsitcony}
                      placeholder="Selecciona una opción"
                    />
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text
                      style={
                        theme === "light"
                          ? styles.tittle6
                          : { ...styles.tittle6, color: "white" }
                      }
                    >
                      Edad:
                    </Text>
                    <CustomPicker
                      selectedValue={seledad}
                      onValueChange={(itemValue, itemIndex) =>
                        setSeledad(itemValue)
                      }
                      options={opnedad}
                      placeholder="Selecciona una opción"
                    />
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text
                      style={
                        theme === "light"
                          ? styles.tittle6
                          : { ...styles.tittle6, color: "white" }
                      }
                    >
                      Limitacion:
                    </Text>
                    <CustomPicker
                      selectedValue={sellim}
                      onValueChange={(itemValue, itemIndex) =>
                        setSellim(itemValue)
                      }
                      options={opnlim}
                      placeholder="Selecciona una opción"
                    />
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text
                      style={
                        theme === "light"
                          ? styles.tittle6
                          : { ...styles.tittle6, color: "white" }
                      }
                    >
                      Situacion escolar final:
                    </Text>
                    <CustomPicker
                      selectedValue={selsitescfin}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelsitescfin(itemValue)
                      }
                      options={opnsitescfin}
                      placeholder="Selecciona una opción"
                    />
                  </View>
                  <View style={styles.containerSolucion}>
                    <Text
                      style={
                        theme === "light"
                          ? styles.tittle6
                          : { ...styles.tittle6, color: "white" }
                      }
                    >
                      Religion:
                    </Text>
                    <CustomPicker
                      selectedValue={selrel}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelrel(itemValue)
                      }
                      options={opnrel}
                      placeholder="Selecciona una opción"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ width: "85%", alignSelf: "center" }}>
              <Button
                title="Geolocalizar"
                onPress={() => navigation.navigate("Inputs_Geolocation")}
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
                ¿Cómo puedo usar LocationWise-kickstarter?
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle4
                    : { ...styles.tittle4, color: "white" }
                }
              >
                Para usar LocationWise-kickstarter, primero debes ingresar los
                datos de tú público objetivo en el siguiente formulario, después
                de ingresar los datos, puedes visualizar la información de tú
                público objetivo en un mapa interactivo.
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
                ¿Qué datos necesito para usar LocationWise-kickstarter?
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle4
                    : { ...styles.tittle4, color: "white" }
                }
              >
                Para usar LocationWise-kickstarter, necesitas ingresar los datos
                de tú público objetivo en el siguiente formulario, los datos que
                necesitas de tú público objetivo son:
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle7
                    : { ...styles.tittle7, color: "white" }
                }
              >
                Nivel socioeconómico predominante Obligatorio
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle7
                    : { ...styles.tittle7, color: "white" }
                }
              >
                Rango(s) de edad Obligatorio
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle7
                    : { ...styles.tittle7, color: "white" }
                }
              >
                Nivel de escolaridad promedio Recomendado
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle7
                    : { ...styles.tittle7, color: "white" }
                }
              >
                Sexo
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle7
                    : { ...styles.tittle7, color: "white" }
                }
              >
                Situación económica (Activo/Inactivo)
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle7
                    : { ...styles.tittle7, color: "white" }
                }
              >
                Situación escolar (Primaria, Secundaria, . . . , Primaria
                Incompleta, . . . , No asiste, . . .)
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle7
                    : { ...styles.tittle7, color: "white" }
                }
              >
                Situacion conyugal
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle7
                    : { ...styles.tittle7, color: "white" }
                }
              >
                Religión
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle7
                    : { ...styles.tittle7, color: "white" }
                }
              >
                Limitación (Analfabetismo)
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.tittle7
                    : { ...styles.tittle7, color: "white" }
                }
              >
                Cabe destacar que puedes elegir diferentes rangos de edad, nivel
                socioeconomico, entre otros. Si deseas omitir alguna
                característica también es posible (excepto las obligatorias),
                sin embargo la exactitud será menor.
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

export default Inputs;
