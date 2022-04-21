import { Text, Box, Image, Flex } from "native-base";

const Product = () => {
  return (
    <Flex shadow={"1"} bgColor={"gray.50"} borderRadius={"10px"}>
      <Image
        height={"120px"}
        width={"120px"}
        source={{
          uri: "https://barradeideas.com/wp-content/uploads/2019/09/fast-food.jpg",
        }}
        alt="hola"
        borderRadius={"10px"}
      />
      <Flex w={"100%"} px={"8px"}>
        <Text>Famous Star</Text>
        <Text color={"yellow.800"}>$200</Text>
      </Flex>
    </Flex>
  );
};
export default Product;
