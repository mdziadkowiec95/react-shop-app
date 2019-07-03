import axios from 'axios';

export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products },
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error },
});

export const fetchProducts = category => dispatch => {
  dispatch(fetchProductsBegin());

  const isNotSpecificCategory = category !== 'all';

  const reqUrl = isNotSpecificCategory ? `/api/products/category` : '/api/products';

  const reqConfig = {
    headers: {
      contentType: 'application/json',
    }
  };

  if (isNotSpecificCategory) reqConfig.params = { category };

  return axios.get(reqUrl, reqConfig)
    .then(res => {
      const { fetchedProducts } = res.data;

      dispatch(fetchProductsSuccess(fetchedProducts));

      return fetchedProducts;
    })
    .catch(error => dispatch(fetchProductsFailure(error)));
};
