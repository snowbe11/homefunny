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
          <Route path="/homefunny/bath" element={<Bath />} />
          <Route path="/homefunny/wordtest" element={<WordTestHome />} />
          <Route
            path="/homefunny/wordtest/regist/"
            element={<WordTestRegist />}
          />
          <Route
            path="/homefunny/wordtest/regist/:level"
            element={<WordTestRegist />}
          />
          <Route
            path="/homefunny/wordtest/test/:level"
            element={<WordTest />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
