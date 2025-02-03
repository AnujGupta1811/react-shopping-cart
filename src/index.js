import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './Shoping_cart/css/style.css';
import './Shoping_cart/css/style.min.css';
//import App from './token_login/Token_auth';
//import App from './Blog/Route/Route';
//import App from './Shoping_cart/Index';
import App from './Shoping_cart/Route/Route';
//import App from './App';
import reportWebVitals from './reportWebVitals';
const clientId = "883164262568-8hk6k03dbhop2kvuvrr3quk475g76ej6.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>,
  </BrowserRouter>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
