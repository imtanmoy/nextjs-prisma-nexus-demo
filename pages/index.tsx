import React from "react";
import Link from 'next/link';
import styled from 'styled-components';
import {Layout} from "antd";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`


const IndexPage = () => (
    <Layout>
        <Title>Hello Next.js 👋</Title>
        <p>
            <Link href="/about">
                <a>About</a>
            </Link>
        </p>
    </Layout>
)

export default IndexPage;
