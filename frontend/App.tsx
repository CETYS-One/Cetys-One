import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { extendTheme, NativeBaseProvider } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Pages from "./screens/Pages";
import Toast from "react-native-toast-message";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import {
  useFonts,
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
} from "@expo-google-fonts/montserrat";
import { QueryClient, QueryClientProvider } from "react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";

import AuthProvider from "./context/AuthProvider";
import AuthNav from "./screens/navigators/AuthNavigator";
import ShopProvider from "./context/ShopProvider";

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
                    <AuthNav />
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
