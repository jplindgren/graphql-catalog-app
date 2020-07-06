import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import createHistory from './createHistory';

import Home from './HomeView';
import TagView from './TagView';
import ItemCreateView from './ItemCreateView';
import UserRegisterView from './UserRegisterView';
import LoginView from './LoginView';
import { ErrorBoundaryProvider } from '../Contexts/ErrorBoundaryProvider';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    // eslint-disable-next-line arrow-body-style
    render={(props) => {
      return isAuthenticated() ? (
        <ErrorBoundaryProvider>
          <Component {...props} />
        </ErrorBoundaryProvider>
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      );
    }}
  />
);

export default () => (
  <Router history={createHistory}>
    <Switch>
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/tags/view" exact component={TagView} />
      <PrivateRoute path="/items/create" exact component={ItemCreateView} />
      <Route path="/register" exact component={UserRegisterView} />
      <Route path="/login" exact component={LoginView} />
    </Switch>
  </Router>
);
