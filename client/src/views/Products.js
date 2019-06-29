import React from "react";
import { connect } from "react-redux";
import Card from "components/molecules/Card/Card";
import { fetchProducts } from 'actions/productsActions';
// import ContentTemplate from 'templates/ContentTemplate';
import GridTemplate from 'templates/GridTemplate'

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
    const { products, loading } = this.props;

    return (
      <>
        {loading && <h1>LOADING ...</h1>}
        <h1>Products list</h1>
        <GridTemplate>
          {products.length > 0 &&
            products.map((product, index) => <Card key={product.id} {...product} />)}
        </GridTemplate>
      </>
    );
  }
}

// const mapStateToProps = ({ products }) => ({ products });


const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(Products);
