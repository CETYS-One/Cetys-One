import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoadingSplash from "../LoadingSlapsh";
import Login from "../user/Login";
import SignUp from "../user/SignUp";
import Welcome from "../user/Welcome";
import UserNav from "./UserNavigator";
import { Button } from "native-base";

export type IAuthNav = {
  Splash: any;
  Welcome: any;
  Login: any;
  Signup: any;
  UserNav: any;
};
const Stack = createStackNavigator<IAuthNav>();

const AuthNav = () => {
  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={LoadingSplash} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="UserNav" component={UserNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNav;
