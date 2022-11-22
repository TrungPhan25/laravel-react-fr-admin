import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";


function ViewBlog(){

    const [viewBlog, setBlog] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let isMounted = true;
        document.title = "View Blog";

            axios.get(`/api/view-blog`).then(res=>{
            
                    if(res.data.status === 200)
                    {
                        setBlog(res.data.blogs);
                        console.log(res.data.blogs);
                        setLoading(false);                   
                    }
            });
    }, []);

    var display_Blogdata = "";

    if(loading)
    {
        return <h4>View Blog Loading...</h4>
    }
    else
    {
        display_Blogdata = viewBlog.map( (item) => {
            
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td><img src={`http://localhost/laravel-react-backend/public/${item.image}`} width="50px" alt={item.title} /></td>
    
                    <td>
                        <Link to={`/admin/edit-blog/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <Link to={`/admin/edit-blog/${item.id}`} className="btn btn-danger btn-sm">Edit</Link>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="container px-4 mt-3">
        <div className="card">
            <div className="card-header">
                <h4>View slider 
                    <Link to="/admin/add-slider" className="btn btn-primary btn-sm float-end">Add Slider</Link>
                </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>title</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Deleted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display_Blogdata}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ViewBlog