import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Routes from '@/routes';
import store from '@/stores';

// import DevTools from 'mobx-react-devtools';

// import { bodyAddLanguage } from '$helpers/i18n';

// global style
import 'normalize.css';
import '@/styles/index.less';

// i18n
// bodyAddLanguage();

const MOUNT_NODE = document.getElementById('root');

render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes />
    </Provider>
  </BrowserRouter>,
  MOUNT_NODE
);
