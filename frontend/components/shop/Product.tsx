import {Text,Box,Image,Flex} from 'native-base';

const Product = () => {
  return (
    <Flex>
      <Image height={"120px"} width={"120px"} source={{uri:"https://barradeideas.com/wp-content/uploads/2019/09/fast-food.jpg"}} alt="hola" borderRadius={"10px"}/>
      <Text>Famous Star</Text>
      <Text color={"yellow.800"}>$200</Text>
    </Flex>
  );
}
export default Product;