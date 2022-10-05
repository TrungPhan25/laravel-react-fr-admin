import React from "react";
import { Link } from "react-router-dom";

function NavbarAuth () {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid"> 

          <Link className="nav-link btn btn-success btn-sm text-white " to="/admin/login" >LOGIN</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> 

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Collection</Link>
              </li> */}

          
            </ul>
       
          </div>
        </div>
      </nav>
    )
}

export default NavbarAuth