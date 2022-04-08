import {Box ,Text, View, Image, TextArea} from 'native-base';

const Header = () => {
  return ( 
    <Box bg="yellow.400" px={"5px"} py={"5px"} borderWidth={"1px"} borderColor="red.100">
      <Image
        style={{width: '50%', height: '50%'}}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo-cetys.png',

        }}
        alt="logo"
      />      
      <TextArea h={20} placeholder="hola"></TextArea>
      <Box>Icono perfil</Box>
      <Box>Icono carrito</Box>
    </Box>
  );
}
export default Header;