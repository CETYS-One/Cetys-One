import {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { StatusBar } from "expo-status-bar";
import { extendTheme, NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./context/AuthProvider";
import ShopProvider from "./context/ShopProvider";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import MainNavigator from "./screens/navigators/MainNavigator";
import { IOrder } from "./types/strapi";
import { baseURL } from "./util/axios";
import { socket } from "./util/socket";

LogBox.ignoreLogs(["Setting a timer", "Animated: `useNativeDriver`"]);

const nativeTheme = extendTheme({
  fontConfig: {
    Montserrat: {
      100: {
        normal: "Montserrat_100Thin",
        italic: "Montserrat_100Thin_Italic",
      },
      200: {
        normal: "Montserrat_200ExtraLight",
        italic: "Montserrat_200ExtraLight_Italic",
      },
      300: {
        normal: "Montserrat_300Light",
        italic: "Montserrat-300Light_Italic",
      },
      400: {
        normal: "Montserrat_400Regular",
        italic: "Montserrat_400Regular_Italic",
      },
      500: {
        normal: "Montserrat_500Medium",
        italic: "Montserrat_500Medium_Italic",
      },
      600: {
        normal: "Montserrat_600SemiBold",
        italic: "Montserrat_600SemiBold_Italic",
      },
      700: {
        normal: "Montserrat_700Bold",
        italic: "Montserrat_700Bold_Italic",
      },
    },
  },
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
    mono: "Montserrat",
  },
  colors: {},
  components: {
    Input: {
      variants: {
        white: () => {
          return {
            _light: {
              borderColor: "white",
              placeholderTextColor: "white",
              _focus: {
                borderColor: "green.500",
              },
            },
            placeholder: "Busca aqui",
            style: { color: "white", borderColor: "white", borderWidth: 1 },
          };
        },
      },
    },
  },
});

const queryClient = new QueryClient();

export default function App() {
  console.log(baseURL);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider theme={nativeTheme}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ShopProvider>
                <PaperProvider>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <MainNavigator />
                    {/* <Pages /> */}
                    <StatusBar />
                    <Toast />
                  </GestureHandlerRootView>
                </PaperProvider>
              </ShopProvider>
            </AuthProvider>
          </QueryClientProvider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
