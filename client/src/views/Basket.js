import React from 'react';
import { connect } from 'react-redux';
import BasketTable from 'components/molecules/BasketTable/BasketTable';
import ContentTemplate from 'templates/ContentTemplate';

const Basket = ({ basketItems }) => (
  <ContentTemplate>
    <div>
      <h2>Your basket</h2>
      <BasketTable items={basketItems} />
    </div>
  </ContentTemplate>

);

const mapStateToProps = ({ basket }) => ({ basketItems: basket.items });

export default connect(mapStateToProps)(Basket);
