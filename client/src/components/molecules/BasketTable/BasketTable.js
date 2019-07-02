import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removeFromBasket, changeAmount } from 'actions';
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';

const StyledTable = styled(Table)`
  margin-top: 50px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px ${({ theme }) => theme.grey200};
  border-radius: 10px;
  outline: 0;
`;

const StyledTh = styled(Th)`
  padding: 10px;
  text-align: left;
`;

const StyledTd = styled(Td)`
  padding: 10px;
`;

const StyledTr = styled(Tr)`
  border: 0 !important;
`;

const ProductActionBtn = styled.button`
  background: transparent;
  outline: 0;
  border: 0;
  font-size: 22px;
  transition: opacity .2s, transform .2s;
  cursor: pointer;

  :hover {
    opacity: .7;
    transform: scale(1.1);
  }
`;

const TrashBtn = styled(ProductActionBtn)`
  color: ${({ theme }) => theme.danger};
`;

const AddBtn = styled(ProductActionBtn)`
  color: ${({ theme }) => theme.success};
`;

const EmptyBasketNote = styled.p`
  margin-top: 30px;
  font-size: 20px;
  text-align: center;
`;


const BasketTable = ({ items, removeFromBasket, changeAmount }) => (
  <>
    <StyledTable>
      <Thead>
        <StyledTr>
          <StyledTh>Name</StyledTh>
          <StyledTh>Price</StyledTh>
          <StyledTh>Count</StyledTh>
          <StyledTh>Action</StyledTh>
        </StyledTr>
      </Thead>
      <Tbody>
        {items && items.map(item => (
          <StyledTr key={`${item.name}-${item.id}`}>
            <StyledTd>{item.name}</StyledTd>
            <StyledTd>{item.price}</StyledTd>
            <StyledTd>
              <span>{item.count}</span>
            </StyledTd>
            <StyledTd>
              <AddBtn onClick={() => changeAmount(item.id, 1)}>
                <MdAddCircle />
              </AddBtn>
              <ProductActionBtn onClick={() => changeAmount(item.id, -1)}>
                <MdRemoveCircle />
              </ProductActionBtn>
              <TrashBtn onClick={() => removeFromBasket(item.id)}>
                <IoMdTrash />
              </TrashBtn>
            </StyledTd>
          </StyledTr>
        ))}
      </Tbody>
    </StyledTable>
    {items.length < 1 && <EmptyBasketNote>Your basket is empty.</EmptyBasketNote>}
  </>
);

const mapDispatchToProps = dispatch => ({
  removeFromBasket: id => dispatch(removeFromBasket(id)),
  changeAmount: (id, value) => dispatch(changeAmount(id, value)),
});

export default connect(
  null,
  mapDispatchToProps,
)(BasketTable);