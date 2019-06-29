import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import ContentTemplate from 'templates/ContentTemplate';
import { MdShoppingCart } from 'react-icons/md';
import { basketIconPopIn } from 'styles/KeyFrames';

const StyledNavList = styled.ul`
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledNavItem = styled.li`
  margin: 0 5px;
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-decoration: none;

  ${({ animate }) =>
    animate &&
    css`
      animation: ${basketIconPopIn} 1s;
    `}
`;

const StyledBasketItem = styled.li`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.white};
`;

const StyledBasketCounter = styled.span``;

class Navigation extends Component {
  state = {
    basketAnimate: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props.basketItemsNumber !== prevProps.basketItemsNumber) {
      this.setState({ basketAnimate: true });
    }
  }

  render() {
    const { basketItemsNumber } = this.props;
    const { basketAnimate } = this.state;

    return (
      <ContentTemplate>
        <nav>
          <StyledNavList>
            <StyledNavItem>
              <StyledNavLink exact to="/">
                Home
              </StyledNavLink>
            </StyledNavItem>
            <StyledNavItem>
              <StyledNavLink to="/products/all">Products</StyledNavLink>
            </StyledNavItem>
            <StyledNavItem>
              <StyledNavLink to="/products/phones">Phones</StyledNavLink>
            </StyledNavItem>
            <StyledNavItem>
              <StyledNavLink to="/products/tablets">Tablets</StyledNavLink>
            </StyledNavItem>
            <StyledNavItem>
              <StyledNavLink to="/products/notebooks">Notebooks</StyledNavLink>
            </StyledNavItem>
            <StyledBasketItem>
              <StyledNavLink
                animate={basketAnimate}
                onAnimationEnd={() => this.setState({ basketAnimate: false })}
                to="/basket"
              >
                <MdShoppingCart size={30} />
              </StyledNavLink>
              <StyledBasketCounter> ({basketItemsNumber})</StyledBasketCounter>
            </StyledBasketItem>
          </StyledNavList>
        </nav>
      </ContentTemplate>
    );
  }
}

const mapStateToProps = ({ basket: { items } }) => {
  return {
    basketItemsNumber: items.reduce((total, cur) => {
      return total + cur.count;
    }, 0),
  };
};

export default connect(mapStateToProps)(Navigation);
