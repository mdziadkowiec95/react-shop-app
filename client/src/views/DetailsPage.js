import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductDetails as fetchProductDetailsAction } from 'actions/productDetailsActions';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import ContentTemplate from 'templates/ContentTemplate';
import Carousel from 'components/molecules/Carousel/Carousel';
import SpecificationTable from 'components/molecules/SpecificationTable/SpecificationTable';


import { specifications as secificationsTEST } from 'placeholderData/productDetails';


const StyledWrapper = styled.div`
  padding: 10rem 0;
`;

const StyledCarousel = styled(Carousel)`
  width: 300px;
  /* box-shadow: 0 0 10px ${({ theme }) => theme.grey200};  */
`;

const StyledCarouselWrapper = styled.div`
  display: inline-block;
  margin-bottom: 2rem;
  border-radius: 5px;
  /* box-shadow: 0 0 5px ${({ theme }) => theme.grey200};  */
`;

class DetailsPage extends Component {

  componentDidMount() {
    this.props.fetchProductDetails(this.props.match.params.id);
  }

  render() {
    const { _id, name, price, oldPrice, category, manufacturer, allImages, description, bestFeatures, specifications } = this.props;

    return (
      <ContentTemplate>
        <StyledWrapper>
          <Heading>{name}</Heading>
          <StyledCarouselWrapper>
            <Carousel media={{
              images: allImages
            }} />
          </StyledCarouselWrapper>
          <SpecificationTable items={secificationsTEST} />
          {/* {allImages && allImages.map(image => <img src={`/${image}`} />)} */}
        </StyledWrapper>
      </ContentTemplate>
    )
  }
}

const mapStateToProps = ({ productDetails: { product } }) => ({ ...product })
const mapDispatchToProps = dispatch => ({
  fetchProductDetails: (id) => dispatch(fetchProductDetailsAction(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
