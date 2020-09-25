import { User } from './user';

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
export interface JwtUser {
  token: string;
  user: User;
}
