import React from "react";
import { Link } from "react-router-dom";

function NavbarAuth () {
  var AuthButtons = '';

  if(window.location.href === "http://localhost:3000/admin/login"){
    AuthButtons =(
      <Link className="nav-link btn btn-success btn-sm text-white " to="/register" >Register</Link>
    )
  }else if (window.location.href === "http://localhost:3000/register")
  {
    AuthButtons =(
      <Link className="nav-link btn btn-success btn-sm text-white " to="/admin/login" >Login</Link>
    )
  }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid"> 
          {AuthButtons}

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> 

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  


            </ul>
       
          </div>
        </div>
      </nav>
    )
}

export default NavbarAuth