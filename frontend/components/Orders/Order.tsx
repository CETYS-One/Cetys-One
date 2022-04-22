import { Text, Box, View, HStack, VStack, Image, Flex } from "native-base";
const Order = () => {
  return (
    <Box w={"100%"}>
      <HStack
        w={"100%"}
        bgColor={"amber.100"}
        h={"120px"}
        borderRadius={"20px"}
        borderWidth={"1px"}
        borderColor={"gray.100"}
        shadow={6}
      >
        <Image
          source={{ uri: "http://oefa.com/fotos/DSCNG222.jpg" }}
          alt={"hola"}
          h={"100%"}
          w={"100px"}
          resizeMode="cover"
          borderLeftRadius={"20px"}
        ></Image>
        <VStack h={"100%"} px={"10px"} py={"8px"}>
          <Text fontSize={"20px"} fontWeight={"bold"}>
            Daniel
          </Text>
          <Text fontSize={"15px"} color={"gray.400"}>
            12:00
          </Text>
        </VStack>
        <Flex
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          borderWidth={1}
        >
          <Text>$200</Text>
        </Flex>
      </HStack>
    </Box>
  );
};
export default Order;
