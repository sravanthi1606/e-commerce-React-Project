import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js";
import App from './App';
import store from './Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistStore } from 'redux-persist';
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </PersistGate>

  </Provider>

);

