import React from "react";
import MasterLayout from "./layouts/MasterLayout";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
    return (
      <Router>
        <Routes>

          <Route path="/admin/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/admin/*" element={<MasterLayout />}></Route>
        </Routes>
      </Router>
    )
}

export default App;
