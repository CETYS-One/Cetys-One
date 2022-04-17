import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Form, Formik } from "formik";
import { MotiView } from "moti";
import {
  Box,
  Text,
  VStack,
  FormControl,
  Input,
  Button,
  IconButton,
  ChevronLeftIcon,
  ScrollView,
  TextArea,
  HStack,
} from "native-base";
import { RootStackParams } from "../Pages";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Platform, TouchableOpacity, Animated, Dimensions } from "react-native";
import {
  SafeAreaView,
  withSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRef, useState } from "react";
import ImageThumbnail from "../../components/ProductEdit/ImageThumbnail";
import * as ImagePicker from "expo-image-picker";
import Header from "../../components/common/Header";
import { uploadPhoto } from "../../util/uploadPhoto";
import { UploadFile } from "../../types/strapi";
import Toast from "react-native-toast-message";
import axios from "../../util/axios";

interface FormTypes {
  name: string;
  description: string;
  price: number;
  images: ImagePicker.ImageInfo[];
}

const formInitialValues: FormTypes = {
  name: "",
  description: "",
  price: 0,
  images: [],
};

const ProductEdit = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [photosUploaded, setPhotosUploaded] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadFiles = async (images: ImagePicker.ImageInfo[]) => {
    const files: UploadFile[] = [];
    for (const [index, image] of images.entries()) {
      setPhotosUploaded(`Subiendo foto ${index + 1}/${images.length}`);

      const file = await uploadPhoto(image);
      if (!file) {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: "Hubo un error subiendo las fotos",
        });
        return;
      }

      files.push(file);
    }
    setPhotosUploaded("");
    return files;
  };

  const handleSubmit = async (values: FormTypes) => {
    setIsSubmitting(true);

    const files = await uploadFiles(values.images);
    if (!files) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "No se puede subir el producto en este momento",
      });
      setIsSubmitting(false);

      return;
    }

    try {
      const res = await axios.post("/products", {
        name: values.name,
        description: values.description,
        price: values.price,
        photos: files?.map((f) => f._id),
      });
      console.log(res.data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "No se puede subir el producto en este momento",
      });
      setIsSubmitting(false);
      return;
    }

    Toast.show({
      type: "success",
      text1: "Exito!",
      text2: "Producto subido correctamente",
    });
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#f59e0b" }}>
      <Header title="Agregar Producto">
        <Text fontWeight={"700"} fontSize={"23px"}>
          Manos a la obra!
        </Text>
        <Text fontWeight={"400"} fontSize={"13"} color={"gray.600"}>
          Haz las modificaciones que sean necesarias, nosotros nos encargaremos
          del resto
        </Text>
        <Box h={"600px"} mt={10}>
          <Formik
            initialValues={formInitialValues}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              name: Yup.string().required("El nombre es requerido"),
              description: Yup.string().required("La descripcion es requerida"),
              price: Yup.number().moreThan(0, "El precio debe ser mayor a 0"),
            })}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              // @ts-ignore
              <KeyboardAwareScrollView
                extraScrollHeight={100}
                enableOnAndroid
                keyboardShouldPersistTaps="handled"
              >
                <ScrollView showsVerticalScrollIndicator={true}>
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
                    isInvalid={touched.description && !!errors.description}
                  >
                    <FormControl.Label>Descripcion *</FormControl.Label>
                    <TextArea
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      isInvalid={touched.description && !!errors.description}
                      value={values.description}
                    />
                    <FormControl.ErrorMessage>
                      {errors.description}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={touched.price && !!errors.price}>
                    <FormControl.Label>Precio (MXN)*</FormControl.Label>
                    <Input
                      keyboardType={
                        Platform.OS === "android" ? "numeric" : "number-pad"
                      }
                      type="number"
                      onChangeText={handleChange("price")}
                      onBlur={handleBlur("price")}
                      value={`${values.price}`}
                    />
                    <FormControl.ErrorMessage>
                      {errors.price}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Imagenes</FormControl.Label>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <HStack space={4}>
                        {values.images.map((image) => (
                          <ImageThumbnail
                            key={image.uri}
                            src={image.uri}
                            onImageUpload={(result) =>
                              setFieldValue("images", [
                                ...values.images,
                                result,
                              ])
                            }
                            deleteImage={(deletedId) =>
                              setFieldValue(
                                "images",
                                values.images.filter(
                                  (image) => image.uri !== deletedId
                                )
                              )
                            }
                          />
                        ))}
                        <ImageThumbnail
                          onImageUpload={(result) =>
                            setFieldValue("images", [...values.images, result])
                          }
                        />
                      </HStack>
                    </ScrollView>
                    <FormControl.Label>{photosUploaded}</FormControl.Label>
                  </FormControl>
                  <TouchableOpacity>
                    <Button
                      type="submit"
                      onPress={() => handleSubmit()}
                      borderRadius="10"
                      backgroundColor={"amber.500"}
                      mt={10}
                      py={4}
                      isLoading={isSubmitting}
                    >
                      Crear Producto
                    </Button>
                  </TouchableOpacity>
                </ScrollView>
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </Box>
      </Header>
    </SafeAreaView>
  );
};
export default ProductEdit;
