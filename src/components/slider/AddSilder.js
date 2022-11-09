import React, { useState } from "react";
import { Link } from "react-router-dom";
function AddSlider(){
    const [errorlist, setError] = useState([]);
    const [productInput, setProduct] = useState({
        title: '',
        description: '',
        color: '',
    });
    const [pricture, setPicture] = useState([]);
    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]:e.target.value });
    }
    const handleImage = (e) => {
        setPicture({ img: e.target.files[0] });
    }
    // const submitSlider = (e) => {
    //     e.preventDefault();
        
    //     const formData = new FormData();
    //     formData.append('img', pricture.img);

    //     formData.append('title', productInput.title);
    //     formData.append('description', productInput.description);
    //     formData.append('color', productInput.color);
        
    //     axios.post(`/api/store-slider`, formData).then(res=>{
    //         if(res.data.status === 200)
    //         {
    //             // swal("Success",res.data.message,"success");
    //             console.log('thanh cong');
    //             swal("Success",res.data.massage,"success");
            
    //             setProduct({...productInput, 
    //                 categorySlug: '',
    //                 slug: '',
    //                 title: '',
    //                 description: '',
    //                 selling_price: '',
    //                 original_price: '',
    //                 qty: '',
    //             });
    //             setError([]);
    //         }
    //         else if(res.data.status === 422)
    //         {
    //             swal("All Fields are mandetor","","error");
    //             console.log(selectedValue);
    //             setError(res.data.errors);
    //         }
    //     });
    // }

    return(
        <div className="container-fluid px-4">
        <div className="card mt-4">
            <div className="card-header">
                <h4>Add Slider
                    <Link to="/admin/view-slider" className="btn btn-primary btn-sm float-end">View Product</Link>
                </h4>
            </div>
            <div className="card-body">
                <form   method="post" enctype="multipart/form-data">

                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                    
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            
                            
                            <div className="form-group mb-3">
                                    <label>Title</label>
                                    <input type="text" name="title"  onChange={handleInput} value={productInput.title} className="form-control" />
                                    <small className="text-danger"></small>
                                </div>
                               
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description"  onChange={handleInput} value={productInput.description}  className="form-control"></textarea>
                                </div>
                                <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="img" onChange={handleImage}  className="form-control" />
                                        {/* <small className="text-danger">{errorlist.image02}</small> */}
                                    </div>
                                {/* <div className="form-group mb-3">
                                    <label>Path</label>
                                        <input type="text" name="slug"  className="form-control" />
                                    <small className="text-danger"></small>
                                </div> */}
                                <div className="form-group mb-3">
                                <label>Select Color</label>
                                <select name="color"  onChange={handleInput} value={productInput.color} className="form-control">
                                    <option>Select Category</option>
                                    <option value="green" >green</option>
                                    <option value="orange" >orange</option>
                                    <option value="pink" >pink</option>
                                    <option value="white" >white</option>
                                    <option value="black" >black</option>
                                    <option value="red" >red</option>
                                    <option value="blue" >blue</option>
                                    <option value="densegreen" >densegreen</option>
                                    <option value="palegreen" >palegreen</option>                    
                                </select>
                                <small className="text-danger"></small>
                            </div>
                        </div>
                      
                        
                    </div>
                    <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>

                </form>
            </div>
        </div>
    </div>
    )
}
export default AddSlider