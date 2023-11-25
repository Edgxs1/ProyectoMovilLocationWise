import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/context/ThemeContext";


import Navigation from "./Navigation";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  });
  const loadFonts = async () => {
    await Font.loadAsync({
      "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
      "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
      "Helvetica": require("./assets/fonts/HelveticaThin.ttf"),
      "Montserrat": require("./assets/fonts/Montserrat-V.ttf"),
      "Montserrat-Italic": require("./assets/fonts/Montserrat-Italic.ttf"),
    });
    setFontsLoaded(true);
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}
