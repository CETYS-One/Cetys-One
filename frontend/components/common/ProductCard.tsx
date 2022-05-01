import {
  Text,
  VStack,
  ChevronLeftIcon,
  Center,
  HStack,
  Image,
  Box,
  IBoxProps,
} from "native-base";
import { AnimatedBox } from "../common/Animated";
import { Swipeable } from "react-native-gesture-handler";

interface Props extends IBoxProps {
  id: string;
  name: string;
  price: number;
  description: string;
  photo?: string;
}

const ProductCard = (props: Props) => {
  const { id, name, price, description, photo, ...box } = props;
  return (
    <AnimatedBox
      key={id}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        borderColor={"gray.200"}
        borderWidth={1}
        borderRadius={4}
        h={100}
        backgroundColor={"white"}
        style={{ overflow: "hidden" }}
        {...box}
      >
        <HStack position={"relative"} w="100%">
          {!!photo && (
            <Center w="30%" h={100}>
              <Image
                source={{
                  uri: photo,
                }}
                borderLeftRadius={4}
                resizeMode={"cover"}
                w="100%"
                h="100"
                alt="src"
              />
            </Center>
          )}
          <VStack
            padding={3}
            h={100}
            w={photo ? "70%" : "100%"}
            flexWrap={"wrap"}
          >
            <Text fontWeight={"bold"}>{name}</Text>
            <Text fontSize={"xs"} flexWrap={"wrap"}>
              {description}
            </Text>
            <HStack
              marginTop={"auto"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text>${price}</Text>
              <ChevronLeftIcon />
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </AnimatedBox>
  );
};

export default ProductCard;
