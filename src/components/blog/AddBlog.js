import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function AddBlog(){
    const navigate = useNavigate()

    const [blogInput, setBlog] = useState({
        title: '',
        title_blog: '',
    });

    const handleInput = (e) => {
        e.persist();
        setBlog({...blogInput, [e.target.name]:e.target.value });
    }

   const [addDescription,setDescription]=useState("");

   const handleChange =(e,editor)=>{
    const data = editor.getData();
    setDescription(data)
   }


   const [pricture, setPicture] = useState([]);
   const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
    }

    const [pricture1, setPicture1] = useState([]);
   const handleImage1 = (e) => {
    setPicture1({ slider: e.target.files[0] });
    }
   const submitBlog = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', blogInput.title);
    formData.append('title_blog', blogInput.title_blog);
    formData.append('description', addDescription);
    formData.append('image', pricture.image);
    formData.append('slider', pricture1.slider);
    
    axios.post(`/api/store-blog`, formData).then(res=>{
        if(res.data.status === 200)
        {
            // swal("Success",res.data.message,"success");
            console.log('thanh cong');
            swal("Success",res.data.massage,"success");
            navigate("/admin/view-blog")
        
            
            // setError([]);
        }
        else if(res.data.status === 422)
        {
            swal("error",res.data.massage,"error");
            console.log('that bai');
        }
    });
}


    return (
        <div className="container-fluid px-4">
        <div className="card mt-4">
            <div className="card-header">
                <h4>Add Blog
                    <Link to="/admin/view-blog" className="btn btn-primary btn-sm float-end">View Blog</Link>
                </h4>
            </div>
            <div className="card-body">
                <form   onSubmit={submitBlog}  method="post" enctype="multipart/form-data">

                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                    
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            
                            
                            <div className="form-group mb-3">
                                    <label>Title</label>
                                    <input type="text" name="title" onChange={handleInput} value={blogInput.title} className="form-control" />
                                    <small className="text-danger"></small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Title Blog</label>
                                    <input type="text" name="title_blog" onChange={handleInput} value={blogInput.title_blog}   className="form-control" />
                                    <small className="text-danger"></small>
                                </div>
                               
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data={addDescription} 
                                        onChange={handleChange}
                                    />
                                    {/* <textarea name="description" onChange={handleInput} value={blogInput.description}   className="form-control"></textarea> */}
                                </div>
                                <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImage}  className="form-control" />
                                        {/* <small className="text-danger">{errorlist.image02}</small> */}
                                    </div>

                                    <div className="col-md-8 form-group mb-3">
                                        <label>Slider</label>
                                        <input type="file" name="slider" onChange={handleImage1}  className="form-control" />
                                        {/* <small className="text-danger">{errorlist.image02}</small> */}
                                    </div>
                                {/* <div className="form-group mb-3">
                                    <label>Path</label>
                                        <input type="text" name="slug"  className="form-control" />
                                    <small className="text-danger"></small>
                                </div> */}
                               
                        </div>
                      
                        
                    </div>
                    <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>

                </form>
            </div>
        </div>
    </div>
    )
}
export default AddBlog