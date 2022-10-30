import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import MasterLayout from "./layouts/MasterLayout";

function AdminPrivateRoute (){
    const navigate =useNavigate();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`/api/checkingAuthenticated`).then(res=> {
            if(res.status === 200)
            {
                setAuthenticated(true);
            }
            setLoading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if(err.response.status === 401)
        {
            swal("Unauthorized!!!",err.response.data.message,"warning");
            navigate('/');
        }
        return Promise.reject(err);
    });

    if(loading)
    {
        return <h1>Loading...</h1>
    }

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if(error.response.status === 403) // Access Denied
        {
            swal("Forbidden",error.response.data.message,"warning");
            navigate('/403');
        }
        else if(error.response.status === 404) //Page Not Found
        {
            swal("404 Error","Url/Page Not Found","warning");
            navigate('/404');
        }
        return Promise.reject(error);
    }
  );

    return (
        <Routes>
      <Route
        path="/*"
        name="Admin"
        element={
            Authenticated ? (
            <MasterLayout />
          ) : (
            <Navigate replace to={"login"} />
          )
        }
      />
     </Routes>
    )
}
export default AdminPrivateRoute