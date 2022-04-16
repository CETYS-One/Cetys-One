import {
  Box,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  Button,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
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
              Registrate
            </Text>
            <Text fontSize={"16px"}>
              Registrate ahora para poder pedir dentro de las cafeterias CETYS
            </Text>
          </Box>
          <VStack space={4} w={"100%"}>
            <FormControl>
              <FormControl.Label>Nombre</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Matrícula</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input type={"password"} />
            </FormControl>
            <Button colorScheme={"green"} py={4} mt={3}>
              Registarse
            </Button>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default SignUp;
