import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { addToBasket } from "actions";
import styled from 'styled-components';
import productImgPlaceholder from 'assets/images/iphone8-product.jpg';
import Button from 'components/atoms/Button/Button';

const StyledWrapper = styled.div`
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 0 10px ${({ theme }) => theme.grey200};
  background-color: ${({ theme }) => theme.white};
  overflow: hidden;
  transition: transform .25s;

  :hover {
    transform: scale(1.05);
  }
`;

const StyledImage = styled.img`
   display: block;
   margin: 0 auto;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const StyledButton = styled(Button)`
  margin: 0 5px;
`;


class Card extends Component {
  handleAddToBasket = (e) => {
    e.preventDefault();

    const { id, name, price, addToBasket } = this.props;

    addToBasket(id, name, price);
  }

  render() {
    const { id, name, price, category, img } = this.props;
    const productImg = img ? img : productImgPlaceholder;

    return (
      <StyledWrapper>

        <StyledImage src={productImg} alt={`${name} - ${category}`} />
        <h3>{name}</h3>
        <p>{price}$</p>
        <p>{category}</p>
        <StyledButtonGroup>
          <StyledButton secondary flex={1} onClick={(e) => this.handleAddToBasket(e)}>Add to basekt</StyledButton>
          <StyledButton secondary flex={1} as={Link} to={`${category}/${id}`}>More info</StyledButton>
        </StyledButtonGroup>

        {/* <Link to={`${category}/${id}`}>

          <button>
            More info
          </button>
        </Link> */}
      </StyledWrapper>

    );
  }

}

const mapDispatchToProps = dispatch => ({
  addToBasket: (id, name, price) => dispatch(addToBasket(id, name, price))
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Card));
