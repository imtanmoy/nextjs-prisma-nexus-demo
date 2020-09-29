import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';

const Div = styled.div`
  display: flex;
  justify-items: center;
  justify-content: space-around;
  flex: 0 1 30%;
  margin-left: auto;
`;

const StyledAnchor = styled.a`
  display: flex;
  align-items: center;
  margin-left: 32px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  color: rgb(128, 128, 128);
  & :hover {
    color: inherit;
  }
  & span {
    margin-left: 5px;
  }
`;

const HeaderRightContent: React.FC = () => {
  return (
    <Div>
      <Link href="/cart">
        <StyledAnchor>
          <AiOutlineShoppingCart size="1.5em" />
          <span>Cart</span>
        </StyledAnchor>
      </Link>
      <Link href="/wishlist">
        <StyledAnchor>
          <AiOutlineHeart size="1.5em" />
          <span>Wishlist</span>
        </StyledAnchor>
      </Link>
      <Link href="/login">
        <StyledAnchor>
          <AiOutlineUser size="1.5em" />
          <span>Sign In</span>
        </StyledAnchor>
      </Link>
    </Div>
  );
};

export default HeaderRightContent;
