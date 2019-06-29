import React from 'react';
import ContentTemplate from 'templates/ContentTemplate';
import styled from 'styled-components';
import { respondTo } from 'theme/breakpoints';

const StyledGrid = styled.div`
  ${respondTo.lg`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  `}
`;

const GridTemplate = ({ children }) => (
  <ContentTemplate>
    <StyledGrid>
      {children}
    </StyledGrid>
  </ContentTemplate>
);

export default GridTemplate;