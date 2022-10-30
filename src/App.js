import React from "react";
import { BrowserRouter as Router, Navigate, Route,Routes } from "react-router-dom";
import axios from "axios";
import MasterLayout from "./layouts/MasterLayout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminPrivateRoute from "./AdminPrivateRoute"
import config from "./config/index"
import Home from "./components/auth/Home";
import Page403 from "./errors/Page403";
import Page404 from "./errors/Page404";

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
                element={<Navigate to="/login" replace={true} />}
        />
        <Route path="/403" element={<Page404 />}/>   
      <Route path="/404" element={<Page403 />}/>   

        <Route path={config.login} element={localStorage.getItem('auth_token') ? <Navigate to={config.dashboard} /> : <Login />}></Route>
        <Route path={config.register} element={localStorage.getItem('auth_token') ? <Navigate to={config.dashboard}  /> : <Register />}></Route>
        <Route path="/home" element={ <Home />}></Route>

          {/* <Route path="/admin/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route> */}

          {/* <Route path="/admin/*" element={<MasterLayout />}></Route> */}
          <Route path="/admin/*" element={<AdminPrivateRoute />}/>

        </Routes>
      </Router>
    )
}

export default App;
