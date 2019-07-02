import React, { Component } from 'react';

class OrderForm extends Component {
  state = {
    total: 0
  };

  render() {
    return (
      <div>
        <h1>Order Form</h1>
        <form action="">
          <input type="text" />
        </form>
        <div>{this.state.total}</div>
      </div>
    )
  }
};

export default OrderForm;