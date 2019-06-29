import React from "react";
import { connect } from "react-redux";
import { removeFromBasket, changeAmount } from "actions";

const BasketItem = ({
  id,
  name,
  price,
  count,
  removeFromBasket,
  changeAmount
}) => (
    <li>
      <p>
        {name} in basket - {count} - price = {count * price}$
    </p>
      <button onClick={() => removeFromBasket(id)}>remove</button>
      <button onClick={() => changeAmount(id, 1)}>+</button>
      <button onClick={() => changeAmount(id, -1)}>-</button>
    </li>
  );

const mapDispatchToProps = dispatch => ({
  removeFromBasket: id => dispatch(removeFromBasket(id)),
  changeAmount: (id, value) => dispatch(changeAmount(id, value))
});

export default connect(
  null,
  mapDispatchToProps
)(BasketItem);
