import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { loadGroups } from './actions/groupActions'

const store = configureStore();
store.dispatch(loadGroups())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();