import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/LoginPage';
import reportWebVitals from './reportWebVitals';

import {//Esta linea haat la 7 no estaba
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  }, 
 
]);//Se cambio e. componente que se quiere llamar

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RouterProvider router={router} />
 </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
