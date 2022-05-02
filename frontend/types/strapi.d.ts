import { IFormControlErrorMessageProps } from "native-base";
import { IShoppingProduct } from "../context/ShopProvider";

export interface UploadFile extends ImageFormat {
  _id: string;
  alternativeText: string;
  caption: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  created_by: string;
  updated_by: string;
  providers: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}
export interface IProduct {
  _id: string;
  createdAt: string;
  id: string;
  name: string;
  photos: UploadFile[];
  price: number;
  updatedAt: string;
  description: string;
  category: ICategories;
  from: "DVolada" | "Honey" | "Cafeteria";
}

export interface ICategories {
  _id: string;
  name: string;
  created_by: string;
  updated_by: string;
  createdAt: string;
  updatedBy: string;
}

export interface IUserToken {
  jwt: string;
  user: IUser;
}

export type Stores = "Honey" | "DVolada" | "Cafeteria";
export interface IUser {
  _id: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  role: IRole;
  username: string;
  updatedAt: string;
  cafeteria?: Stores;
}

export interface IRole {
  _id: string;
  id: string;
  description: string;
  name: string;
  type: "authenticated" | "admin" | "seller";
}

export interface IOrder {
  _id: string;
  id: string;
  status: "pending" | "rejected" | "done";
  from: IUser;
  items: IShoppingProduct[];
  to: Stores;
}
