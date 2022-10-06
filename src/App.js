import React from "react";
import MasterLayout from "./layouts/MasterLayout";
import { BrowserRouter as Router, Navigate, Route,Routes } from "react-router-dom";
import axios from "axios";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";


axios.defaults.baseURL ="http://localhost/laravel-react-backend/public";
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
    return (
      <Router>
        <Routes>
        <Route
                path="/"
                element={<Navigate to="/admin/login" replace={true} />}
        />
          <Route path="/admin/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/admin/*" element={<MasterLayout />}></Route>
        </Routes>
      </Router>
    )
}

export default App;
