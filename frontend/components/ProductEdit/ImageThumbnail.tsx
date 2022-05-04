import {
  Actionsheet,
  AddIcon,
  Box,
  Center,
  Image,
  Pressable,
  Text,
  useDisclose,
} from "native-base";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { onChange } from "react-native-reanimated";

interface PropTypes {
  src?: string;
  onImageUpload: (value: ImagePicker.ImageInfo) => void;
  deleteImage?: (id: string) => void;
}

const ImageThumbnail = (props: PropTypes) => {
  const { src, onImageUpload, deleteImage } = props;

  const {
    isOpen: isOpenEdit,
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
  } = useDisclose();

  const {
    isOpen: isOpenAdd,
    onClose: onCloseAdd,
    onOpen: onOpenAdd,
  } = useDisclose();

  const handlePress = () => {
    if (src) {
      onOpenEdit();
      return;
    }
    onOpenAdd();
  };

  const handleChoosePhoto = async (camera?: boolean) => {
    let result: ImagePicker.ImagePickerResult;

    if (camera) {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!cameraPermission.granted) {
        alert("Necesitas ortorgar permisos para usar la cámara");
        return;
      }

      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
    } else {
      const libraryPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!libraryPermission.granted) {
        alert("Necesitas ortorgar permisos para poder ver tus fotos");
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (!result.cancelled) {
      console.log(result);
      onImageUpload(result);
      onCloseAdd();
    }
  };

  const handleDeleteImage = () => {
    if (!src || !deleteImage) return;

    deleteImage(src);
    onCloseEdit();
  };

  return (
    <Box w={"100px"} h="100px">
      <TouchableOpacity onPress={handlePress}>
        <Center w="100px" h="100px" bg={"gray.100"} borderRadius={3}>
          {src ? (
            <Image
              source={{ uri: src }}
              resizeMode={"cover"}
              w="100%"
              h="100%"
              alt="src"
            />
          ) : (
            <AddIcon />
          )}
        </Center>
        <Text>{src}</Text>
      </TouchableOpacity>
      <Actionsheet isOpen={isOpenEdit} onClose={onCloseEdit}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={handleDeleteImage}>
            Eliminar
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Actionsheet isOpen={isOpenAdd} onClose={onCloseAdd}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => handleChoosePhoto(true)}>
            Tomar Foto
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => handleChoosePhoto()}>
            Importar Foto
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};
export default ImageThumbnail;
