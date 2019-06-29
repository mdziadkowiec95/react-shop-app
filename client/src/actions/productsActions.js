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

  const query = category !== 'all' ? category : 'products';

  return axios({
    method: 'GET',
    url: `/api/products`,
    headers: {
      contentType: 'application/json'
    }
  })

    .then(res => {
      const products = res.data
      console.log(res.data);
      dispatch(fetchProductsSuccess(products));
      // const res = json.data[query];

      // setTimeout(
      //   () => ),
      //   500,
      // ); /** setTimeout to simulate loading */
      console.log(products);
      return products;
    })
    .catch(error => dispatch(fetchProductsFailure(error)));
};
