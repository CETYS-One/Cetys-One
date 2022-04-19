import { SafeAreaView, TouchableOpacity } from "react-native";
import { Box, Text, Center, ScrollView } from "native-base";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "./Pages";

const pages: string[] = [
  "SignUp",
  "Welcome",
  "Login",
  "Profile",
  "Password",
  "Shop",
  "Product",
  "Cart",
  "OrderHistory",
  "Orders",
  "Categories",
  "Statistics",
  "ProductEdit",
  "AllProduct",
];

const AllPages = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <SafeAreaView>
      <Center>
        <Box width={"95%"} mt={10}>
          <Box mb={5}>
            <Text fontSize="2xl" fontWeight={"bold"}>
              Paginas por editar
            </Text>
            <Text mt={2}>
              Aqui puedes acceder a cualquier pagina que se esta trabajando.
              Tambien puedes ver el progreso de los demas sin tanta
              complicacion:D jijijija
            </Text>
          </Box>
          <ScrollView h="550">
            {pages.map((page) => (
              // @ts-ignore
              <TouchableOpacity
                onPress={() => navigation.navigate(page)}
                key={page}
              >
                <Box key={page} my={2} p={4} bg={"gray.200"} borderRadius={4}>
                  <Text>{page}</Text>
                </Box>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default AllPages;
