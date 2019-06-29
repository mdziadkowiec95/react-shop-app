import React, { Component } from 'react';

// const Landing = () => (
//   <div>
//     <h1>Landing view</h1>
//   </div>
// );

import axios from 'axios';

class Landing extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const products = axios.get('api/products');

    products.then(res => this.setState({ products: res.data })).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.products && this.state.products.map(product => <h1>{product.name}</h1>)}
      </div>
    )
  }
}

export default Landing;


