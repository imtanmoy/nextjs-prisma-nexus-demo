import { ValidationError } from "yup";

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
