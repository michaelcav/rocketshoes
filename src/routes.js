import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';

import React from 'react';

// import { Container } from './styles';

function Routes() {
  return (
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" component={Cart} />
      </Switch>
  );
}

export default Routes;