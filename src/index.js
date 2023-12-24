// Import necessary libraries and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import store from './redux/store';
import withLazy from './components/common/reuseable/LoadingSpinner';

// Create a root for ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a component that lazily loads the main App component
const LazyApp = withLazy(() => import('./App'));

// Function to render the app
const renderApp = () => {
  root.render(
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <LazyApp />
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
};

// Check if the browser supports the service worker and the beforeinstallprompt event
if ('serviceWorker' in navigator && 'beforeinstallprompt' in window) {
  // Add an event listener to capture the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior to avoid showing the browser's install prompt
    event.preventDefault();

    // Show a custom install button or UI
    // You can customize this according to your design
    const installButton = document.createElement('button');
    installButton.textContent = 'Install CVS - Recycling';
    installButton.addEventListener('click', () => {
      // Trigger the install prompt when the custom button is clicked
      event.prompt();
    });

    // Add the install button to your HTML
    document.body.appendChild(installButton);
  });
}

// Register the service worker and render the app
serviceWorkerRegistration.register();
renderApp();
