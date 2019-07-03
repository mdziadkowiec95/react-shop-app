import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TextField from 'components/atoms/TextField/TextField';
import SelectField from 'components/atoms/SelectField/SelectField';
import Button from 'components/atoms/Button/Button';
import searchFileIcon from 'assets/icons/serachFileIcon.svg';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 30px auto;
`;

const StyledUploadWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;

  input[type=file] {
    height: 40px;
    position: absolute;
    left: 50%;
    top: 0;
    opacity: 0;
    transform: translateX(-50%);
    max-width: 230px;
}
  }
`;

const StyledUploadBtn = styled(Button)`
  display: block;
  margin: 0 auto 10px auto;
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
      year: '',
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
          <TextField
            onChangeFn={this.handleFieldChange}
            inputName="Name"
            inputValue={this.state.formData.name}
          />
          <TextField
            onChangeFn={this.handleFieldChange}
            inputName="Price"
            inputValue={this.state.formData.price}
          />
          <TextField
            onChangeFn={this.handleFieldChange}
            inputName="Category"
            inputValue={this.state.formData.category}
          />
          <StyledUploadWrapper class="upload-btn-wrapper">
            <StyledUploadBtn secondary>Upload product image</StyledUploadBtn>
            <input
              ref={ref => (this.fileUpload = ref)}
              type="file"
              placeholder="name"
              name="image"
            />
          </StyledUploadWrapper>

          <SelectField 
            onChangeFn={this.handleFieldChange}
            selectName="year" 
            selectPlaceholder="Select production year"
            optionsArr={lastTenYears} 
          />
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
