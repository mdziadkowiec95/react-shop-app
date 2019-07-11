import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import { addToBasket as addToBasketAction } from 'actions/basketActions';
import addToBasketIcon from 'assets/icons/addToBasketIcon.svg';
import basketIcon from 'assets/icons/basketIcon.svg';

const StyledWrapper = styled.div`
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.grey300};
  border-radius: 20px;
`;

const StyledPrice = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;
  
`;

const StyledPriceCurrent = styled(StyledPrice)`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.grey300};
`;

const StyledPriceOld = styled(StyledPrice)`
  font-size: ${({ theme }) => theme.fontSize.m};
  text-decoration: line-through;
  color: ${({ theme }) => theme.grey300};
`;

const StyledBtnGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
  min-width: 200px;
`;

class OrderBox extends Component {
  state = {
    productAmount: 1,
  };

  handleAddToBasket = e => {
    e.preventDefault();

    const { _id, name, price, mainImage, addToBasket } = this.props;
    const { productAmount } = this.state;

    addToBasket(_id, name, price, mainImage, productAmount, 'productPage');
  };

  handleAmountChange = e => {
    const productAmount = parseInt(e.target.value);

    this.setState({ productAmount });
  };

  generateAmountOptions(amount = 10) {
    const options = [];
    for (let i = 1; i <= amount; i += 1) {
      options.push(i);
    }

    return options;
  }

  render() {
    return (
      <StyledWrapper>
        <div>
          <StyledPriceOld>5555$</StyledPriceOld>
          <StyledPriceCurrent>4555$</StyledPriceCurrent>
          <select name="" id="" onChange={this.handleAmountChange}>
            {this.generateAmountOptions().map(item => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <StyledBtnGroup>
            <StyledButton secondary flex={1} icon={addToBasketIcon} onClick={this.handleAddToBasket}>
              <span>Add to basekt</span>
            </StyledButton>
            <StyledButton secondary flex={1} icon={basketIcon} as={Link} to="/basket">
              <span>Go to basket</span>
            </StyledButton>
          </StyledBtnGroup>
        </div>
      </StyledWrapper>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  addToBasket: (id, name, price, image, count, pageType) => dispatch(addToBasketAction(id, name, price, image, count, pageType)),
});

export default connect(
  null,
  mapDispatchToProps,
)(OrderBox);


// export default OrderBox; 