
// PROBABLY this component won't be necessary







// import React, { Component } from 'react';
// import styled, { css } from 'styled-components';

// const StyledCarouselNavBtn = styled.button`
//     flex: 1;
//     height: 150px;
//     margin: 0 .5rem;
//     border-radius: 20px;
//     background: ${({ imageUrl }) => `url(/${imageUrl})`} no-repeat center / 90%; 
//     cursor: pointer;
//     transition: opacity .25s, background-size .25s;

//     &:hover {
//       opacity: .7;
//       /* background-size: 95%; */
//     }

//     ${({ isActive }) => isActive && css`
//       border: 1px solid red;
//     `}
// `;

// class CarouselNavItem extends Component {
//   state = {
//     isActive: false,
//   };

//   componentDidUpdate(prevProps) {
//     if (prevProps.activeIndex !== this.props.activeEl) {
//       if (this.props.activeIndex === this.props.index)
//     }
//   }

//   render() {
//     const { index, changeSlideFn, image } = this.props;

//     return (
//       <StyledCarouselNavBtn key={`carousel-nav-item-${index}`} onClick={(e) => changeSlideFn(e)} onMouseOver={(e) => changeSlideFn(e)} data-index={index} imageUrl={image} >
//       </StyledCarouselNavBtn>
//     );
//   }
// }

// export default CarouselNavItem;