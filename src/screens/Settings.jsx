import React from "react";
import { View, Text, ScrollView, Switch } from "react-native";
import COLORS from "../constants/colors";
import styles from "../../Styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { StatusBar } from "react-native";

const Inicio = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <View
      style={
        theme === "light"
          ? { flex: 1, backgroundColor: COLORS.light }
          : { flex: 1, backgroundColor: COLORS.dark }
      }
    >
      <SafeAreaView>
        <ScrollView>
          <View
            style={
              theme === "light"
                ? styles.containersettings
                : {
                    ...styles.containersettings,
                    backgroundColor: COLORS.backgr,
                  }
            }
          >
            <View style={styles.buttonsettings}>
                <Text
                  style={
                    theme === "light"
                      ? styles.tittle3
                      : { ...styles.tittle3, color: "white" }
                  }
                >
                  Modo oscuro
                </Text>
              <Switch value={theme === "dark"} onValueChange={toggleTheme} />
            </View>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Inicio;
