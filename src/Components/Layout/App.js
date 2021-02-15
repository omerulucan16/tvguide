import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Partials/Footer";
import Header from "../Partials/Header";
import Home from "../Home/index";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Header />
      <Route path="/:date?" exact component={Home} />
      <Route path="/tv-guide/:date" exact component={Home} />
      <Footer />
    </div>
  );
};
export default App;
