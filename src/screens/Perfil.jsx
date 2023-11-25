import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { StatusBar } from "react-native";
import styles from "../../Styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hostIP } from "@env";


const Perfil = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      try {
        const userId = await getUserID();
        if (userId !== null && userId !== undefined) {
          const userData = await getUserDataByID(userId);
          if (userData) {
            const email = userData[0]["usr_email"];
            const name = userData[0]["usr_username"];
            setName(name);
            setEmail(email);
            setUserId(userId);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }

    loadUserData();
  }, []);

  async function getUserID() {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');

      if (storedUserId) {
        const userId = parseInt(storedUserId, 10);
        console.log('Retrieved User ID from AsyncStorage:', userId);
        return userId;
      } else {
        console.log('User ID not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving user ID from AsyncStorage:', error);
    }
  }

  async function getUserDataByID(id) {
    const user_endpoint = `http://${hostIP}:3000/locationwise/v1/users/data/${id}`;
    console.log("Ip:", hostIP);
    console.log("Fetching: " + user_endpoint);
    try {
      const response = await fetch(user_endpoint, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const res = await response.json();
        console.log("User data fetched: " + JSON.stringify(res));
        return res;
      } else {
        console.log("Algo salió mal.");
      }
    }
    catch (error) {
      console.error(error);
      return false;
    }
  }

  async function updateUserByID(id, username, email, password) {
    const updateUser_endpoint = `http://${hostIP}:3000/locationwise/v1/users/update/${id}`;
    console.log("Ip:", hostIP);
    const data = { usr_username: username, usr_email: email, usr_pass: password };
    console.log("\ndata: " + JSON.stringify(data) + "\n");
    console.log("Fetching: " + updateUser_endpoint);
    try {
      const response = await fetch(updateUser_endpoint, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        if (response.status === 200) {
          console.log("Usuario actualizado.");
          return true;
        } else {
          console.log("Algo salió mal.");
          return false;
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


  const handleSendData = async () => {
    if (name === "" || email === "" || password === "") {
      Alert.alert("Campos vacíos", "Por favor llena todos los campos");
    } else {
      console.log("Nombre de usuario:", name);
      console.log("Correo electrónico:", email);
      console.log("Password:", password);
      const data = await updateUserByID(userId, name, email, password);
      console.log("Data: " + data);
      if (data && data !== null && data !== undefined) {
        Alert.alert("Usuario actualizado", "Se han actualizado tus datos");
        navigation.navigate("Perfil");
      } else {
        Alert.alert("Error", "Algo salió mal");
      }
    }
  };

  async function deleteUserByID(id) {
    console.log("Ip:", hostIP);
    const deleteUser_endpoint = `http://${hostIP}:3000/locationwise/v1/users/delete/${id}`;
    console.log("Fetching: " + deleteUser_endpoint);
    try {
      const response = await fetch(deleteUser_endpoint, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (response.ok) {
        if (response.status === 200) {
          console.log("Usuario borrado.");
          return true;
        } else {
          console.log("Algo salió mal.");
          return false;
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

  const handleDeleteAccount = async () => {
    //Ask user if they are sure they want to delete their account
    Alert.alert(
      "¿Estás seguro?",
      "Al borrar tu cuenta perderás acceso a todo lo relacionado a ella, incluyendo tus datos y tu historial de uso.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Borrar cuenta",
          onPress: async () => {
            //Delete user from database
            const data = await deleteUserByID(userId);
            if (data && data !== null && data !== undefined) {
              Alert.alert("Cuenta borrada", "Se ha borrado tu cuenta");
              navigation.navigate("Welcome");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={
        theme === "light"
          ? { flex: 1, backgroundColor: COLORS.light }
          : { flex: 1, backgroundColor: COLORS.dark }
      }
    >
      <SafeAreaView>
        <StatusBar
          barStyle={theme === "light" ? "dark-content" : "light-content"}
          backgroundColor={theme === "light" ? "#FFFFFF" : "#000000"}
        />
        <ScrollView>
          <View>
            <View
              style={{
                ...styles.containertittle,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 15,
                }}
              >
                <Text
                  style={
                    theme === "light"
                      ? styles.principaltittle
                      : { ...styles.principaltittle, color: "white" }
                  }
                >
                  {name || "@Usuario"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Settings")}
                style={{ paddingHorizontal: 10, marginRight: 25 }}
              >
                <FontAwesome
                  name="gear"
                  size={26}
                  color={theme === "light" ? COLORS.grey : "white"}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.containerInputs}>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle3
                      : { ...styles.tittle3, color: "white" }
                  }
                >
                  Nombre de usuario
                </Text>
                <View style={styles.textimput}>
                  <TextInput
                    placeholder="Nombre de Usuario"
                    placeholderTextColor={COLORS.grey}
                    value={String(name)}
                    onChangeText={(text) => setName(text)}
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
              <View style={styles.containerInputs}>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle3
                      : { ...styles.tittle3, color: "white" }
                  }
                >
                  Correo electrónico
                </Text>
                <View style={styles.textimput}>
                  <TextInput
                    placeholder="Correo Electrónico"
                    placeholderTextColor={COLORS.grey}
                    keyboardType="email-address"
                    value={String(email)}
                    onChangeText={(text) => setEmail(text)}
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
              <View style={styles.containerInputs}>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle3
                      : { ...styles.tittle3, color: "white" }
                  }
                >
                  Contraseña
                </Text>
                <View style={styles.textimput}>
                  <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor={COLORS.grey}
                    secureTextEntry={isPasswordShown}
                    value={isPasswordShown}
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
                      <Ionicons name="eye-off" size={24} color={COLORS.grey} />
                    ) : (
                      <Ionicons name="eye" size={24} color={COLORS.grey} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.containerbtn}>
                <Button
                  title="Guardar cambios"
                  onPress={handleSendData}
                  style={{
                    height: 50,
                  }}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle1
                      : { ...styles.tittle1, color: "white" }
                  }
                >
                  Historial de uso
                </Text>
              </View>
              <View
                style={{ marginTop: 45, width: "80%", alignSelf: "center" }}
              >
                <Button
                  title="Contactanos"
                  onPress={() => navigation.navigate("Contactanos")}
                  style={{
                    height: 50,
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={styles.containerbtn}>
                  <LinearGradient
                    style={{
                      width: "60%",
                      borderRadius: 40,
                      alignSelf: "center",
                    }}
                    colors={[COLORS.secondary, COLORS.red]}
                    start={{ y: 0.0, x: 0.0 }}
                    end={{ y: 1.0, x: 0.0 }}
                  >
                    <TouchableOpacity
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: 35,
                      }}
                      onPress={handleDeleteAccount}
                      activeOpacity={0.7}
                    >
                      <Text style={{ fontSize: 20 }}>Borrar cuenta</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                <View
                  style={
                    theme === "light"
                      ? { ...styles.containersettings, marginTop: 20 }
                      : {
                        ...styles.containersettings,
                        backgroundColor: COLORS.backgr, marginTop: 20
                      }
                  }
                >
                  <View>
                    <Text
                      style={
                        theme === "light"
                          ? { ...styles.tittle4, marginTop: 0 }
                          : { ...styles.tittle4, color: "white", marginTop: 0 }
                      }
                    >
                      Al hacer esto pierdes acceso a todo lo relacionado a tu
                      cuenta, incluyendo tus datos y tu historial de uso.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.textend}>
                <Text style={styles.ref}>
                  Location-Wise® 2023 - Marketing Automated Geographic Engine
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Perfil;
