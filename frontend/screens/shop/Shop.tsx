import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import * as React from "react";
import { useContext, useState } from "react";
import { AnimatedBox } from "../../components/common/Animated";
import Header from "../../components/common/Header";
import MainSection from "../../components/shop/MainSection";
import { ShopContext } from "../../context/ShopProvider";
import ShopSplash from "./ShopSplash";

interface PropTypes {
  isLoading: boolean;
  name: string;
  color: string;
  alias: string;
}

const Shop = (props: PropTypes) => {
  const { isLoading, name, color, alias } = props;

  const { storeData, handleSearch } = useContext(ShopContext);

  const [isLoadingSearch, setIsLoading] = useState(false);

  const handleProductSearch = async (query: string) => {
    setIsLoading(true);
    await handleSearch(query);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <ShopSplash title={name} color={color} />
      ) : (
        <AnimatedBox
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 500, type: "timing" }}
        >
          <Header
            title={name}
            searchBar
            container={false}
            bgColor={color}
            isLoading={isLoading || isLoadingSearch}
            onSearch={handleProductSearch}
          >
            <MainSection />
          </Header>
        </AnimatedBox>
      )}
    </>
  );
};

export default React.memo(Shop);
