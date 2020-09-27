import {
  comparePassword,
  formatYupError,
  hashPassword,
} from '../../../schemas/utils';
import { UserInputError } from 'apollo-server-errors';
import * as yup from 'yup';
import * as jwt from 'jsonwebtoken';
import { GetGen, RootValue } from '@nexus/schema/dist/typegenTypeHelpers';

const SECRET_KEY = 'secret!';

const emailNotLongEnough = 'email must be at least 3 characters';
const nameNotLongEnough = 'name must be at least 3 characters';
const passwordNotLongEnough = 'password must be at least 8 characters';
const invalidEmail = 'email must be a valid email';

const signupValidator = yup.object().shape({
  name: yup.string().min(3, nameNotLongEnough).max(100),
  email: yup.string().min(3, emailNotLongEnough).max(100).email(invalidEmail),
  password: yup.string().min(8, passwordNotLongEnough).max(100),
});

const loginValidator = yup.object().shape({
  email: yup.string().min(3, emailNotLongEnough).max(100).email(invalidEmail),
  password: yup.string().min(8, passwordNotLongEnough).max(100),
});

export const signup = async (
  _root: RootValue<'Mutation'>,
  { name, email, password },
  ctx: GetGen<'context'>
): Promise<any> => {
  let errors: Array<{ key: string; message: string }> = [];

  try {
    await signupValidator.validate(
      { name, email, password },
      { abortEarly: false }
    );
  } catch (err) {
    errors = formatYupError(err);
  }

  if (errors.length) throw new UserInputError('Validation error', { errors });

  const user = await ctx.prisma.user.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    errors.push({
      key: 'email',
      message: 'user with this email already exist',
    });
    if (errors.length)
      throw new UserInputError('User already exists', { errors });
  }

  const hashedPassword = await hashPassword(password);

  return ctx.prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

export const login = async (
  _root: RootValue<'Mutation'>,
  { email, password },
  ctx: GetGen<'context'>
) => {
  // console.log(ctx);
  let errors: Array<{ key: string; message: string }> = [];

  try {
    await loginValidator.validate({ email, password }, { abortEarly: false });
  } catch (err) {
    errors = formatYupError(err);
  }

  if (errors.length) throw new UserInputError('Validation error', { errors });

  const user = await ctx.prisma.user.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error('login credentials does not match');
  }

  const valid = await comparePassword(password, user.password);

  if (!valid) {
    throw new Error('login credentials does not match');
  }

  const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, {
    expiresIn: '1d',
  });

  ctx.res.cookie('token', token, {
    path: '/',
    // httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    token,
    user,
  };
};
