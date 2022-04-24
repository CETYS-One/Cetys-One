import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Center, Box, Spinner } from "native-base";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { IAuthNav } from "./navigators/MainNavigator";
import { AnimatedBox, AnimatedText } from "../components/common/Animated";
import MaskedView from "@react-native-community/masked-view";

const LoadingSplash = () => {
  const dims = Dimensions.get("screen");
  const { user, loadUserData, isLoadingUserData } = useAuth({
    onSuccessLoad: () => navigation.replace("Shop"),
    onErrorLoad: () => navigation.replace("Welcome"),
  });

  const navigation = useNavigation<StackNavigationProp<IAuthNav>>();

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AnimatedBox
      w={dims.width}
      h={dims.height}
      backgroundColor={"amber.500"}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Center w={"100%"}>
        <Center h={"100%"}>
          <AnimatedText
            fontSize={24}
            fontWeight={"bold"}
            from={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring" }}
            color={"white"}
          >
            CETYS One
          </AnimatedText>
        </Center>
      </Center>
    </AnimatedBox>
  );
};

export default LoadingSplash;
