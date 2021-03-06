import { Center } from "native-base";
import { Dimensions } from "react-native";
import { AnimatedBox, AnimatedText } from "../../components/common/Animated";

interface PropTypes {
  title: string;
  color: string;
}
const ShopSplash = (props: PropTypes) => {
  const { title, color } = props;
  const dims = Dimensions.get("screen");

  return (
    <AnimatedBox w={dims.width} h={dims.height} backgroundColor={"white"}>
      <Center w={"100%"}>
        <Center h={"100%"}>
          <AnimatedText
            fontSize={24}
            color={color}
            from={{ opacity: 0, translateX: 100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: "spring" }}
          >
            {title}
          </AnimatedText>
        </Center>
      </Center>
    </AnimatedBox>
  );
};

export default ShopSplash;
