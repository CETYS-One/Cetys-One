import { Box, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import MainSection from "../../components/shop/MainSection";
import axios from "../../util/axios";

const Shop = () => {
  async function getProduct() {
    const res = await axios.get("/products");
    setProductos(res.data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  const [productos, setProductos] = useState([]);

  return (
    <SafeAreaView style={{ backgroundColor: "#f59e0b" }}>
      <Header title={"Tienda"} searchBar container={false}>
        <MainSection />
        {productos.map((producto) => {
          return <Text>{producto.description}</Text>;
        })}
      </Header>
    </SafeAreaView>
  );
};

export default Shop;
