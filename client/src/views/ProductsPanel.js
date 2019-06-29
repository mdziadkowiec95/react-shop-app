import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 30px auto;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
`;

/** Generate last ten years array */
const lastTenYears = [];

for (let i = 0; i < 10; i += 1) {
  lastTenYears.push(new Date().getFullYear() - i);
}

class ProductsPanel extends Component {
  state = {
    products: [],
    formData: {
      name: '',
      price: '',
      category: '',
      image: '',
    },
  };

  handleAddProduct = e => {
    e.preventDefault();
    const image = this.fileUpload.files[0];
    console.log(image.type, image);

    const productData = new FormData();

    productData.append('name', this.state.formData.name);
    productData.append('price', this.state.formData.price);
    productData.append('category', this.state.formData.category);
    productData.append('image', this.fileUpload.files[0], this.fileUpload.files[0].name);

    const req = axios({
      method: 'POST',
      url: '/api/products',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      data: productData,
    });

    req.then(res => console.log(res.data)).catch(err => console.log(err));
  };

  handleFieldChange = e => {
    const { target } = e;

    this.setState(state => ({
      formData: {
        ...state.formData,
        [target.name]: target.value,
      },
    }));
  };

  render() {
    return (
      <div>
        <h1>Products panel</h1>
        <StyledForm action="" method="POST">
          <StyledInput
            onChange={this.handleFieldChange}
            type="text"
            placeholder="name"
            name="name"
            value={this.state.formData.name}
          />
          <StyledInput
            onChange={this.handleFieldChange}
            type="text"
            placeholder="name"
            name="price"
            value={this.state.formData.price}
          />
          <StyledInput
            onChange={this.handleFieldChange}
            type="text"
            placeholder="name"
            name="category"
            value={this.state.formData.category}
          />
          <StyledInput
            ref={ref => (this.fileUpload = ref)}
            type="file"
            placeholder="name"
            name="image"
          />
          <select name="year">
            {lastTenYears.map(year => (
              <option value={year}>{year}</option>
            ))}
          </select>
          <textarea name="description" rows="5"></textarea>
          <button type="submit" onClick={this.handleAddProduct}>
            Add product
          </button>
        </StyledForm>
      </div>
    );
  }
}

export default ProductsPanel;
