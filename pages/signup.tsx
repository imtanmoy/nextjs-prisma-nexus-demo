import React, { useState } from "react";
import styled from "styled-components";
import SignupForm from "../components/SignupForm";
import { Card, message } from "antd";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { useSignup } from "../src/graphql/auth";
import { SignupInput } from "../src/types/auth";
import { User } from "../src/types/user";

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

export interface SignupErrors {
  name: string | null;
  email: string | null;
  password: string | null;
}

const SignupPage = () => {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<SignupErrors>({
    name: null,
    email: null,
    password: null,
  });

  const { handleSignup, loading } = useSignup({
    onComplete: (res: User) => {
      router.push("/login");
    },
    onError: (err) => {
      message.error(err.message);
      if (err.graphQLErrors[0].extensions.code === "BAD_USER_INPUT") {
        setValidationErrors({
          name: err.graphQLErrors[0].extensions.name
            ? err.graphQLErrors[0].extensions.name
            : null,
          email: err.graphQLErrors[0].extensions.email
            ? err.graphQLErrors[0].extensions.email
            : null,
          password: err.graphQLErrors[0].extensions.password
            ? err.graphQLErrors[0].extensions.password
            : null,
        });
      }
    },
  });
  const onSubmit = (input: SignupInput) => {
    handleSignup(input);
  };

  return (
    <BasicLayout>
      <Div>
        <Card bordered={false} style={cardStyle}>
          <SignupForm
            onSubmit={onSubmit}
            submitting={loading}
            validationErrors={validationErrors}
          />
        </Card>
      </Div>
    </BasicLayout>
  );
};

export default SignupPage;
