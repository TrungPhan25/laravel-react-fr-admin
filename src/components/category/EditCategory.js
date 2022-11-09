import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function EditCategory(){
    const navigate=useNavigate();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);
    const params = useParams();
  
    const updateCategory = (e) => {
        e.preventDefault();
        
        const category_id = params.id;
        const data = categoryInput;
        axios.put(`/api/update-category/${category_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                navigate('/admin/view-category');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('admin/view-category');
            }
        });
    }
    
    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value });
    }
  

    useEffect(() => {
        
        const category_id = params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setCategory(res.data.category);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/admin/view-category');
            }
            setLoading(false);
        });

    }, [params.id]);

    if(loading)
    {
        return <h1>Loading category id</h1>
    } 
    return(
        <div className="container px-4">
        <div className="card mt-4">
            <div className="card-header">
                <h4>Edit Category 
                    <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">BACK</Link>
                </h4>
            </div>
            <div className="card-body">

                <form onSubmit={updateCategory}>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                            <div className="form-group mb-3">
                                <label>Slug</label>
                                <input type="text" name="categorySlug" onChange={handleInput} value={categoryInput.categorySlug} className="form-control" />
                                <small className="text-danger">{error.categorySlug}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Name</label> 
                                <input type="text" name="display" onChange={handleInput} value={categoryInput.display} className="form-control" />
                                <small className="text-danger">{error.display}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label>Status</label>
                                <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} /> Status 0=shown/1=hidden
                            </div>

                        </div>
                        <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">


                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
                </form>

            </div>
        </div>
    </div>
    )
}

export default EditCategory