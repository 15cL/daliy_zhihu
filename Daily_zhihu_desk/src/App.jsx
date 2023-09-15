import React from "react";
import Router from "./router/index";

import { HashRouter } from "react-router-dom";

import { KeepAliveProvider } from "keepalive-react-component";
const App = function () {
  return (
    <HashRouter>
      <KeepAliveProvider>
        <Router></Router>
      </KeepAliveProvider>
    </HashRouter>
  );
};

export default App;
