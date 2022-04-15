import { Box, Text, Image, Flex, Center, VStack, HStack, TextArea, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const Product = () => {
  return (
    <SafeAreaView>
      <Center w={"100%"}>
        <Image w={"100%"} h={"400px"} source={{uri:"https://barradeideas.com/wp-content/uploads/2019/09/fast-food.jpg"}} alt="hola" />
      </Center>
      <VStack px={"30px"} space={8}>
        <Flex>
          <Text fontSize={"30px"}>FAMOUS STAR</Text>
          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate asperiores, commodi vel voluptatum praesentium dignissimos.</Text>
        </Flex>
        <Flex flexDirection={"row"} justifyContent={"space-around"}>
          <Box>
            <Text fontSize={"20px"}>Cantidad</Text>
            <Box></Box>
          </Box>
          <Flex alignItems={"center"}>
            <Text fontSize={"20px"}>Comentario</Text>
            <TextArea placeholder="Hola" h={"40px"} w={"150px"} ></TextArea>
          </Flex>
        </Flex>
        <Button bgColor={"yellow.400"} >Agregar al Carrito</Button>
      </VStack>
      
    </SafeAreaView>
  );
};

export default Product;
