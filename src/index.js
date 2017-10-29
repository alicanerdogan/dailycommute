import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import './index.scss';

import App from './App';
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ reducer }),
  composeEnhancers(applyMiddleware(thunkMiddleware, storePreferences))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

function storePreferences() {
  return next => action => {
    const returnValue = next(action);
    if (action.type === 'STORE_PREFERENCES') {
      const { home, work } = action.payload;
      localStorage.setItem('HOME', JSON.stringify(home));
      localStorage.setItem('WORK', JSON.stringify(work));
    }
    return returnValue;
  };
}
