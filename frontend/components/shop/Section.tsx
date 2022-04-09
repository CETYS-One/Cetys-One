import {Text,Box, Image, Flex} from 'native-base';
import Product from './Product';
const Section = () => {
  return(
    <Flex h={"200px"} borderColor={"blue.100"} borderWidth={"2px"} justifyContent={"space-between"}>
      <Box pt={"10px"} pl={"10px"}>
        <Text>Title of the Section</Text>
      </Box>
      <Flex flexDirection={"row"} mb={"50px"}>
        <Product/>
        <Product/>
        <Product/>
      </Flex>
    </Flex>
  );
}
export default Section;