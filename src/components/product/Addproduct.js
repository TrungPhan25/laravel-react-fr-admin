import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Select from 'react-select';
import sizeOption from "../data/sizeOption";

function AddProdcut (){
    const [categorylist, setCategorylist] = useState([]);
    const [errorlist, setError] = useState([]);
    const [productInput, setProduct] = useState({
        categorySlug: '',
        slug: '',
        title: '',
        description: '',
        selling_price: '',
        price: '',
        qty: '',
    });


    const [pricture, setPicture] = useState([]);
    const [pricture2, setPicture2] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]:e.target.value });
    }

const [selectedValue, setSelectedValue] = useState([]);
 
// handle onChange event of the dropdown
const handleChange = (e) => {
  setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
}

    const handleImage = (e) => {
        setPicture({ image01: e.target.files[0] });
    }
    const handleImage2 = (e) => {
        setPicture2({ image02: e.target.files[0] });
    }

    useEffect( () => {
        let isMounted = true;
        
        axios.get(`/api/all-category`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setCategorylist(res.data.category);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    const submitProduct = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('image01', pricture.image01);
        formData.append('image02', pricture2.image02);

        formData.append('categorySlug', productInput.categorySlug);
        formData.append('slug', productInput.slug);
        formData.append('title', productInput.title);
        formData.append('description', productInput.description);

        formData.append('selling_price', productInput.selling_price);
        formData.append('price', productInput.price);
        formData.append('qty', productInput.qty);
           
        formData.append('size', JSON.stringify(selectedValue));


        axios.post(`/api/store-product`, formData).then(res=>{
            if(res.data.status === 200)
            {
                // swal("Success",res.data.message,"success");
                console.log('thanh cong');
                swal("Success",res.data.massage,"success");
            
                setProduct({...productInput, 
                    categorySlug: '',
                    slug: '',
                    title: '',
                    description: '',
                    selling_price: '',
                    price: '',
                    qty: '',
                });
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("All Fields are mandetor","","error");
                console.log(selectedValue);
                setError(res.data.errors);
            }
        });
    }



    return (
        <div className="container-fluid px-4">
        <div className="card mt-4">
            <div className="card-header">
                <h4>Add Product
                    <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                </h4>
            </div>
            <div className="card-body">
                <form onSubmit={submitProduct}  method="post" enctype="multipart/form-data">

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
                                    <input type="text" name="price" onChange={handleInput} value={productInput.price}  className="form-control" />
                                    <small className="text-danger"></small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                        <label>Quantity</label>
                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty}  className="form-control" />
                                        <small className="text-danger">{errorlist.qty}</small>
                                    </div>
            
                                    
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Image1</label>
                                        <input type="file" name="image01" onChange={handleImage}  className="form-control" />
                                        <small className="text-danger">{errorlist.image01}</small>
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
                                        // onChange={handleChange}
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
export default AddProdcut