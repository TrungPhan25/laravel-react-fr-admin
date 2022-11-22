import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert2";
import Select from 'react-select';
import statusOption from "../data/statusOption";

function EditOrder(){
    const [orderInput, setOrder] = useState([]);
    const [selected, setSelected] = useState([]);
const handleChange = event => {
    setSelected(event.target.value);
  };
  const handleInput = (e) => {
    e.persist();
    setOrder({...orderInput, [e.target.name]:e.target.value });
}

    const [loading, setLoading] = useState(true);
    const [detailOrder,setDetailOrder]= useState([]);

    const navigate=useNavigate();

    const params = useParams();
 

    useEffect(() => {
        const order_id = params.id;
        axios.get(`/api/edit-order/${order_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setOrder(res.data.order);
                setDetailOrder(res.data.order_detail)
                setSelected(res.data.status_order)

            }
            else if(res.data.status === 404)
            {
                // swal("Error",res.data.message,"error");
                navigate('/admin/view-order');
            }
            setLoading(false);
        });

    }, [params.id]);



    const updateStatusOrder = (e) => {
        e.preventDefault();
        const order_id = params.id;
        const formData = new FormData();
        formData.append('status',selected);

        axios.post(`/api/update-status-order/${order_id}`, formData).then(res=>{
            if(res.data.status === 200)
            {
                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            else if(res.data.status === 422)
            {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cập nhật thất bại',
                  })
            }  else if(res.data.status === 404)
            {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cập nhật thất bại',
                  })
                navigate('/admin/view-order');

            }
        });

    }
var total_price=0;
    var display_OrderDetailData = "";
    if(loading)
    {
        return <h1>Loading Order id</h1>
    }else{
        var nf = new Intl.NumberFormat();
        var i=0;
        display_OrderDetailData = detailOrder.map( (item) => {
        const price_detail_product = nf.format(item.price);
        i=i+1;
        total_price=total_price+item.pty*item.price
            return (
            <tr>
            <th scope="row">{i}</th>
            <td>
             <img src={`http://localhost/laravel-react-backend/public/${item.product.image01}`} width="100px"  />
            </td>
            <td>{item.product.title}</td>
            <td>{item.pty} </td>
            <td>{price_detail_product} vnđ</td>
            </tr>
            )
        });
        
    } 
var final_total_price=nf.format(total_price)

// console.log(selected)

    return (
        <div className="container px-4">
        <div className="card mt-4">
            <div className="card-header">
                <h4>Edit Order 
                    <Link to="/admin/orders" className="btn btn-primary btn-sm float-end">BACK</Link>
                </h4>
            </div>
            <div className="card-body">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Thông tin Khách hàng</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Chi tiết đơn hàng</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                            <div className="form-group mb-3">
                                <label>Mã đơn hàng</label>
                                <input type="text" name="customer_id" onChange={handleInput} value={orderInput.customer_id}  className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Name</label> 
                                <input type="text" name="name"  onChange={handleInput} value={orderInput.name} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Number Phone</label> 
                                <input type="text" name="phone" onChange={handleInput} value={orderInput.phone} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                            
                            <div class="input-group mb-3" >                           
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" onChange={handleInput} value={orderInput.email} class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                                </input>
                            </div>
                            </div>
                            <div className="form-group mb-3">
                                <label>Địa chỉ</label> 
                                <input type="text" name="address" onChange={handleInput} value={orderInput.address} className="form-control" />
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                          <div className="row">
                            <form onSubmit={updateStatusOrder} >
                                <label>Trạng thái đơn hàng</label>
                                    <select class="form-select" name="status" value={selected} onChange={handleChange} aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value="0" >Đặt hàng</option>
                                        <option value="1" >Đang chuẩn bị</option>
                                        <option value="2" >Đang giao</option>
                                        <option value="3" >Đã nhận</option>
                                    </select>
                                
                                  <button style={{float: "right" }} type="submit" className="btn btn-primary px-4 mt-2">Submit</button>

                            </form>

                          </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Ảnh</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                              {display_OrderDetailData}
                              <tr>
                                    <th scope="row">Tổng số tiền</th>
                                    <td>
                                    </td>
                                    <td></td>
                                    <td> </td>
                                    <td>{final_total_price} vnđ</td>
                                    </tr>
                                </tbody>
                                </table>

                        </div>
                    </div>

            </div>
        </div>
    </div>
    )
}

export default EditOrder