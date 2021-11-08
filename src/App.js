import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ViewPage from "./pages/ViewPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditPage from "./pages/AddEditPage";
import Header from "./components/layout/Header";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        < ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/add" component={AddEditPage} />
          <Route path="/update/:id" component={AddEditPage} />
          <Route path="/view/:id" component={ViewPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
