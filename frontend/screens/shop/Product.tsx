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
        py={"20px"}
      >
        <VStack space={6} alignItems={"center"}>
          <Description />
          <Cantidad />
          <Comentario />
        </VStack>

        <Button
          type="submit"
          borderRadius="10"
          backgroundColor={"amber.500"}
          py={4}
          w={"90%"}
        >
          Agregar a carro
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default Product;
