import { Text, Box, Image, Flex } from "native-base";
import { TouchableOpacity } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

const Product = ({ navigation }) => {
  return (
    <Flex shadow={"1"} bgColor={"gray.50"} borderRadius={"10px"}>
      <TouchableOpacity onPress={() => navigation.navigate("product")}>
        <SharedElement id={"imagen"}>
          <Image
            height={"120px"}
            width={"120px"}
            source={{
              uri: "https://barradeideas.com/wp-content/uploads/2019/09/fast-food.jpg",
            }}
            alt="hola"
            borderRadius={"10px"}
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
