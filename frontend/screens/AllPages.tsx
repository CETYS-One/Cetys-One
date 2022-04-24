import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Center, ScrollView, Text } from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { RootStackParams } from "./Pages";

const pages: string[] = [
  "LoadingSplash",
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
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

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
