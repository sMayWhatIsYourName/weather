import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import App from './components/App';
import { store } from './slices/index';
import resources from './locales/index';

const init = () => {
  i18next
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources
    })
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

export default init;