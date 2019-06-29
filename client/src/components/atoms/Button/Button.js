import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme, secondary }) => secondary ? theme.black100 : theme.primary};
  color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px ${({ theme }) => theme.grey200};
  outline: 0;
  border: 0;
  border-radius: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-decoration: none;
  text-align: center;
  cursor: pointer;

  ${({ flex }) => flex && css`
    flex: ${flex};
  `}

`;

export default Button;

