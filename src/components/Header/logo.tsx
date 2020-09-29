import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const LogoAnchor = styled.a`
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
  line-height: 60px;
  letter-spacing: 1.65px;
  text-transform: uppercase;
  color: #4d4d4d;
  text-decoration: none;
  flex: 0 1 20%;

  &:hover {
    color: #4d4d4d;
  }
`;

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <LogoAnchor>Next Store</LogoAnchor>
    </Link>
  );
};

export default Logo;
