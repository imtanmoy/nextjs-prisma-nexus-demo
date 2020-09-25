import { gql, useMutation } from '@apollo/client';
import { JwtUser, LoginInput, SignupInput } from '../types/auth';
import { User } from '../types/user';
import { OnCompleteFn, OnErrorFn } from './index';

export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      name
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const useSignup = ({
  onComplete,
  onError,
}: {
  onComplete: OnCompleteFn;
  onError: OnErrorFn;
}) => {
  const [handler, { data, loading, error }] = useMutation<User, SignupInput>(
    SIGNUP,
    {
      onCompleted: onComplete,
      onError: onError,
    }
  );

  const handleSignup = (input: SignupInput) => {
    handler({
      variables: {
        name: input.name,
        email: input.email,
        password: input.password,
      },
    }).then(null);
  };
  return {
    data,
    error,
    loading,
    handleSignup,
  };
};

export const useLogin = () => {
  const [handler, { data, loading, error }] = useMutation<
    { login: JwtUser },
    LoginInput
  >(LOGIN);

  const handleLogin = async (input: LoginInput) => {
    return await handler({
      variables: {
        email: input.email,
        password: input.password,
      },
    });
  };
  return {
    data,
    error,
    loading,
    handleLogin,
  };
};
