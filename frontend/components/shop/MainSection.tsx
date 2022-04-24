import { Text, Button, Box, VStack, ScrollView } from "native-base";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopProvider";
import Section from "./Section";
const MainSection = () => {
  const { products } = useContext(ShopContext);
  return (
    <VStack>
      {products &&
        Object.keys(products).map((key) => (
          <Section products={products[key]} key={key} />
        ))}
    </VStack>
  );
};

export default MainSection;
