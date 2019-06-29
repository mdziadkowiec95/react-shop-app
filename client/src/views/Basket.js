import React from "react";
import { connect } from "react-redux";
import BasketItem from "components/molecules/BasketItem/BasketItem";


const Basket = ({ basketItems }) => (
  <div>
    <ul>
      {basketItems.length > 0 &&
        basketItems.map(item => (
          <BasketItem key={`${item.name}-${item.id}`} {...item} />
        ))}
    </ul>
  </div>
);

const mapStateToProps = ({ basket }) => ({ basketItems: basket.items });

export default connect(mapStateToProps)(Basket);

