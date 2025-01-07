import React from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const Title = styled.div`
  font: normal 34px/1 "Montserrat";
  span {
    color: ${({ theme }) => theme.accentColor};
  }
`;
const Desc = styled.p`
  font: normal 16px/1 "Montserrat";
  color: ${({ theme }) => theme.grayColor};
`;

const Header = () => {
  return (
    <Wrapper>
      <Title>
        <h1>
          <span>To Do</span> List
        </h1>
      </Title>
      <Desc>Today is {new Date().toDateString()}</Desc>
    </Wrapper>
  );
};

export default React.memo(Header);
