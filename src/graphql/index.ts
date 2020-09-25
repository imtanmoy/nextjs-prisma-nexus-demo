import { ApolloError } from '@apollo/client';

export type OnCompleteFn = (res) => void;
export type OnErrorFn = (error: ApolloError) => void;
