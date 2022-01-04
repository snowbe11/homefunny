import React from "react";
import ReactDOM from "react-dom";
import store from "logic/store";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Bath from "pages/Bath";
import WordTest from "pages/WordTest";
import WordTestHome from "pages/WordTestHome";
import Home from "pages/Home";

import "./index.css";
import WordTestRegist from "pages/WordTestRegist";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/bath" element={<Bath />} />
          <Route path="/wordtest" element={<WordTestHome />} />
          <Route path="/wordtest/regist/" element={<WordTestRegist />} />
          <Route path="/wordtest/regist/:level" element={<WordTestRegist />} />
          <Route path="/wordtest/test/:level" element={<WordTest />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
