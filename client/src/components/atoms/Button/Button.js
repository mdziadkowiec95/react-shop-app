import styled, { css } from 'styled-components';



const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  background-color: ${({ theme, secondary }) => (secondary ? theme.black100 : theme.primary)};
  background-color: hsla(16, 87%, 62%,1);

  color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px ${({ theme }) => theme.grey200};
  background-image: linear-gradient(to right,#25aae1,#4481eb,#3058b3,#3f86ed);
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
  background-size: 300% 100%;
  outline: 0;
  border: 0;
  border-radius: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-decoration: none;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  transition: all .3s;


  ${({ flex }) =>
    flex &&
    css`
      flex: ${flex};
      overflow: hidden;
    `}

  ${({ icon }) => icon && css`
    position: relative;
    /* overflow: hidden; */

    ::before {
      content: '';
      position: absolute;
      top: -100%;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: transparent;
      background-image: url(${icon});
      background-position: center;
      background-repeat: no-repeat;
      transition: transform .2s;
    }

    span {
      display: inline-block;
      width: 100%;
      height: 100%;
      /* background-color: transparent; */
      transition: transform .2s;
    }

    :hover {
      background-position: 100% 0;
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
