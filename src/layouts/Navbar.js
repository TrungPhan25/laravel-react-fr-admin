import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import config from '../config';

const Navbar = () => {
    const navigate =useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`/api/logout`).then(res => {
            if(res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success",res.data.message,"success");             
                navigate(config.login);
                
            }

        });

    }
        const nameUser =localStorage.getItem("auth_name");
        // console.log(localStorage.getItem("auth_name"));
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3" to="/admin">React Ecommerce</Link>

            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>

            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>

            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user fa-fw"></i>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <h2 className="dropdown-item">User: {nameUser}</h2>

                        <li><Link className="dropdown-item" to="#!">Settings</Link></li>
                        <li><Link className="dropdown-item" to="#!">Activity Log</Link></li>

                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" onClick={logoutSubmit} to="#!">Logout</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );

}

export default Navbar;