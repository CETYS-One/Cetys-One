import { Text, Button, Box, VStack, ScrollView } from "native-base";
import Section from "./Section";
const MainSection = ({ navigation }) => {
  return (
    <VStack>
      <Section navigation={navigation} />
      <Section navigation={navigation} />
    </VStack>
  );
};

export default MainSection;
