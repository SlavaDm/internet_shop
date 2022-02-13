import React from 'react';

import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import { store } from '../redux/index';

import NavBar from '../components/NavBar';
import SimpleBackdrop from '../components/SimpleBackdrop';
import AuthProvider from '../components/AuthProvider/AuthProvide';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SimpleBackdrop>
          <NavBar />
          <Component {...pageProps} />
        </SimpleBackdrop>
      </AuthProvider>
    </Provider>
  );
}

export default React.memo(MyApp);
