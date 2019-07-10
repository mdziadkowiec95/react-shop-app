import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TextField from 'components/atoms/TextField/TextField';
import SelectField from 'components/atoms/SelectField/SelectField';
import Button from 'components/atoms/Button/Button';
import productCategories from 'data/productCategories';
import ProductAddList from 'components/molecules/ProductAddList/ProductAddList';
import Heading from 'components/atoms/Heading/Heading';

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
`;

const StyledUploadBtn = styled(Button)`
  display: block;
  margin: 0 auto 10px auto;
`;


class ProductsPanel extends Component {
  state = {
    products: [],
    formData: {
      name: '',
      price: '',
      oldPrice: '',
      category: '',
      manufacturer: '',
      description: [], // Array of strings/paragraphs
      bestFeatures: [], // Array pairs ex. ['Label', 'some feature text']
      specifications: [], // Array pairs ex. ['Label', 'some specification text']
    },
  };

  handleAddProduct = e => {
    e.preventDefault();

    const { formData } = this.state;

    const productData = new FormData();

    // append formData from component state to FormData object
    for (const prop in formData) {
      if (formData.hasOwnProperty(prop)) {
        if (Array.isArray(formData[prop])) {
          productData.append(prop, JSON.stringify(formData[prop]));
        } else {
          productData.append(prop, formData[prop]);
        }
      }
    }

    productData.append('productMainImage', this.productMainImageUpload.files[0]);

    // Append images to FormData object
    const productMoreImages = this.productMoreImagesUpload.files;

    for (let i = 0; i < productMoreImages.length; i++) {
      const imageFile = productMoreImages[i];

      productData.append('productMoreImages', imageFile, imageFile.name);
    }

    const req = axios({
      method: 'POST',
      url: '/api/products',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: productData
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

  handleFileInputChange = e => {
    console.log(e.target.files);
  }

  handleAddItem = (listType, value, label) => {
    const newItem = {
      key: Date.now(),
      value
    };

    if (label) newItem.label = label;

    this.setState(state => ({
      formData: {
        ...state.formData,
        [listType]: [...state.formData[listType], newItem]
      }
    }));
  }

  handleRemoveItem = (e, listType, key) => {
    e.preventDefault();

    this.setState(state => ({
      formData: {
        ...state.formData,
        [listType]: state.formData[listType].filter(item => item.key !== key)
      }
    }))
  }

  render() {
    return (
      <div>
        <Heading>Products panel</Heading>
        <StyledForm action="" method="POST">
          <TextField
            onChangeFn={this.handleFieldChange}
            inputName="name"
            inputPlaceholder="Name"
            inputValue={this.state.formData.name}
          />
          <TextField
            onChangeFn={this.handleFieldChange}
            inputName="price"
            inputPlaceholder="Price"
            inputValue={this.state.formData.price}
          />
          <TextField
            onChangeFn={this.handleFieldChange}
            inputName="oldPrice"
            inputPlaceholder="Old Price"
            inputValue={this.state.formData.oldPrice}
          />
          <TextField
            onChangeFn={this.handleFieldChange}
            inputName="manufacturer"
            inputPlaceholder="Manufacturer"
            inputValue={this.state.formData.manufacturer}
          />

          <SelectField
            onChangeFn={this.handleFieldChange}
            selectName="category"
            selectPlaceholder="Select product category"
            optionsArr={productCategories}
          />

          <StyledUploadWrapper>
            <StyledUploadBtn secondary>Upload product main image</StyledUploadBtn>
            <input
              ref={ref => (this.productMainImageUpload = ref)}
              type="file"
              name="productMainImage"
              onChange={this.handleFileInputChange}
            />
          </StyledUploadWrapper>

          <StyledUploadWrapper>
            <StyledUploadBtn secondary>Upload product images (max 3)</StyledUploadBtn>
            <input
              ref={ref => (this.productMoreImagesUpload = ref)}
              type="file"
              name="productMoreImages"
              multiple
              onChange={this.handleFileInputChange}
            />
          </StyledUploadWrapper>

          <ProductAddList
            headingText="Best features"
            listType="bestFeatures"
            items={this.state.formData.bestFeatures}
            addItemFn={this.handleAddItem}
            removeItemFn={this.handleRemoveItem}
          />

          <ProductAddList
            headingText="Specification data"
            listType="specifications"
            items={this.state.formData.specifications}
            addItemFn={this.handleAddItem}
            removeItemFn={this.handleRemoveItem}
          />

          <ProductAddList
            headingText="Description"
            listType="description"
            items={this.state.formData.description}
            addItemFn={this.handleAddItem}
            removeItemFn={this.handleRemoveItem}
          />
          <button type="submit" onClick={this.handleAddProduct}>
            Add product
          </button>
        </StyledForm>
      </div>
    );
  }
}

export default ProductsPanel;
