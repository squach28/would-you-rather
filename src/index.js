import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import History from './components/History';
import { auth, db } from './firebase'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App auth={auth} db={db} />,
    errorElement: <ErrorPage />
  },
  {
    path: '/:uid/history',
    element: <History auth={auth} db={db} />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
