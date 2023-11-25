import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { hostIP } from "@env";
import Checkbox from "expo-checkbox";
import Button from "../../components/Button";


const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const isAlphaNumeric = (text) => {
    return /^[a-zA-Z0-9]+$/.test(text);
  };

  const isEmail = (text) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  }


  async function addUser(username, email, password) {
    const auth_endpoint = `http://${hostIP}:3000/locationwise/v1/users/add`;
    console.log("Ip:", hostIP);
    const data = { usr_username: username, usr_email: email, usr_pass: password };
    console.log("\ndata: " + JSON.stringify(data) + "\n");
    console.log("Fetching: " + auth_endpoint);

    try {
      const response = await fetch(auth_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        const res = await response.text();
        if (res === 'Ese email ya existe.') {
          console.log("Ese email ya existe.");
          return false;
        } else {
          console.log("Usuario creado.");
          return true;
        }
      } else {
        console.log("Algo salió mal.");
        return false;
      }

    } catch (error) {
      console.error(error);
      return false;
    }
  }

  //handleSendData para enviar los datos a la base de datos
  const handleSendData = async () => {
    if (!isEmail(email) || !isAlphaNumeric(password) || !isAlphaNumeric(password2) || !isAlphaNumeric(name)) {
      Alert.alert("Caracteres no válidos", "Verifica que los campos sean correctos");
      Alert.alert("email: " + isEmail(email) + "\npassword: " + validPassword(password) + "\npassword2: " + validPassword(password2) + "\nname: " + isAlphaNumeric(name));
    } else if (email === "" || password === "") {
      Alert.alert("Campos vacíos", "Por favor llena todos los campos");
    } else if (password == password2) {
      try {
        console.log("Nombre de usuario:", name);
        console.log("Correo electrónico:", email);
        console.log("Password:", password);
        console.log("pre data");
        const data = await addUser(name, email, password);
        console.log("data: " + data);
        if (data && data != null && data != undefined && data != false) {
          console.log("post data");
          console.log(data);
          navigation.navigate("Welcome");
        } else {
          Alert.alert("Error", "Algo salió mal");
        }
        console.log(data);
      } catch (error) {
        console.error("Error in handleSendData:", error);
      }

      setEmail("");
      setPassword("");
      setPassword2("");
      setName("");
      
    } else {
      Alert.alert("Contraseñas no coinciden", "Por favor ingresa la misma contraseña");
    }
  };

  return (
    <View style={styles.createaccount}>
      <View style={styles.Image}>
        <Image source={require("../../assets/imagetop1.jpg")} style={styles.img} />
      </View>
      <View style={styles.container}>
        <View style={styles.create}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
          <Text style={styles.txtcreate}>Crea tu Cuenta</Text>
        </View>
        <View style={styles.containerInputs}>
          <View style={styles.TextInputs}>
            <TextInput
              placeholder="Nombre de Usuario"
              placeholderTextColor={COLORS.grey}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              keyboardType="default"
              style={{
                width: "100%",
              }}
            />
          </View>
          <View style={styles.TextInputs}>
            <TextInput
              placeholder="Correo Electrónico"
              placeholderTextColor={COLORS.grey}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                width: "100%",
              }}
            />
          </View>

          <View style={styles.TextInputs}>
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor={COLORS.grey}
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                width: "100%",
              }}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.blue} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.blue} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.TextInputs}>
            <TextInput
              placeholder="Repite tu Contraseña"
              placeholderTextColor={COLORS.grey}
              secureTextEntry={isPasswordShown}
              value={password2}
              onChangeText={(text) => setPassword2(text)}
              style={{
                width: "100%",
              }}
            />
          </View>
          <View style={styles.terms}>
            <Checkbox
              style={{ marginRight: 10 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.blue : undefined}
            />
            <Text style={{ color: COLORS.black }}>
              Acepto los terminos y condiciones
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Button
            title="Registrarse"
            onPress={handleSendData}
            style={{
              height: 50,

            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 30,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Tengo una Cuenta
          </Text>
          <Pressable onPress={() => navigation.navigate("Welcome")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.buttonprimary,
                fontWeight: "bold",
                marginLeft: 6,
                textDecorationLine: "underline",
              }}
            >
              Iniciar Sesion
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  createaccount: {
    flex: 1,
    backgroundColor: "#F1EFEF",
  },
  TextInputs: {
    marginTop: 32,
    width: "100%",
    height: 50,
    borderColor: "#F1EFEF",
    borderWidth: 1,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 25,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOpacity: 0.8,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "#F2F2F2",
  },
  Image: {
    flexDirection: "row",
    justifyContent: "center",
  },
  img: {
    height: 225,
    width: 500,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    marginTop: "-7%",
    opacity: 0.7,
  },
  container: {
    paddingHorizontal: 22,
    width: "100%",
  },
  create: {
    justifyContent: "center",
    flexDirection: "row",
  },
  txtcreate: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.black,
    marginTop: 35,
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: "center",
    top: "4%",
  },
  containerInputs: {
    marginTop: 25,
  },
  terms: {
    flexDirection: "row",
    marginVertical: 40,
    marginLeft: 22,
  },
});