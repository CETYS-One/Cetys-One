import {
  Text,
  Box,
  Image,
  Flex,
  HStack,
  VStack,
  ScrollView,
  Button,
} from "native-base";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopProvider";
import { IProduct } from "../../types/strapi";
import Product from "./Product";

interface PropTypes {
  products: IProduct[];
}
const Section = (props: PropTypes) => {
  const { products } = props;
  return (
    <Box>
      <VStack>
        <Box pl={"10px"}>
          <Text fontSize={"20px"} fontWeight={"bold"}>
            {products[0].category.name}
          </Text>
        </Box>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack
            flexDirection={"row"}
            overflow={"hidden"}
            mt={"10px"}
            space={"3"}
            paddingBottom={"10px"}
            paddingLeft={"8px"}
          >
            {products &&
              products.map((product) => (
                <Product key={product.id} {...product} />
              ))}
          </HStack>
        </ScrollView>
      </VStack>
    </Box>
  );
};
export default Section;
