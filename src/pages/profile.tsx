import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { GETME, useProfile } from '../data/auth';
import { initializeApollo } from '../graphql/client';
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';

const ProfilePage: NextPage = () => {
  const { data, loading, error } = useProfile();

  return (
    <BasicLayout>
      <div>
        <div>
          <h1>Profile Page</h1>
          <pre>{JSON.stringify(loading, null, 2)}</pre>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      </div>
    </BasicLayout>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GETME,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default ProfilePage;
