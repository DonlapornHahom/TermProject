import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Product from './pages/Product';
import Login from './pages/Login';
import Add from './pages/Add';
import Signup from './pages/Signup';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/product/:id",
    element: <Product/>
  },
  {
    path: "/add",
    element: <Add/>
  },
  {
    path: "/signup",
    element:<Signup/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();