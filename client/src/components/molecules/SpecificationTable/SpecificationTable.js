import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Heading from 'components/atoms/Heading/Heading';
import styled from 'styled-components';

const StyledTr = styled(Tr)`
  padding: 1rem;
  background-color: ${({ theme }) => theme.secondaryLighten}; 
  transition: background-color .25s;

  :nth-child(odd) {
      background-color: ${({ theme }) => theme.white};
  }

  :hover {
    background-color: ${({ theme }) => theme.grey100};
  } 
`;

const StyledTd = styled(Td)`
  padding: 1rem;
`;

const StyledLabel = styled(StyledTd)`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const SpecificationTable = ({ items }) => (
  <>
    <Heading small align="left">Specification</Heading>
    <Table>
      <Tbody>
        {console.log(items)}
        {items.map(item => (
          <StyledTr>
            <StyledLabel>{item.label}</StyledLabel>
            <StyledTd>{item.value}</StyledTd>
          </StyledTr>
        ))}
      </Tbody>
    </Table>

  </>
);

export default SpecificationTable;