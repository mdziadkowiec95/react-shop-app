export const addToBasket = (id, name, price) => ({
  type: 'ADD_TO_BASKET',
  payload: {
    id,
    name,
    price,
  },
});

export const removeFromBasket = id => ({
  type: 'REMOVE_FROM_BASKET',
  payload: {
    id,
  },
});

export const changeAmount = (id, value) => ({
  type: 'CHANGE_AMOUNT',
  payload: {
    id,
    value,
  },
});
