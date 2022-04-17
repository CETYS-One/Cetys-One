import { motify } from "moti";
import { Box, Text, HStack, VStack } from "native-base";

export const AnimatedBox = motify(Box)();
export const AnimatedText = motify(Text)();
export const AnimatedHStack = motify(HStack)();
export const AnimatedVStack = motify(VStack)();
