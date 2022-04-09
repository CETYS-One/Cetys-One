import {Box ,Text, View, Image, TextArea, Center, Flex} from 'native-base';

const Header = () => {
  return ( 
    <Flex bg="white" w={"100%"} h={"100px"} display={"flex"} flexDirection={"row"} align={"center"} justifyContent={"center"}  >
      <Flex flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} h={"100%"} w={"95%"} >
        <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/7/72/Logo-cetys.png"}} h={"50px"} w={"65px"} alt={"logo"}/>
        <TextArea placeholder="hola" h={"30px"} w={"200px"} mt={"20px"} borderRadius={"10px"}></TextArea>
        <Box>I</Box>
        <Box>P</Box>
      </Flex>      
    </Flex>
  );
}
export default Header;