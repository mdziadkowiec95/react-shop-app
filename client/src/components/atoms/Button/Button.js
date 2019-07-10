import styled, { css } from 'styled-components';



const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme, secondary }) => (secondary ? theme.black100 : theme.primary)};
  background-color: hsla(16, 87%, 62%,1);

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


  ${({ flex }) =>
    flex &&
    css`
      flex: ${flex};
    `}

  ${({ icon }) => icon && css`
    position: relative;
    overflow: hidden;

    ::before {
      content: '';
      position: absolute;
      top: -100%;
      left: 0;
      height: 100%;
      width: 100%;
      background-image: url(${icon});
      background-position: center;
      background-repeat: no-repeat;
      transition: transform .2s;
    }

    span {
      display: inline-block;
      width: 100%;
      height: 100%;
      transition: transform .2s;
    }

    :hover {
      ::before {
        transform: translateY(100%);
      }

      span {
        transform: translateY(200%);
      }
    }
  
  `}
`;

export default Button;
