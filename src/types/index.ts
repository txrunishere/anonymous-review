import { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  reviews: Array<IReview>;
}

interface IReview extends Document {
  content: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Array<string>;
  user?: IUser;
  review?: IReview;
  reviews?: Array<IReview>;
  token?: string;
}

interface IRegisterForm extends ILoginForm {
  username: string;
}

interface ILoginForm {
  email: string;
  password: string;
}

interface IUserResponse {
  _id: string;
  username: string;
  email: string;
  reviews: Array<{
    _id: string;
    content: string;
    createdAt: Date;
  }>;
}

export type {
  IReview,
  IUser,
  ApiResponse,
  ILoginForm,
  IRegisterForm,
  IUserResponse,
};
