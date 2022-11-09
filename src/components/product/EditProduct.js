import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Select from 'react-select';
import sizeOption from "../data/sizeOption";

function EditProduct (){
    const params = useParams();
    const navigate=useNavigate();

    const [categorylist, setCategorylist] = useState([]);
    const [errorlist, setError] = useState([]);
    
    const [productInput, setProduct] = useState({
        categorySlug: '',
        slug: '',
        title: '',
        description: '',
        selling_price: '',
        original_price: '',
        qty: '',
    });

    const [pricture, setPicture] = useState([]);
    const [pricture2, setPicture2] = useState([]);
const [selectedValue, setSelectedValue] = useState([]);

    const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
        console.log(selectedValue);
      }
    const [loading, setLoading] = useState(true);
    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]:e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ image01: e.target.files[0] });
    }
    const handleImage2 = (e) => {
        setPicture2({ image02: e.target.files[0] });
    }

    useEffect( () => {
        
        
        axios.get(`/api/all-category`).then(res=>{
            
                if(res.data.status === 200)
                {
                    setCategorylist(res.data.category);
                }
            
        });

        
        const product_id = params.id;
        axios.get(`/api/edit-product/${product_id}`).then(res=>{
            if(res.data.status === 200)
            {
                // console.log(res.data.product);
                setProduct(res.data.product);
                setSelectedValue(res.data.product.size);
                setPicture(res.data.product.image01);
                setPicture2(res.data.product.image02);

            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/admin/view-product');
            }
            setLoading(false);
        });

    }, [params.id]);

    const updateProduct = (e) => {
        e.preventDefault();
        const product_id = params.id;
        const formData = new FormData();
        formData.append('image01', pricture.image01);
        formData.append('image02', pricture2.image02);

        formData.append('categorySlug', productInput.categorySlug);
        formData.append('slug', productInput.slug);
        formData.append('title', productInput.title);
        formData.append('description', productInput.description);

        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('qty', productInput.qty);
        
        formData.append('size', JSON.stringify(selectedValue));


        axios.post(`/api/update-product/${product_id}`, formData).then(res=>{
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
                navigate('/admin/view-product');
            }
        });

    }

    if(loading)
    {
        return <h4>Edit Product Data Loading...</h4>
    }

    return (
        <div className="container-fluid px-4">
        <div className="card mt-4">
            <div className="card-header">
                <h4>Edit Product
                    <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                </h4>
            </div>
            <div className="card-body">
                <form onSubmit={updateProduct}  method="post" enctype="multipart/form-data">

                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                     
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            
                            <div className="form-group mb-3">
                                <label>Select Category</label>
                                <select name="categorySlug" onChange={handleInput} value={productInput.categorySlug} className="form-control">
                                    <option>Select Category</option>
                                    {
                                        categorylist.map( (item) => {
                                            return (
                                                <option value={item.categorySlug} key={item.id}>{item.display}</option>
                                            )
                                        })
                                    }
                                </select>
                                <small className="text-danger">{errorlist.categorySlug}</small>
                            </div>
                            <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
                                    <small className="text-danger">{errorlist.slug}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Title</label>
                                    <input type="text" name="title" onChange={handleInput} value={productInput.title} className="form-control" />
                                    <small className="text-danger">{errorlist.title}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description"  onChange={handleInput} value={productInput.description} className="form-control"></textarea>
                                </div>

                        </div>
                      
                        <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                            
                            <div className="row">

                                <div className="col-md-4 form-group mb-3">
                                    <label>Selling Price</label>
                                    <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                                    <small className="text-danger"></small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Original Price</label>
                                    <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price}  className="form-control" />
                                    <small className="text-danger"></small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                        <label>Quantity</label>
                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty}  className="form-control" />
                                        <small className="text-danger">{errorlist.qty}</small>
                                    </div>
            
                                    <div>
                                    <img src={`http://localhost/laravel-react-backend/public/${pricture}`} width="100px" alt={pricture} />
                                    
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Image1</label>
                                        <input type="file" name="image01" onChange={handleImage}  className="form-control" />
                                        <small className="text-danger">{errorlist.image01}</small>
                                    </div>
                                    <div>
                                    <img src={`http://localhost/laravel-react-backend/public/${pricture2}`} width="100px" alt={pricture2} />
                                    
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Image2</label>
                                        <input type="file" name="image02" onChange={handleImage2}  className="form-control" />
                                        <small className="text-danger">{errorlist.image02}</small>
                                    </div>
                                
                                    <div>
                                    <label>Size</label>
                                    <Select
                                        defaultValue={selectedValue}
                                        value={sizeOption.filter(obj => selectedValue.includes(obj.value))}
                                        onChange={handleChange}
                                        isMulti
                                        name="sizes"
                                        options={sizeOption}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    </div>
                            
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
export default EditProduct