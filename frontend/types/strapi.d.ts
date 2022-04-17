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

export interface ICategories {
  _id: string;
  name: string;
  created_by: string;
  updated_by: string;
  createdAt: string;
  updatedBy: string;
}
