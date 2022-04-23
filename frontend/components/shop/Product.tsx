import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Box, Flex } from "native-base";
import { Share, TouchableOpacity, Image } from "react-native";
import { RootStackParams } from "../../screens/Pages";
import { SharedElement } from "react-navigation-shared-element";
const Product = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  return (
    <Flex shadow={"1"} bgColor={"gray.50"} borderRadius={"10px"}>
      <TouchableOpacity onPress={() => navigation.navigate("Product")}>
        <SharedElement id={"imagenProducto"}>
          <Image
            source={{
              uri: "https://cdn.colombia.com/gastronomia/2011/08/26/burritos-de-carne-3657.jpg",
            }}
            style={{ width: "100%", height: 100, borderRadius: 10 }}
          />
        </SharedElement>

        <Flex w={"100%"} px={"8px"}>
          <Text>Famous Star</Text>
          <Text color={"amber.500"} fontWeight={"bold"}>
            $200
          </Text>
        </Flex>
      </TouchableOpacity>
    </Flex>
  );
};
export default Product;
