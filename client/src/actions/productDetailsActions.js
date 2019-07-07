import axios from 'axios';

export const FETCH_PRODUCT_DETAILS_BEGIN = 'FETCH_PRODUCT_DETAILS_BEGIN';
export const FETCH_PRODUCT_DETAILS_SUCCESS = 'FETCH_PRODUCT_DETAILS_SUCCESS';
export const FETCH_PRODUCT_DETAILS_FAILURE = 'FETCH_PRODUCT_DETAILS_FAILURE';

export const fetchProductDetailsBegin = () => ({
  type: FETCH_PRODUCT_DETAILS_BEGIN,
});

export const fetchProductDetailsSuccess = product => ({
  type: FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: { product },
});

export const fetchProductDetailsFailure = error => ({
  type: FETCH_PRODUCT_DETAILS_FAILURE,
  payload: { error },
});

export const fetchProductDetails = id => dispatch => {
  dispatch(fetchProductDetailsBegin());

  const reqConfig = {
    headers: {
      contentType: 'application/json',
    }
  };

  return axios.get(`/api/product/${id}`, reqConfig)
    .then(res => {
      const { fetchedProduct } = res.data;

      dispatch(fetchProductDetailsSuccess(fetchedProduct));

      console.log(fetchedProduct);

      return fetchedProduct;
    })
    .catch(error => dispatch(fetchProductDetailsFailure(error)));
};
