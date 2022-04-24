import { Box, Text, View, Image, TextArea, Center, Flex } from "native-base";

const Header = () => {
  return (
    <Flex
      w={"100%"}
      h={"100px"}
      display={"flex"}
      flexDirection={"row"}
      align={"center"}
      justifyContent={"center"}
      mt={"10px"}
    >
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        h={"100%"}
        w={"95%"}
        borderRadius={"20px"}
        bgColor={"gray.200"}
      >
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo-cetys.png",
          }}
          h={"55px"}
          w={"70px"}
          alt={"logo"}
        />
        <TextArea
          bgColor={"white"}
          placeholder="hola"
          h={"50px"}
          w={"210px"}
          borderRadius={"10px"}
          mt={"10px"}
          textAlignVertical={"center"}
        ></TextArea>
        <Box>I</Box>
        <Box>P</Box>
      </Flex>
    </Flex>
  );
};
export default Header;
