import React from "react";

import "../assets/css/styles.css";
import "../assets/js/scripts";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PublicRouter from "../routes/PublicRouter";
import { Route,Routes,Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";

function MasterLayout() {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          <main>

            <Routes>

              {PublicRouter.map((route, index) => {
                
                return (
                  <Route key={index} path={route.path} element={<route.component />} />
                );
              })}
              <Route
                path="/"
                element={<Navigate to="/admin/dashboard" replace={true} />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
