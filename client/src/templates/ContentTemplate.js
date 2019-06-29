import React from 'react';
import styled from 'styled-components';
import { respondTo } from 'theme/breakpoints';

const StyledContainer = styled.div`
  ${respondTo.lg`
    max-width: 1170px;
    margin: 0 auto;
  `}
`;

const ContentTemplate = ({ children }) => (
  <>
    <StyledContainer>{children}</StyledContainer>
  </>
);

export default ContentTemplate;
