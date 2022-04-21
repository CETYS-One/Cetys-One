import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import {
  Box,
  Button,
  ChevronLeftIcon,
  FormControl,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParams } from "../Pages";

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <SafeAreaView>
      <Box h="28%" background={"amber.500"}>
        <VStack w={"90%"} margin={"auto"}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="white" size={5} />
          </TouchableOpacity>
          <Text fontWeight={"700"} fontSize={"30px"} color="white" mt={5}>
            Perfil
          </Text>
        </VStack>
      </Box>
      <Box h="82%" background={"white"} borderTopRadius={20} mt={-4}>
        <ScrollView
          w={"90%"}
          mx={"auto"}
          mt={10}
          showsVerticalScrollIndicator={false}
        >
          <Box h={"600px"}>
            <VStack space={2} mb={10}>
              <Text fontWeight={"bold"}>Correo:</Text>
              <Text>hola@gmail.com</Text>
              <Text fontWeight={"bold"}>Matricula:</Text>
              <Text>13252</Text>
            </VStack>
            <Formik
              initialValues={{
                name: "",
                password: "",
              }}
              onSubmit={(values) => console.log(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                // @ts-ignore
                <KeyboardAwareScrollView
                  extraScrollHeight={100}
                  enableOnAndroid
                  keyboardShouldPersistTaps="handled"
                >
                  <ScrollView>
                    <FormControl isInvalid={touched.name && !!errors.name}>
                      <FormControl.Label>Nombre *</FormControl.Label>
                      <Input
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                      />
                      <FormControl.ErrorMessage>
                        {errors.name}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={touched.password && !!errors.password}
                    >
                      <FormControl.Label>Contraseña *</FormControl.Label>
                      <Input
                        type="password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />
                      <FormControl.ErrorMessage>
                        {errors.password}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <Button
                      type="submit"
                      onPress={() => handleSubmit()}
                      borderRadius="10"
                      backgroundColor={"amber.500"}
                      mt={10}
                      py={4}
                    >
                      Guardar Cambios
                    </Button>
                  </ScrollView>
                </KeyboardAwareScrollView>
              )}
            </Formik>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default Profile;
