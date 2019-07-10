import React from 'react';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import { fetchProducts } from 'actions/productsActions';
import GridTemplate from 'templates/GridTemplate';
import Heading from 'components/atoms/Heading/Heading';

class Products extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts(this.props.match.params.category));
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.props.dispatch(fetchProducts(this.props.match.params.category));
    }
  }

  render() {
    const { products, loading, match } = this.props;

    const cat = match.params.category;
    const formatedCategoryName = cat.substr(0, 1).toUpperCase() + cat.substr(1);

    return (
      <>
        {loading && <h1>LOADING ...</h1>}
        <Heading>{formatedCategoryName}</Heading>
        <GridTemplate>
          {products.length > 0 &&
            products.map((product, index) => <Card key={product._id} {...product} />)}
        </GridTemplate>
      </>
    );
  }
}

// const mapStateToProps = ({ products }) => ({ products });

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error,
});

export default connect(mapStateToProps)(Products);
