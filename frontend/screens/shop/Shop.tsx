import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import { stringify } from "qs";
import * as React from "react";
import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { AnimatedBox } from "../../components/common/Animated";
import Header from "../../components/common/Header";
import MainSection from "../../components/shop/MainSection";
import { ProductsByCategory, ShopContext } from "../../context/ShopProvider";
import { useAxios } from "../../hooks/useAxios";
import ShopSplash from "./ShopSplash";

interface PropTypes {
  isLoading: boolean;
  name: string;
  color: string;
  alias: string;
}

const Shop = (props: PropTypes) => {
  const { isLoading, name, color, alias } = props;

  const axios = useAxios();
  const queryClient = useQueryClient();

  const handleProductSearch = (query: string) => {
    const filters = stringify({
      _where: {
        _or: [{ name_contains: query }, { description_contains: query }],
      },
    });

    queryClient.fetchQuery(alias, async () => {
      const res = await axios.get<ProductsByCategory>(
        `products/byCategories/${alias}?${filters}`
      );
      return res.data;
    });
  };

  return (
    <>
      {isLoading ? (
        <ShopSplash title={name} color={color} />
      ) : (
        <Header
          title={name}
          searchBar
          container={false}
          bgColor={color}
          onSearch={handleProductSearch}
        >
          <MainSection />
        </Header>
      )}
      {/* <Button mt={"200px"}>{name} a</Button> */}

      {/* {isLoading ? (
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
            // isLoading={isLoading || isLoadingSearch}
            // onSearch={handleProductSearch}
          >
            <MainSection />
          </Header>
        </AnimatedBox>
      )} */}
    </>
  );
};

export default React.memo(Shop);
