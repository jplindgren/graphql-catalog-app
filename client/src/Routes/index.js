import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './HomeView';
import TagView from './TagView';
import ItemCreateView from './ItemCreateView';

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tags/view" exact component={TagView} />
      <Route path="/items/create" exact component={ItemCreateView} />
    </Switch>
  </Router>
);
