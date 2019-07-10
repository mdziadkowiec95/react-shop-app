import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';



const StyledWrapper = styled.div`
  margin: 0 auto; /* temp */

  border-radius: 10px;
  overflow: hidden;
  max-width: 500px;
  background-color: ${({ theme }) => theme.white};
`;

const StyledMainImageBox = styled.div`
  min-height: 500px;
  min-width: 500px; 
  background: ${({ imageUrl }) => `url(/${imageUrl})`} no-repeat center / 90%; 
`;

const StyledCarouselNav = styled.div`
  display: flex;
  margin-top: .5rem;
  background-color: ${({ theme }) => theme.white};
`;

const StyledCarouselNavBtn = styled.button`
    flex: 1;
    height: 150px; 
    margin: 0 .5rem;
    border-radius: 20px;
    background: ${({ imageUrl }) => `url(/${imageUrl})`} no-repeat center / 90%; 
    cursor: pointer;
    transition: opacity .25s, border-color .25s;

    &:hover {
      opacity: .7;
      /* background-size: 95%; */
    }

    ${({ isActive }) => isActive && css`
      border: 1px solid ${({ theme }) => theme.black};
    `}
`;



class Carousel extends Component {
  state = {
    images: [],
    activeIndex: 0,
  };

  componentDidUpdate(prevProps) {
    const { media } = this.props;

    if (prevProps.media !== media) {
      if (media && media.images) {
        this.setState({ images: media.images });
      }
    }
  }

  handleSlideChange = e => {
    const clickedItem = e.target.closest('button');

    this.setState({ activeIndex: clickedItem.dataset.index });
  }

  render() {
    const { images } = this.state;

    return (
      <StyledWrapper>
        <StyledMainImageBox imageUrl={this.state.images[this.state.activeIndex]} />
        <StyledCarouselNav>
          {images && images.map((image, index) => (
            <StyledCarouselNavBtn key={`carousel-nav-item-${index}`} onClick={this.handleSlideChange} onMouseOver={this.handleSlideChange} data-index={index} imageUrl={image} isActive={this.state.activeIndex == index}>
            </StyledCarouselNavBtn>
          ))}
        </StyledCarouselNav>
      </StyledWrapper>
    )
  }
};

export default Carousel; 