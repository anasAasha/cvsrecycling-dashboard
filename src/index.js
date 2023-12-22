import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BiLoaderAlt } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import { AuthProvider } from './context/AuthContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = lazy(() => import('./App'));

const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
    }}
  >
    <BiLoaderAlt
      style={{
        animation: 'rotate 1s linear infinite',
        fontSize: '3rem',
      }}
    />
    <style>
      {`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
  </div>
);

const AppWithLazy = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <App />
  </Suspense>
);
root.render(
  <Provider store={store}>
    <AuthProvider>
      {""}
      <BrowserRouter>
        <AppWithLazy />
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);

serviceWorkerRegistration.register();
