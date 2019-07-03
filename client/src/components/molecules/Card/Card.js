import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToBasket } from 'actions';
import styled from 'styled-components';
import productImgPlaceholder from 'assets/images/iphone8-product.jpg';
import Button from 'components/atoms/Button/Button';
import addToBasketIcon from 'assets/icons/addToBasketIcon.svg';
import infoIcon from 'assets/icons/infoIcon.svg';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 0 10px ${({ theme }) => theme.grey200};
  background-color: ${({ theme }) => theme.white};
  overflow: hidden;
  transition: transform 0.25s;

  :hover {
    transform: scale(1.03);
  }
`;

const StyledImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 250px;
`;

const StyledName = styled.h4`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledPrice = styled.p`

`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;

  :first-child {
    margin-right: 10px;
  }
`;

class Card extends Component {
  handleAddToBasket = e => {
    e.preventDefault();

    const { _id, name, price, image, addToBasket } = this.props;

    addToBasket(_id, name, price, image);
  };

  render() {
    const { _id, name, price, category, image } = this.props;
    const productImg = image || productImgPlaceholder;

    return (
      <StyledWrapper>
        <StyledImage src={`/${productImg}`} alt={`${name} - ${category}`} />
        <StyledName>{name}</StyledName>
        <StyledPrice>{price}$</StyledPrice>
        {/* <StyledCategory>{category}</p> */}
        <StyledButtonGroup>
          <StyledButton secondary flex={1} icon={addToBasketIcon} onClick={e => this.handleAddToBasket(e)}>
            <span>Add to basekt</span>
          </StyledButton>
          <StyledButton secondary flex={1} icon={infoIcon} as={Link} to={`${category}/${_id}`}>
            <span>More info</span>
          </StyledButton>
        </StyledButtonGroup>
      </StyledWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addToBasket: (id, name, price, image) => dispatch(addToBasket(id, name, price, image)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Card));
