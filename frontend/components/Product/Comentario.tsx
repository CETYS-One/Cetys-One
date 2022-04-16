import {Text, TextArea, Flex, Center, VStack} from 'native-base';

const Comentario = () => {
  return(
    <VStack space={"2"} alignItems={"center"}>
      <Text fontSize={"20px"}>Comentario</Text>
      <TextArea placeholder="Hola" h={"40px"} w={"150px"} bgColor={"white"}></TextArea>
    </VStack>
  );
}

export default Comentario;