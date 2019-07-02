import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Button from 'components/atoms/Button/Button';
import { MdAddCircle } from 'react-icons/md'
import { FaQuestionCircle } from 'react-icons/fa'
// const DELIVERY_COSTS = {
//   online: 20, // Pay online
//   onDelivery: 30, // Cash on delivery
//   inPerson: 0 // Pay and take your order in person
// };


const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSummaryBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  min-width: 300px;
  margin-top: 40px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px ${({ theme }) => theme.grey200};
  border-radius: 10px;
`;

const StyledDetailRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  border-bottom: 2px solid ${({ theme }) => theme.secondary};
`;

const StyledLabel = styled.p`
  display: flex;
  margin-right: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StyledValue = styled.p`
  margin: 10px 0;
  font-size: 20px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;

  ${({ basketIsEmpty }) => basketIsEmpty && css`
    opacity: .6;
    cursor: not-allowed;
  `}
`;

const StyledPlusIcon = styled(MdAddCircle)`
  margin-bottom: 10px;
  font-size: 30px;
  color: ${({ theme }) => theme.secondary};
`;

const StyledQuestionIcon = styled(FaQuestionCircle)`
  margin-left: 7px;
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
`;


class BasketSummary extends Component {
  state = {
    productsCost: 0
  };

  componentWillMount() {
    this.calculateProductsCost();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.calculateProductsCost();
    }
  }

  calculateProductsCost = () => {
    const sum = this.props.items.reduce((total, cur) => total + (cur.count * cur.price), 0);

    this.setState({ productsCost: sum });
  };

  handleOrderBtnClick = (e) => {
    if (!this.props.items.length) e.preventDefault();
  };

  render() {
    const { productsCost } = this.state;
    const { items } = this.props;

    return (
      <StyledWrapper>
        <StyledSummaryBox>
          <StyledDetailRow>
            <StyledLabel>All products cost</StyledLabel>
            <StyledValue>{productsCost}$</StyledValue>
            <StyledPlusIcon />
            <StyledLabel>Delivery Costs <StyledQuestionIcon /></StyledLabel>
          </StyledDetailRow>
          <StyledButton as={Link} basketIsEmpty={!items.length > 0} onClick={this.handleOrderBtnClick} to="/order" secondary >Order</StyledButton>
        </StyledSummaryBox>
      </StyledWrapper>
    )
  }
};

// const mapStateToProps = ({ basket: { productsCost } }) => {
//   return {
//     productsCost
//   }
// };

export default BasketSummary;