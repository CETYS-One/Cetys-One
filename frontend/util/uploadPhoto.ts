import { ImageInfo } from "expo-image-picker";
import axios, { baseURL } from "./axios";
import * as FileSystem from "expo-file-system";
import { UploadFile } from "../types/strapi";

export const uploadPhoto = async (photo: ImageInfo, token: string) => {
  // I hate you expo
  try {
    const res = await FileSystem.uploadAsync(`${baseURL}/upload`, photo.uri, {
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "files",
      mimeType: "image/png",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedBody: UploadFile[] = JSON.parse(res.body);
    return parsedBody[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
