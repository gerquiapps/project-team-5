import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './state/store';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
/* Theme
* Fluent UI
* + Tutorial https://github.com/microsoft/fluentui/wiki/Getting-Started-with-UI-Fabric
* + Dise;o de componentes https://github.com/microsoft/fluentui/wiki/Component-Design
*/
import { ThemeProvider } from '@fluentui/react';

import myTheme from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider applyTo="body" theme={myTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
