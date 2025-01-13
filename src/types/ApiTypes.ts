export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

export interface UserSession {
  _id: string;
}

export interface SessionDataType {
  isAuthenticated: boolean;
  user: UserSession | null;
}

export interface dbQueryType {
  _id?: string;
  visibility?: Visibility;
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

export interface ImageType {
  public_id: string;
  url: string;
}
