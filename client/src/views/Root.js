import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Products from 'views/Products';
import Basket from 'views/Basket';
import Landing from 'views/Landing';
import DetailsPage from 'views/DetailsPage';
import ProductsPanel from 'views/ProductsPanel';
import { Provider } from 'react-redux';
import store from 'store';
import routes from 'routes';
import MainTemplate from 'templates/MainTemplate';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.landing} component={Landing} />
          <Route exact path={routes.products} render={() => <Redirect to={routes.productsAll} />} />
          <Route exact path={routes.productsCategory} component={Products} />
          <Route path={routes.productDetailPage} component={DetailsPage} />
          <Route path={routes.productsPanel} component={ProductsPanel} />
          <Route path="/basket" component={Basket} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
