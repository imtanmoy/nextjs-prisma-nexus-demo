import React from 'react';
import { Layout } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from '../graphql/client';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

const { Content, Header: AntHeader, Footer: AntFooter } = Layout;

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Header />
      <Menu />
      <Layout>
        <Content>main content</Content>
      </Layout>
      <Footer />
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
