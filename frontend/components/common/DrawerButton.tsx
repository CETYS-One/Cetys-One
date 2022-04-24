import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, HStack } from "native-base";

interface PropTypes {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
  active: boolean;
}
const DrawerButton = (props: PropTypes) => {
  const { icon, text, active = false, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        w={"100%"}
        py={4}
        px={2}
        space={2}
        bg={active ? "light.200" : undefined}
        rounded={10}
      >
        {icon}
        <Text>{text}</Text>
      </HStack>
    </TouchableOpacity>
  );
};
export default DrawerButton;
