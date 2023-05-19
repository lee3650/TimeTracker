import './components/fonts.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Homepage } from './components/home';
import ViewPage from './components/ViewPage';
import ExamplePage from './components/ExamplePage';
import ErrorPage from './components/errorpage';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Homepage/>, 
    errorElement: <ErrorPage/>, 
  }, 
  {
    path: "/example", 
    element: <ExamplePage/>, 
  }, 
  {
    path: "/view", 
    element: <ViewPage/>, 
  }
]); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
