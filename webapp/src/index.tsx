import React from "react";
import ReactDOM from "react-dom";
import store from "logic/store";
import { Provider } from "react-redux";
import { Route, Router, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Bath from "pages/Bath";
import WordTest from "pages/WordTest";
import Home from "pages/Home";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/bath" element={<Bath />} />
          <Route path="/wordtest" element={<WordTest />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
