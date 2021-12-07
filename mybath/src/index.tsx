import React from "react";
import ReactDOM from "react-dom";
import Bath from "component/Bath";
import "./index.css";
import store from "logic/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Bath />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
