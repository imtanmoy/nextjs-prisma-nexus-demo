import React from "react";
import styled from 'styled-components';
import {Card} from "antd";

import LoginForm from "../components/LoginForm";
import BasicLayout from "../layouts/BasicLayout";

const Div = styled.div`
   height: 100%;
   width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const cardStyle = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
};

const LoginPage = () => {
    return (
        <BasicLayout>
            <Div>
                <Card
                    bordered={false}
                    style={cardStyle}
                >
                <LoginForm/>
                </Card>
            </Div>
        </BasicLayout>
    );
};

export default LoginPage;
