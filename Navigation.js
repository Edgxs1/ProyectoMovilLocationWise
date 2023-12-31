import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from './src/containers/BottomTabs';

//screens
import Signup from './src/screens/Signup';
import Welcome from './src/screens/Welcome';


import * as Font from "expo-font";

const SolutionStack = createNativeStackNavigator();

const Navigation = () => {
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
      Helvetica: require("./assets/fonts/HelveticaThin.ttf"),
      Montserrat: require("./assets/fonts/Montserrat-V.ttf"),
      "Montserrat-Italic": require("./assets/fonts/Montserrat-Italic.ttf"),
    });
    setFontsLoaded(true);
  };
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SolutionStack.Navigator
      initialRouteName='Welcome'
    >
      <SolutionStack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false
        }}
      />
      <SolutionStack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false
        }}
      />
      <SolutionStack.Screen
        name="Navigation"
        component={BottomTabs}
        options={{
          headerShown: false
        }}
      />
    </SolutionStack.Navigator>
  );
};

export default Navigation;
