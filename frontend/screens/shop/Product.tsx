import {
  Box,
  Text,
  Image,
  Flex,
  Center,
  VStack,
  HStack,
  TextArea,
  Button,
  ScrollView,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Description from "../../components/Product/Description";
import Cantidad from "../../components/Product/Cantidad";
import Comentario from "../../components/Product/Comentario";

const Product = () => {
  return (
    <SafeAreaView>
      <ScrollView h={"100%"} bgColor={"white"}>
        <Center w={"100%"}>
          <Image
            w={"100%"}
            h={"400px"}
            source={{
              uri: "https://barradeideas.com/wp-content/uploads/2019/09/fast-food.jpg",
            }}
            alt="hola"
          />
        </Center>

        <VStack
          borderRadius={"30px"}
          mt={"-30px"}
          bgColor={"white"}
          alignItems={"center"}
          w={"100%"}
          justifyContent={"space-between"}
          space={10}
          paddingTop={"28px"}
        >
          <VStack space={6} alignItems={"center"}>
            <Description />
            <HStack
              flexDirection={"row"}
              justifyContent={"space-around"}
              w={"85%"}
            >
              <Cantidad />
              <Comentario />
            </HStack>
          </VStack>
          <Button bgColor={"yellow.400"} borderRadius={"100px"}>
            <Text color={"white"} fontSize={"30px"} fontWeight={"bold"}>
              Agregar al Carrito
            </Text>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Product;
