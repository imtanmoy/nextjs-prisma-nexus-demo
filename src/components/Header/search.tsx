import React from 'react';
import { Input, Select } from 'antd';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

const { Option } = Select;

const StyledDiv = styled.div`
  flex: 0 1 45%;
  border: 2px solid rgb(245, 245, 245);
  & .ant-input-affix-wrapper,
  .ant-input-group-addon {
    border: none !important;
  }
`;

const Search: React.FC = () => {
  const selectAfter = (
    <Select defaultValue="all" size={'large'}>
      <Option value="all">All</Option>
      <Option value="Fashion">Fashion</Option>
      <Option value="Electronic">Electronic</Option>
      <Option value="Health">Health</Option>
    </Select>
  );

  return (
    <StyledDiv>
      <Input
        size={'large'}
        prefix={<AiOutlineSearch />}
        placeholder="search products"
        addonAfter={selectAfter}
      />
    </StyledDiv>
  );
};

export default Search;
