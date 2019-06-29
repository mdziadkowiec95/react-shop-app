import styled, { keyframes } from 'styled-components';
import { theme } from 'theme/mainTheme';

export const basketIconPopIn = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
    color: ${theme.secondary};
  }
  100% {
    transform: scale(1);
  }
`;
