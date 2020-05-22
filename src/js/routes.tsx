import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router';
import AppComponent from 'js/containers/App';

import { HashRouter } from 'react-router-dom';

const Router: FunctionComponent = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={AppComponent} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
