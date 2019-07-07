import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';



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
  background: ${({ imageUrl }) => `url(/${imageUrl})`} no-repeat center / contain; 
`;

const StyledCarouselNav = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.white};
`;

const StyledCarouselNavBtn = styled.button`
    height: 150px;
    background: transparent;
    cursor: pointer;
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

  handleImageClick = e => {
    const clickedImageIndex = e.target.closest('button').dataset.index;

    this.setState({ activeIndex: clickedImageIndex });
  }

  render() {
    const { images } = this.state;

    return (
      <StyledWrapper>
        <StyledMainImageBox imageUrl={this.state.images[this.state.activeIndex]} />
        <StyledCarouselNav>
          {images && images.map((image, index) => (
            <StyledCarouselNavBtn onClick={this.handleImageClick} data-index={index}>
              <img src={`/${image}`} alt="" />
            </StyledCarouselNavBtn>
          ))}
        </StyledCarouselNav>
      </StyledWrapper>
    )
  }
};

export default Carousel; 