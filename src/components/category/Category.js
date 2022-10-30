import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Category(){
    const navigate = useNavigate()

    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        descrip: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            slug:categoryInput.slug,
            name:categoryInput.name,
            description:categoryInput.descrip
        }

         axios.post(`api/store-category`, data).then(res => {
            if(res.data.status === 200)
            {
                //   e.target.reset();
                swal("Success",res.data.message,"success");
                document.getElementById('CATEGORY_FORM').reset();
                navigate("/admin/view-category")

            }
            else if(res.data.status === 400)
            {
                setCategory({...categoryInput, error_list: res.data.errors});
            }
        });

    }

    var display_errors = [];
    if(categoryInput.error_list)
    {
        display_errors = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
        ]
    }
    return (
        <div className="container-fluid px-4">

        <div className="card mt-4">
            <div className="card-header">
                <h4>Add Category 
                    <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">View Category</Link>
                </h4>
                {
                    display_errors.map( (item) => {
                    return( <p className="mb-1" key={item}>{item}</p>)
                    })
                }

            </div>
            <div className="card-body">

                <form onSubmit={submitCategory} id="CATEGORY_FORM">
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
                                <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                                <span>{categoryInput.error_list.slug}</span>
                    
                            </div>
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleInput} value={categoryInput.name}className="form-control" />
                                <span>{categoryInput.error_list.name}</span>

                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea name="descrip" onChange={handleInput} value={categoryInput.descrip} className="form-control"></textarea>
                            </div>


                            

                        </div>
                        <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">

                            
                            {/* <div className="form-group mb-3">
                                <label>Meta Keywords</label>
                                <textarea name="meta_keyword"  className="form-control"></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label>Meta Description</label>
                                <textarea name="meta_descrip"  className="form-control"></textarea>
                            </div> */}

                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                </form>

            </div>
        </div>
    </div>
    )
}
export default Category