import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TextField from 'components/atoms/TextField/TextField';
import SelectField from 'components/atoms/SelectField/SelectField';
import Button from 'components/atoms/Button/Button';
import productCategories from 'data/productCategories';
import ProductAddList from 'components/molecules/ProductAddList/ProductAddList';

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
    descriptionCurValue: '',
    formData: {
      name: '',
      price: '',
      oldPrice: '',
      category: '',
      description: [], // Array of strings/paragraphs
      bestFeatures: [
        {
          key: 1562275125125616,
          value: "ome text",
          label: "First"
        },
        {
          key: 156227512412616,
          value: "ome text",
          label: "Second"
        },
        {
          key: 156227562116,
          value: "Some text",
          label: "Third"
        }
      ], // Array pairs ex. ['Label', 'some feature text']
      specifications: [], // Array pairs ex. ['Label', 'some specification text']
    },
  };

  handleAddProduct = e => {
    e.preventDefault();

    const productData = new FormData();

    // productData.append('name', this.state.formData.name);
    // productData.append('price', this.state.formData.price);
    // productData.append('oldPrice', this.state.formData.oldPrice);
    // productData.append('category', this.state.formData.category);
    // productData.append('description', JSON.stringify(this.state.formData.description));
    // productData.append('bestFeatures', JSON.stringify(this.state.formData.bestFeatures));
    // productData.append('specifications', JSON.stringify(this.state.formData.specifications));


    // Object.keys(this.state.formData)
    for (const prop in this.state.formData) {
      if (Array.isArray(this.state.formData[prop])) {
        productData.append(prop, JSON.stringify(this.state.formData[prop]));
      } else {
        productData.append(prop, this.state.formData[prop]);
      }
    }

    const productImages = this.productImagesUpload.files;

    // Add images to FormData object
    for (let i = 0; i < productImages.length; i++) {
      const imageFile = productImages[i];

      productData.append('product_images', imageFile, imageFile.name);
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
        <h1>Products panel</h1>
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

          <SelectField
            onChangeFn={this.handleFieldChange}
            selectName="category"
            selectPlaceholder="Select product category"
            optionsArr={productCategories}
          />

          <StyledUploadWrapper>
            <StyledUploadBtn secondary>Upload product images (max 3)</StyledUploadBtn>
            <input
              ref={ref => (this.productImagesUpload = ref)}
              type="file"
              placeholder="name"
              name="product_images"
              multiple
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
