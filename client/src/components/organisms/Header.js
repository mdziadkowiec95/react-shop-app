import React from 'react';
import Navigation from 'components/molecules/Navigation/Navigation';
import styled from 'styled-components';

const StyledHeader = styled.header`
  padding: 30px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 1px 5px ${({ theme }) => theme.grey200};
  box-shadow: 0 0.375em 1em rgba(0, 0, 0, 0.1);
`;

const Header = () => (
  <StyledHeader>
    <Navigation />
  </StyledHeader>
);

export default Header;
