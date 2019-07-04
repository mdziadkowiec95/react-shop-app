import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledField = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
  border-radius: 31px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 10px ${({ theme }) => theme.grey200};

   ${({ size }) => size === 'small' && css`
      ${StyledInput} {
        padding: 5px 20px;
        font-size: ${({ theme }) => theme.fontSize.s};
      }
  `}
`;

const StyledSpan = styled.span`
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 31px;
  background-color: #fff;
  pointer-events: none;
  transition: background-color .25s, width .25s;
`;

const StyledInput = styled.input`
  position: relative;
  display: block;
  width: 100%;
  background: ${({ theme }) => theme.white};
  border-radius: 31px;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.grey};
  line-height: 1.2;
  padding: 10px 20px;
  transition: background-color .25s;

  :focus  {
    background-color: ${({ theme }) => theme.grey300};
    color: ${({ theme }) => theme.white};

    + .span {
      width: calc(100% + 20px);
      background-color: ${({ theme }) => theme.grey300};
    }
  }
`;

const TextField = ({ onChangeFn, inputName, inputPlaceholder, inputValue, size }) => (
  <StyledField size={size}>
    <StyledInput small type="text" onChange={(e) => onChangeFn(e)} name={inputName} placeholder={inputPlaceholder ? inputPlaceholder : inputName} value={inputValue} />
    <StyledSpan className="span"></StyledSpan>
  </StyledField>
);

TextField.propTypes = {
  onChangeFn: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
};

TextField.defaultProps = {
  inputName: '',
  inputValue: ''
};

export default TextField; 