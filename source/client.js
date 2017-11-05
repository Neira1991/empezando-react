import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


import Pages from './pages/containers/page.jsx';
import store from './store.js'
render(
  <Provider store={store}>
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  </Provider>,
  document.getElementById('render-target'),
)
