import React, { useState } from "react";
import styled from "styled-components";
import SignupForm from "../components/SignupForm";
import { Card, message } from "antd";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { useSignup } from "../src/graphql/auth";
import { SignupInput } from "../src/types/auth";
import { User } from "../src/types/user";
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

const SignupPage = () => {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const { handleSignup, loading } = useSignup({
    onComplete: (res: User) => {
      router.push("/login");
    },
    onError: (err: ApolloError) => {
      message.error(err.message);
      const { graphQLErrors } = err;
      graphQLErrors.map(({ extensions }) => {
        const verror = {};
        if (extensions.code === "BAD_USER_INPUT") {
          const { errors } = extensions;
          errors.map(({ key, message }) => {
            verror[key] = [message];
          });
          setValidationErrors(verror);
        }
      });
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
