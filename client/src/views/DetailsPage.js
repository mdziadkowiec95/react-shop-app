import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductDetails as fetchProductDetailsAction } from 'actions/productDetailsActions';
import Carousel from 'components/molecules/Carousel/Carousel';

class DetailsPage extends Component {

  componentDidMount() {
    this.props.fetchProductDetails(this.props.match.params.id);
  }

  render() {
    const { _id, name, price, oldPrice, category, manufacturer, allImages, description, bestFeatures, specifications } = this.props;

    return (
      <div>
        <h1>Details Page</h1>
        <p>{this.props.match.params.id}</p>
        <Carousel media={{
          images: allImages
        }} />
        {/* {allImages && allImages.map(image => <img src={`/${image}`} />)} */}
      </div>
    )
  }
}

const mapStateToProps = ({ productDetails: { product } }) => ({ ...product })
const mapDispatchToProps = dispatch => ({
  fetchProductDetails: (id) => dispatch(fetchProductDetailsAction(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
