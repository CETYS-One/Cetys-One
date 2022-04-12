import {Text, Box, View, HStack, VStack, Image, Flex} from "native-base";
const Order = () => {
  return(
    <HStack bgColor={"gray.200"} alignItems={"center"} space={"30px"} py={"6px"} px={"6px"} borderRadius={"8px"}>
      <VStack justifyContent={"center"}>
        <Text textAlign={"center"} fontSize={"20px"}>ID</Text>
        <Text fontSize={"20px"}>12:00</Text>
      </VStack>
      <Text fontSize={"20px"}>Daniel</Text>
      <HStack justifyContent={"center"} alignItems={"center"} space={"6px"}>
        <View h={"10px"} w={"10px"} bgColor={"green.400"} borderRadius={"100px"}></View>
        <Text fontSize={"20px"}>Listo</Text>
      </HStack>
      <Flex >
        <Text fontSize={"20px"}>$200</Text>
      </Flex>
    </HStack>
  );
}
export default Order;