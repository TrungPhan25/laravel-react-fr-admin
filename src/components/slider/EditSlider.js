import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function EditSlider(){
    const params = useParams();
    const navigate=useNavigate();
    const [loading, setLoading] = useState(true);

    
    const [errorlist, setError] = useState([]);
    const [sliderInput, setSlider] = useState({
        title: '',
        description: '',
        color: '',
    });
    const [pricture, setPicture] = useState([]);
    const handleInput = (e) => {
        e.persist();
        setSlider({...sliderInput, [e.target.name]:e.target.value });
    }
    const handleImage = (e) => {
        setPicture({ img: e.target.files[0] });
    }

    useEffect( () => {
    
        const slider_id = params.id;
        axios.get(`/api/edit-slider/${slider_id}`).then(res=>{
            if(res.data.status === 200)
            {
                // console.log(res.data.product);
                setSlider(res.data.slider);
                setPicture(res.data.slider.img);

            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/admin/view-slider');
            }
            setLoading(false);
        });

    }, [params.id]);

    const updateSlider = (e) => {
        e.preventDefault();
        const slider_id = params.id;
        const formData = new FormData();
        formData.append('img', pricture.img);
        formData.append('title', sliderInput.title);
        formData.append('description', sliderInput.description);
        formData.append('color', sliderInput.color);
        
        axios.post(`/api/update-slider/${slider_id}`, formData).then(res=>{
            if(res.data.status === 200)
            {
                // swal("Success",res.data.message,"success");
                console.log('thanh cong');
                swal("Success",res.data.massage,"success");
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("All Fields are mandetor","","error");
                setError(res.data.errors);
            }  else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/admin/view-slider');
            }
        });

    }

    if(loading)
    {
        return <h4>Edit Slider Data Loading...</h4>
    }

    return (
        <div className="container-fluid px-4">
        <div className="card mt-4">
            <div className="card-header">
                <h4>Add Slider
                    <Link to="/admin/view-slider" className="btn btn-primary btn-sm float-end">View Product</Link>
                </h4>
            </div>
            <div className="card-body">
                <form  onSubmit={updateSlider}  method="post" enctype="multipart/form-data">

                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                    
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            
                            
                            <div className="form-group mb-3">
                                    <label>Title</label>
                                    <input type="text" name="title"  onChange={handleInput} value={sliderInput.title} className="form-control" />
                                    <small className="text-danger"></small>
                                </div>
                               
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description"  onChange={handleInput} value={sliderInput.description}  className="form-control"></textarea>
                                </div>
                                <img src={`http://localhost/laravel-react-backend/public/${pricture}`} width="100px" alt={pricture} />

                                <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="img" onChange={handleImage}  className="form-control" />
                                </div>
                              
                                <div className="form-group mb-3">
                                <label>Select Color</label>
                                <select name="color"  onChange={handleInput} value={sliderInput.color} className="form-control">
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
                    <button type="submit" className="btn btn-primary px-4 mt-2">Update</button>

                </form>
            </div>
        </div>
    </div>
    )
}

export default EditSlider