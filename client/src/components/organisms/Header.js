import React from 'react';
import Navigation from 'components/molecules/Navigation/Navigation';
import styled from 'styled-components';

const StyledHeader = styled.header`
  padding: 30px;
  background-color: ${({ theme }) => theme.primary};
box-shadow: 0 1px 5px ${({ theme }) => theme.grey200};
`;

const Header = () => (
  <StyledHeader>
    <Navigation />
  </StyledHeader>
);

export default Header;