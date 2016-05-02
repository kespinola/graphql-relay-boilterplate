import React from 'react';
import Relay from 'react-relay';
import aws4 from 'aws4';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import Router from './routes.jsx';

import { reducer, saga } from './modules';

const { headers } =
  aws4.sign(
    { service: process.env.AWS_SERVICE, region: process.env.AWS_REGION },
    { accessKeyId: process.env.AWS_ACCESS_ID, secretAccessKey: process.env.AWS_ACCESS_SECRET }
  );
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(`${process.env.SERVERLESS_URL}/graphql`, {
    headers,
  })
);

const sagaMiddleware = createSagaMiddleware(saga);

const reduxRouterMiddleware = syncHistory(browserHistory);

const store = createStore(
  reducer,
  {},
  applyMiddleware(
    createLogger({ collapsed: true }),
    reduxRouterMiddleware,
    sagaMiddleware
  )
);

reduxRouterMiddleware.listenForReplays(store);

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
