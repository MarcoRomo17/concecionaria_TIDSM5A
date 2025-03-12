import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/LoginPage';
import reportWebVitals from './reportWebVitals';
import RegistroUsuario from './app/RegisterUser';
import Dashboard from "./app/Dashboard";

import {//Esta linea haat la 7 no estaba
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterCar from './app/Registercar';
import CarList from './app/CarList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  }, 
  {
    path:"/RegisterUser",
    element:<RegistroUsuario/>
  },
  {
    path: "/dashboard",  // Agregar la ruta del Dashboard
    element: <Dashboard />,
  },
  {
    path: "/RegisterCar",  
    element: <RegisterCar/>,
  },
  {
    path: "/cars",  
    element: <CarList/>,
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
