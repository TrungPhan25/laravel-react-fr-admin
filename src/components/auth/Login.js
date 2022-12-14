import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAuth from "./NavbarAuth";
import swal from "sweetalert";
import axios from "axios";

function Login(){
    const navigate=useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login',data).then(res =>{
                
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);

                    if(res.data.role === 'admin'){
                        swal("Success",res.data.message,"success");
                        navigate("/admin")
                    }else{
                        swal({
                            title: "Account not admin",
                            text: "Please to other page!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          });
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('auth_name');
                        navigate("/")
                    }
                }
                else if (res.data.status === 401) {
                    swal("Warning",res.data.message,"warning");
                }else{
                    setLogin({...loginInput, error_list: res.data.validation_errors });
                }
            });
        });

    }

    return (
//         <div>
//         <NavbarAuth />
//     <div className="container py-5">
//         <div className="row justify-content-center">
//             <div className="col-md-6">
//                 <div className="card">
//                     <div className="card-header">
//                         <h4>Login</h4>
//                     </div>
//                     <div className="card-body">
//                         <form onSubmit={loginSubmit}>
//                             <div className="form-group mb-3">
//                                 <label>Email ID</label>
//                                 <input type="text" name="email" onChange={handleInput} value={loginInput.email} className="form-control"  />
//                                 <span>{loginInput.error_list.email}</span>
//                             </div>
//                             <div className="form-group mb-3">
//                                 <label>Password</label>
//                                 <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control"  />
//                                 <span>{loginInput.error_list.password}</span>
//                             </div>
//                             <div className="form-group mb-3">
//                                 <button type="submit" className="btn btn-primary">Login</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
<div>
<NavbarAuth />
<div className="container py-5">
<div className="row justify-content-center">
    <div className="col-md-6">
        <div className="card">
            <div className="card-header">
                <h4>Login</h4>
            </div>
            <div className="card-body">
                <form onSubmit={loginSubmit}>
                   
                    <div className="form-group mb-3">
                        <label>Email ID</label>
                        <input type="text" name="email" onChange={handleInput} value={loginInput.email} className="form-control"  />
                        <span>{loginInput.error_list.email}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Password</label>
                        <input type="password" name="password" onChange={handleInput} value={loginInput.password}className="form-control"  />
                        <span>{loginInput.error_list.password}</span>
                    </div>
                  
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
</div>
    )
}
export default Login    