import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Error from '../src/Extra/Error.jsx';
import { Contact, Category, ProductDetails } from './components';
import { Auth0Provider } from '@auth0/auth0-react';
import Index from './Pages/Index.jsx';
import store from "./store/store.js";
import { Provider } from 'react-redux';
import Profile from './Pages/Profile.jsx';
import Checkout from './Pages/Checkout.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import conf from './conf/conf.js';
import CartPage from './Pages/CartPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/profile",
        element: 
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
      },
      {
        path: "/category",
        element: <Category />,
        loader: async () => {
          try {
              const response = await fetch('https://fakestoreapi.com/products');
              const json = await response.json();
              return json;
          } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
          }
        },
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={conf.authdomain}
        clientId={conf.authclient}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
      <RouterProvider router={router}/> 
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
