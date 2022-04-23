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
import Header from "../../components/common/Header";
import { RootStackParams } from "../Pages";

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <Header title="Perfil">
      <Box>
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
            <>
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
              <FormControl isInvalid={touched.password && !!errors.password}>
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
            </>
          )}
        </Formik>
      </Box>
    </Header>
  );
};

export default Profile;
