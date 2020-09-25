import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "antd";

import LoginForm from "../components/LoginForm";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { useLogin } from "../src/graphql/auth";
import { JwtUser, LoginInput } from "../src/types/auth";
import { FetchResult } from "apollo-link";
import { ApolloError } from "@apollo/client";

const Div = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const cardStyle = {
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
};

const LoginPage = () => {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const { handleLogin, loading, data } = useLogin();
  const onSubmit = (input: LoginInput) => {
    handleLogin(input)
      .then((res) => {
        console.log(res.data.login);
      })
      .catch((err: ApolloError) => {
        console.log(err.message);
      });
    // console.log(input);
  };
  return (
    <BasicLayout>
      <Div>
        <Card bordered={false} style={cardStyle}>
          <LoginForm
            onSubmit={onSubmit}
            validationErrors={validationErrors}
            submitting={loading}
          />
        </Card>
      </Div>
    </BasicLayout>
  );
};

export default LoginPage;
