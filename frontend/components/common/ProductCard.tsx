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
import { ReactNode } from "react";
import ImageBlurLoading from "react-native-image-blur-loading";

interface Props extends IBoxProps {
  name: string;
  price: number;
  description: string;
  photo?: string;
  photoBlur?: string;
  renderIcon?: ReactNode;
}
{/* <HStack alignItems={"center"}>
<ChevronLeftIcon color={"red"}/>
                <ChevronLeftIcon />
                <Text>Eliminar</Text>
              </HStack> */}
const ProductCard = (props: Props) => {
  const {
    name,
    price,
    description,
    photo,
    photoBlur,
    renderIcon = <HStack alignItems={"center"}><ChevronLeftIcon color={"red.500"}/><ChevronLeftIcon color={"red.500"}/><Text color={"red.500"}>Eliminar</Text></HStack>,  
    id,
    ...box
  } = props;
  return (
    <AnimatedBox
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
              <ImageBlurLoading
                thumbnailSource={{ uri: photoBlur }}
                source={{
                  uri: photo,
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                  borderLeftRadius: 4,
                }}
              />
            </Center>
          )}
          <VStack padding={3} h={100} w={photo ? "70%" : "100%"} flexGrow={1}>
            <Text fontWeight={"bold"} fontSize={12}>
              {name}
            </Text>
            <Text fontSize={"xs"} flexWrap={"wrap"}>
              {description}
            </Text>
            <HStack
              marginTop={"auto"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text>${price}</Text>

                {renderIcon}
             
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </AnimatedBox>
  );
};

export default ProductCard;
