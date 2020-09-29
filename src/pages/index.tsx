import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Layout } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from '../graphql/client';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Title>Hello Next.js 👋</Title>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <div></div>
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
