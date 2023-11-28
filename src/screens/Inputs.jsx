import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert
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

const Inputs = ({route}) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [agebData, setAgebData] = useState([]);

  const [selnivsoc, setSelnivsoc] = useState("selecciona");
  const [selnivesc, setSelnivesc] = useState("selecciona");
  const [selsiteco, setSelsiteco] = useState("selecciona");
  const [selsitcony, setSelsitcony] = useState("selecciona");
  const [seledad, setSeledad] = useState("selecciona");
  const [sellim, setSellim] = useState("selecciona");
  const [selsitescfin, setSelsitescfin] = useState("selecciona");
  const [selrel, setSelrel] = useState("selecciona");

  const [selnivsoclabel, setSelnivsoclabel] = useState(null);
  const [selnivesclabel, setSelnivesclabel] = useState(null);
  const [selsitecolabel, setSelsitecolabel] = useState(null);
  const [selsitconylabel, setSelsitconylabel] = useState(null);
  const [seledadlabel, setSeledadlabel] = useState(null);
  const [sellimlabel, setSellimlabel] = useState(null);
  const [selsitescfinlabel, setSelsitescfinlabel] = useState(null);
  const [selrellabel, setSelrellabel] = useState(null);

  useEffect(() => {
    // Cuando el componente se monta, actualiza el estado con los datos recibidos
    if (route.params) {
      setAgebData(route.params.agebData);
    }
  }, [route.params]);

  const getLabelFromnivelsoc = (value) => {
    const option = opnivelso.find((option) => option.value === value);
    setSelnivsoc(option.value);
    return option ? option.label : "";
  };
  const getLabelFromnivesc = (value) => {
    const option = opnivesc.find((option) => option.value === value);
    setSelnivesc(option.value);
    return option ? option.label : "";
  }
  const getLabelFromsiteco = (value) => {
    const option = opnsiteco.find((option) => option.value === value);
    setSelsiteco(option.value);
    return option ? option.label : "";
  }
  const getLabelFromsitcony = (value) => {
    const option = opnsitcony.find((option) => option.value === value);
    setSelsitcony(option.value);
    return option ? option.label : "";
  }
  const getLabelFromedad = (value) => {
    const option = opnedad.find((option) => option.value === value);
    setSeledad(option.value);
    return option ? option.label : "";
  }
  const getLabelFromlim = (value) => {
    const option = opnlim.find((option) => option.value === value);
    setSellim(option.value);
    return option ? option.label : "";
  }
  const getLabelFromsitescfin = (value) => {
    const option = opnsitescfin.find((option) => option.value === value);
    setSelsitescfin(option.value);
    return option ? option.label : "";
  }
  const getLabelFromrel = (value) => {
    const option = opnrel.find((option) => option.value === value);
    setSelrel(option.value);
    return option ? option.label : "";
  }
  const handleGeolocalizePress = () => {
    if (
      selnivsoc === "selecciona" ||
      selnivesc === "selecciona" ||
      selsiteco === "selecciona" ||
      selsitcony === "selecciona" ||
      seledad === "selecciona" ||
      sellim === "selecciona" ||
      selsitescfin === "selecciona" ||
      selrel === "selecciona"
    ) {
      Alert.alert("Por favor ingrese todos los datos");
    } else {
      navigation.navigate("Inputs_Geolocation", {
        selnivsoc,
        selnivesc,
        selsiteco,
        selsitcony,
        seledad,
        sellim,
        selsitescfin,
        selrel,
        agebData,
      });
    }
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
                        setSelnivsoclabel(getLabelFromnivelsoc(itemValue));
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
                      selectedValue={selnivesclabel}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelnivesclabel(getLabelFromnivesc(itemValue));
                      }}
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
                      selectedValue={selsitecolabel}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelsitecolabel(getLabelFromsiteco(itemValue));
                      }}
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
                      selectedValue={selsitconylabel}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelsitconylabel(getLabelFromsitcony(itemValue));
                      }}
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
                      selectedValue={seledadlabel}
                      onValueChange={(itemValue, itemIndex) => {
                        setSeledadlabel(getLabelFromedad(itemValue));
                      }}
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
                      selectedValue={sellimlabel}
                      onValueChange={(itemValue, itemIndex) => {
                        setSellimlabel(getLabelFromlim(itemValue));
                      }}
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
                      selectedValue={selsitescfinlabel}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelsitescfinlabel(getLabelFromsitescfin(itemValue));
                      }}
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
                      selectedValue={selrellabel}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelrellabel(getLabelFromrel(itemValue));
                      }}
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
                onPress={handleGeolocalizePress}
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
