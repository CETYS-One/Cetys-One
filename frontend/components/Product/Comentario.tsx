import { Text, TextArea, Flex, Center, VStack } from "native-base";

const Comentario = () => {
  return (
    <VStack space={"2"} alignItems={"center"}>
      <Text fontSize={"20px"}>Comentario</Text>
      <TextArea
        placeholder="Agrega un comentario"
        h={"70px"}
        w={"100%"}
        bgColor={"white"}
      ></TextArea>
    </VStack>
  );
};

export default Comentario;
