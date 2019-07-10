import React from 'react';
import styled, { css } from 'styled-components';
import { respondTo } from 'theme/breakpoints';

const Heading = styled.h2`
  margin-bottom: 2.4rem;
  text-align: ${({ align }) => align ? align : 'center'};
  font-size: ${({ theme }) => theme.fontSize.l};

  ${respondTo.sm`
    font-size: ${({ theme }) => theme.fontSize.xxl};
  `}

  ${({ small }) => small && css`

    font-size: ${({ theme }) => theme.fontSize.m};

    ${respondTo.sm`
      font-size: ${({ theme }) => theme.fontSize.xl};
    `}
  `}
`;

export default Heading;