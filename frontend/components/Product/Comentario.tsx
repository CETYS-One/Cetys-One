import { Text, TextArea, Flex, Center, VStack } from "native-base";

interface PropTypes {
  onChange: (value: string) => void;
  value: string;
}

const Comentario = ({ onChange, value }: PropTypes) => {
  return (
    <VStack space={"2"} alignItems={"flex-start"} justifyContent={"flex-start"}>
      <Text fontSize={"20px"}>Comentario</Text>
      <TextArea
        value={value}
        onChange={(e) => onChange(e.nativeEvent.text)}
        placeholder="Agrega un comentario"
        h={"70px"}
        w={"100%"}
        bgColor={"white"}
      ></TextArea>
    </VStack>
  );
};

export default Comentario;
