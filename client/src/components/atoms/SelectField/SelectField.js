import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px ${({ theme }) => theme.grey200};
`;
const StyledSelect = styled.select`
 height: 40px;
 border-radius: 20px;
 outline: 0;
 width: 100%;
 background: ${({ theme }) => theme.white};
 font-size: ${({ theme }) => theme.fontSize.s};
 font-weight: ${({ theme }) => theme.fontWeight.bold};
 color: ${({ theme }) => theme.black300};
 padding: 0 20px;
 appearance: none;
`;

const SelectField = ({ onChangeFn, optionsArr, selectName, selectedOptionIndex, selectPlaceholder }) => (
  <StyledWrapper>
  <StyledSelect onChange={(e) => onChangeFn(e)} name={selectName}>
    <option disabled selected>{selectPlaceholder}</option>;
    {optionsArr.map((item, index) => {
      if (index === selectedOptionIndex) {
        return <option value={item} selected>{item}</option>;
      } else {
        return <option value={item}>{item}</option>;
      }
    }
    )}
  </StyledSelect>
  </StyledWrapper>
);

SelectField.propTypes = {
  onChangeFn: PropTypes.func.isRequired,
  optionsArr: PropTypes.array.isRequired,
  selectName: PropTypes.string.isRequired,
  selectedOptionIndex: PropTypes.number
};

SelectField.defaultProps = {
  optionsArr: [],
  selectedOptionIndex: null
};

export default SelectField;

