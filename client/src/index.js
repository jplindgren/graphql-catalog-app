import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import 'semantic-ui-css/semantic.min.css';
import { ApolloProvider } from 'react-apollo';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';

const client = new ApolloClient({
  uri: 'http://localhost:3002/graphql',
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
