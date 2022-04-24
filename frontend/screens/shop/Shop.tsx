import * as React from "react";
import { AnimatedBox } from "../../components/common/Animated";
import Header from "../../components/common/Header";
import MainSection from "../../components/shop/MainSection";
import ShopSplash from "./ShopSplash";

interface PropTypes {
  isLoading: boolean;
  name: string;
  color: string;
  alias: string;
}

const Shop = (props: PropTypes) => {
  const { isLoading, name, color, alias } = props;

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
          <Header title={name} searchBar container={false} bgColor={color}>
            <MainSection />
          </Header>
        </AnimatedBox>
      )}
    </>
  );
};

export default React.memo(Shop);
