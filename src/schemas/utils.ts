import { ValidationError } from "yup";
import * as bcrypt from "bcryptjs";

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ key: string; message: string }> = [];
  err.inner.forEach((e) => {
    errors.push({
      key: e.path,
      message: e.message,
    });
  });
  return errors;
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};
