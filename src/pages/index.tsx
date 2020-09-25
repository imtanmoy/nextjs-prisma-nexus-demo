import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { initializeApollo } from '../lib/apollo';
import { GetServerSideProps } from 'next';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const MyQuery = gql`
  query Hello($name: String!) {
    hello(name: $name)
  }
`;

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;

  const { data, loading } = useQuery<string, { name: string }>(MyQuery, {
    variables: {
      name: name ? (typeof name === 'string' ? name : name[0].toString()) : '',
    },
    skip: !name,
    // variables: { name: "Banik" },
  });

  if (loading) return <span>loading...</span>;

  return (
    <Layout>
      <Title>Hello Next.js 👋</Title>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.query;
  const apolloClient = initializeApollo();

  await apolloClient.query<string, { name: string }>({
    query: MyQuery,
    variables: {
      name: name ? (typeof name === 'string' ? name : name[0].toString()) : '',
      // name: "Tanmoy",
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
