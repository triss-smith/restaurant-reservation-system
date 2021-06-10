import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid grey lighten-4">
      <div className="row">
        <div className="col-md-2 side-bar h-100 h-auto">
          <Menu />
        </div>
        <div className="col-md">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
