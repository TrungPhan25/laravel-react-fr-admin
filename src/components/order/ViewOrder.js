import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function ViewOrder(){
    const [viewOrder, setOrder] = useState([])
    const [loading, setLoading] = useState(true);
    const [input,setInput]=useState("");

    useEffect(() => {
        document.title = "View Order";

        axios.get(`/api/view-order`).then(res=>{
            {
                if(res.data.status === 200)
                {
                    setOrder(res.data.orders);
                    setLoading(false);
                    console.table(res.data.orders);
                }
            }
        });

    }, []);

    var display_Orderdata = "";
    if(loading)
    {
        return <h4>View Order Loading...</h4>
    }
    else
    {
        display_Orderdata = viewOrder.filter((viewOrder)=>viewOrder.customer_id.toLowerCase().includes(input)).map( (item) => {
        var status_order="";
        if(item.status===0){
            status_order=<button type="button" class="btn btn-warning">Đặt hàng</button>
        }if(item.status===1)
        {
            status_order=<button type="button" class="btn btn-info">Đang chuẩn bị</button>
        }if(item.status===2){
            status_order=<button type="button" class="btn btn-primary">Đang giao</button>
    
        }if(item.status===3){
            status_order=<button type="button" class="btn btn-success">Đã nhận hàng</button>
        }
            return (
            
                <tr>
                            <th scope="row">{item.customer_id}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{status_order} </td>
                            <td>
                             <Link to={`/admin/edit-order/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                                
                            </td>
                </tr>
            )
        });
    }

    return (
            <div className="container px-4 mt-3">
                  <div className="card-header">
                <h4>View Order 
                    {/* <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link> */}
                </h4>
                <label>Search :</label>
                <input 
                    type="text"
                    name="order"
                    onChange={(e)=> setInput(e.target.value)}
                >
                </input>
            </div>
                <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">email</th>
                            <th scope="col">SĐT</th>
                            <th scope="col">Trạng Thái</th>
                            <th scope="col">Thao tác</th>

                            </tr>
                        </thead>
                        <tbody>
                            {display_Orderdata}
                        </tbody>
                </table>
            </div>

    )
}
export default ViewOrder