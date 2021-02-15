import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/Layout/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import reducer from "./Reducers/index";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
/* All Redux Impor Files */
import { BrowserRouter as Router, Route } from "react-router-dom";
const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
