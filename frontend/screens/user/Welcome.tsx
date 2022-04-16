import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Box,
  Text,
  VStack,
  FormControl,
  Input,
  Button,
  Image,
  Center,
  Spacer,
  AspectRatio,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParams } from "../Pages";

const Welcome = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <SafeAreaView
      style={
        {
          // width: 300,
          // height: 450,
        }
      }
    >
      <Box w={"90%"} margin={"auto"}>
        <VStack w="100%" h="100%">
          <Center mt={2}>
            <AspectRatio height={"50px"} ratio={{ base: 302 / 240 }}>
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo-cetys.png/302px-Logo-cetys.png",
                }}
                alt="Logo CETYS"
                resizeMode="cover"
              />
            </AspectRatio>
          </Center>
          <Box position={"relative"} h="50%">
            <Image
              source={require("../../assets/images/soda.png")}
              alt="soda"
              w={"180px"}
              h={"180px"}
              position="absolute"
              top="70px"
              right="0"
            />
            <Image
              source={require("../../assets/images/burger.png")}
              alt="burger"
              w={"150px"}
              h={"150px"}
              position="absolute"
              top="140px"
              left="8"
            />
          </Box>
          <Text fontSize={"20px"} fontWeight="700">
            Bienvenido a CETYS One
          </Text>
          <Text fontSize={"16"} fontWeight="400">
            Pedir comida en las cafeterias nunca habia sido tan sencillo
          </Text>
          <VStack width={"100%"} space={2} mt={"20"}>
            <Button
              borderRadius="10"
              backgroundColor={"amber.500"}
              py={4}
              onPress={() => navigation.navigate("SignUp")}
            >
              Registrarte
            </Button>
            <Button
              borderRadius="10"
              colorScheme={"amber"}
              variant={"outline"}
              py={4}
              onPress={() => navigation.navigate("Login")}
            >
              Iniciar Sesion
            </Button>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default Welcome;
