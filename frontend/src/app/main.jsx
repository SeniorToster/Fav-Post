import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.scss';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { ConfigProvider, theme } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration';
import Layout from '../components/Layout/Layout';
import Error404 from '../pages/Error404';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
