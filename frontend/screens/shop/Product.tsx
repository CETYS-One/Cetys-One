import { Box, Text, Image, Flex, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const Product = () => {
  return (
    <SafeAreaView>
      <Center w={"100%"}>
        <Image w={"80%"} h={"400px"} source={{uri:"https://barradeideas.com/wp-content/uploads/2019/09/fast-food.jpg"}} alt="hola" borderRadius={"10px"}/>
      </Center>
    </SafeAreaView>
  );
};

export default Product;
