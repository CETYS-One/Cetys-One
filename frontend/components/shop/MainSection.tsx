import {Text, Box, VStack, ScrollView} from 'native-base';
import Section from './Section';

const MainSection = () => {
  return(
    <ScrollView>
      <VStack mt={"15px"}>
        <Section/>
        <Section/>
        <Section/>
        <Section/>
        <Section/>
        <Section/>
      </VStack>  
    </ScrollView>
    
  );
}

export default MainSection;