import React from 'react';
import Logo from './logo';
import Search from './search';
import styled from 'styled-components';
import HeaderRightContent from './HeaderRightContent';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  justify-content: space-between;
  padding: 28px 10vw;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <Search />
      <HeaderRightContent />
    </HeaderWrapper>
  );
};

export default Header;
