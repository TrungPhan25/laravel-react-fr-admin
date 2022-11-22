import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

function ViewDonor (){
    const [viewDonor, setDonor] = useState([])
    const [loading, setLoading] = useState(true);
    const [input,setInput]=useState("");

    useEffect(() => {
        document.title = "View Donor";
        axios.get(`/api/view-donor`).then(res=>{
            {
                if(res.data.status === 200)
                {
                    // setOrder(res.data.orders);
                    setLoading(false);
                    setDonor(res.data.donors)
                }
            }
        });

    }, []);

    var display_DonorData = "";
    if(loading)
    {
        return <h4>View Donor Loading...</h4>
    }
    else
    {
        display_DonorData = viewDonor.filter((viewDonor)=>viewDonor.name.toLowerCase().includes(input)).map( (item) => {
        var status_donor="";
       if(item.status==0){
        status_donor=<button type="button" class="btn btn-warning">Đang chờ</button>;
       }
       else{
        status_donor=<button type="button" class="btn btn-success">Đã gửi</button>;
       }
       var frequency='';
       if (item.frequency==0){
           frequency=<button type="button" class="btn btn-info">1 Tháng</button>;
       }else{
           frequency=<button type="button" class="btn btn-light">1 Lần</button>;
       }
            
            return (
            
                <tr>
                            <th scope="row"></th>
                            <td>{item.name}</td>
                            <td>{frequency}</td>
                            <td>{item.number_money}</td>
                            <td>{status_donor}</td>
                            <td>
                             <Link to={`/admin/edit-donor/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                                
                            </td>
                </tr>
            )
        });
    }

    return(
          <div className="container px-4 mt-3">
                  <div className="card-header">
                <h4>View Donor 
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
                            <th scope="col">Tuần suất</th>
                            <th scope="col">Số tiền</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Tùy chỉnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display_DonorData}
                        </tbody>
                </table>
            </div>
    )
}
export default ViewDonor