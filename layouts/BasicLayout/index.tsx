import React from 'react';
import {Layout} from 'antd';
import styled from 'styled-components';

const {Content} = Layout;

const StyledContent = styled(Content)`
  position: relative;
  padding: 24px;
  transition: all 0.2s;
  min-height: 100vh;
`;

interface BasicLayoutProps {
    children: React.ComponentType<any> | React.ReactElement;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({children}) => {
    return (
        <Layout
            style={{
                minHeight: '100%',
            }}
        >
            <StyledContent>{children}</StyledContent>
        </Layout>
    );
};

export default BasicLayout;
