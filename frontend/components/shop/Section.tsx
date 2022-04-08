import {Text,Box, Image} from 'native-base';
import Product from './Product';
const Section = () => {
  return(
    <Box>
    <Text>Title of the Section</Text>
    <Product/>
    <Product/>
    <Product/>
    </Box>
  );
}
export default Section;