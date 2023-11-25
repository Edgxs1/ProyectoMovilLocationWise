import CustomBottomTab from "../components/BottomTabs/CustomBottomTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../screens/Settings";
import Perfil from "../screens/Perfil";
import { useTheme } from "../context/ThemeContext";
import COLORS from "../constants/colors";
import Contactanos from "../screens/Contactanos";

const ProfileStack = createNativeStackNavigator();
function Profile() {
  const { theme } = useTheme();

  return (
    <ProfileStack.Navigator initialRouteName="Perfil">
      <ProfileStack.Screen
        name="Profile"
        component={Perfil}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Configuración",
          headerStyle: {
            backgroundColor: theme === "light" ? COLORS.light : COLORS.dark,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: theme === "light" ? "black" : "white",
          },
        }}
      />

      <ProfileStack.Screen
        name="Contactanos"
        component={Contactanos}
        options={{
          title: "Contactanos",
          headerStyle: {
            backgroundColor: theme === "light" ? COLORS.light : COLORS.dark,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: theme === "light" ? "black" : "white",
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}
export default Profile;
