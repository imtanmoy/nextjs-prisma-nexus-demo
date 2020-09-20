import React from "react";
import Link from 'next/link';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`


const IndexPage = () => (
    <div>
        <Title>Hello Next.js 👋</Title>
        <p>
            <Link href="/about">
                <a>About</a>
            </Link>
        </p>
    </div>
)

export default IndexPage;
