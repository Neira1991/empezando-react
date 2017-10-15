import http from "http";
import React from 'react';
import { renderToString, renderToStaticMarkup  } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import Pages from './pages/containers/page.jsx'
import Layout from './pages/components/layout.jsx'

import store from './store.js'

function requestHandler(request, response){
  const context = {};
  const html = renderToString(
    <Provider store={store}>
			<StaticRouter location={request.url} context={context}>
				<Pages />
			</StaticRouter>
    </Provider>,
  );

  response.setHeader('Content-Type', 'text/html');
  if (context.url) {response.writeHead(301, {Location: context.url,});response.end();}
  response.write(
    renderToStaticMarkup(
      <Layout
        title="Aplicación"
        content={html}
      />
    )
  );
  response.end();
}

const server = http.createServer(requestHandler);
server.listen(3000);
