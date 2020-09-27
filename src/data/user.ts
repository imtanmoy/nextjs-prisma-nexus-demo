import { gql, useQuery } from '@apollo/client';
import { User } from '../types/user';

export const ALLUSERS = gql`
  {
    allUsers {
      id
      name
      email
    }
  }
`;

export const useUser = () => {
  const { data, loading, error, refetch } = useQuery<User[], {}>(ALLUSERS);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
