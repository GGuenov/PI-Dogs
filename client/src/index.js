import React from "react";
//import createRoot from "react-dom/client";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import "./index.module.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import axios from "axios";

axios.defaults.baseURL = `http://localhost:3001`;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
