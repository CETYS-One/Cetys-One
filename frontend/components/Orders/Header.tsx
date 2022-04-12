import {Text, Box, View, HStack, VStack, Image} from "native-base";
const Header = () => {
  return(
    <HStack w={"100%"} justifyContent={"center"}>
      <HStack w={"90%"} justifyContent={"space-between"} alignItems={"center"} bgColor={"gray.300"} p={"10px"} borderRadius={"10px"}>
        <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/7/72/Logo-cetys.png"}} h={"55px"} w={"70px"} alt={"logo"}/> 
        <Text fontSize={"25px"} fontWeight={"bold"} mr={"65px"}>ORDERS</Text>
        <Box>i</Box>
      </HStack>
    </HStack>
  );
}

export default Header;