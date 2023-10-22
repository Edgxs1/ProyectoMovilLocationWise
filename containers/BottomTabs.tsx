import CustomBottomTab from '../components/BottomTabs/CustomBottomTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Inicio from "../screens/Inicio";
import Blog from "../screens/Blog";
import Soluciones from "../screens/Soluciones";
import Perfil from "../screens/Perfil";
import Contactanos from "../screens/Contactanos";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Locwise from "../screens/Locwise";
import Inputs from "../screens/Inputs";
import Inputs_Geolocation from "../screens/Inputs_Geolocation";
import Geolocation from "../screens/Geolocation";

const Tab = createBottomTabNavigator();
const SolutionStack = createNativeStackNavigator();
function MyStack() {
  return (
    <SolutionStack.Navigator initialRouteName="SolucionesScreen">
      <SolutionStack.Screen 
      name="SolucionesScreen" 
      component={Soluciones} 
      options={{
        headerShown: false
      }}
      />
      <SolutionStack.Screen
        name="Contactanos"
        component={Contactanos}
        options={{
          title: "Contactanos",
        }}
      />
      <SolutionStack.Screen
        name="Locwise"
        component={Locwise}
        options={{
          title: "Locwise",
        }}
      />
      <SolutionStack.Screen
        name="Inputs"
        component={Inputs}
        options={{
          title: "Inputs",
        }}
      />
      <SolutionStack.Screen
        name="Inputs_Geolocation"
        component={Inputs_Geolocation}
        options={{
          title: "Inputs_Geolocation",
        }}
      />
      <SolutionStack.Screen
        name="Geolocation"
        component={Geolocation}
        options={{
          title: "Geolocation",
        }}
      />
    </SolutionStack.Navigator>
  );
}

const BottomTabs = () => {
  return (
    <Tab.Navigator 
    initialRouteName="Home"
    tabBar={props => <CustomBottomTab {...props} />}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          options={{tabBarLabel: 'Inicio'}}
          name="home"
          component={Inicio}
        />
        <Tab.Screen
          options={{tabBarLabel: 'Blog'}}
          name="Blog"
          component={Blog}
        />

        <Tab.Screen
          options={{tabBarLabel: 'Soluciones'}}
          name="Soluciones"
          component={MyStack}
        />
        <Tab.Screen
          options={{tabBarLabel: 'Perfil'}}
          name="Perfil"
          component={Perfil}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
export default BottomTabs;
