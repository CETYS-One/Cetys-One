import { Box, Text, VStack, FormControl, Input, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  return (
    <SafeAreaView>
      <Box w={"90%"} margin={"auto"}>
        <VStack
          h={"100%"}
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box mb={10} w={"100%"}>
            <Text fontWeight={"600"} fontSize={"25px"}>
              Iniciar Sesión
            </Text>
            <Text fontSize={"16px"}>
              Inicia sesión para poder pedir dentro de las cafeterias CETYS
            </Text>
          </Box>
          <VStack space={4} w={"100%"}>
            <FormControl>
              <FormControl.Label>Matrícula</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input type={"password"} />
            </FormControl>
            <Button variant={"ghost"} colorScheme={"gray"} py={4} mt={3}>
              Olvide mi contraseña
            </Button>
            <Button colorScheme={"green"} py={4} mt={3}>
              Iniciar Sesión
            </Button>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default Welcome;
