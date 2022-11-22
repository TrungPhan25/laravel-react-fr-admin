import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard (){
    const [viewOrder, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewDonor,setDonor]=useState([]);
    const [countOrderWarning,setCountOrderWarning]=useState([]);
    const [totalDonate,setTotalDonate]=useState([]);
    const [totalDonor,setTotalDonor]=useState([]);
    useEffect(() => {
        document.title = "Dashboard";

        axios.get(`/api/view-dashboard`).then(res=>{
            {
                if(res.data.status === 200)
                {
                    setOrder(res.data.orders_warning);
                    setDonor(res.data.donors_warning);
                    setCountOrderWarning(res.data.count_order_warning);
                    setTotalDonate(res.data.total_donate);
                    setTotalDonor(res.data.total_donor);
                    setLoading(false);
                }
            }
        });

    }, []);

    var display_DonorsWarning = "";
    var display_OrderWarning = "";
    if(loading)
    {
        return <h4>View Dashboard Loading...</h4>
    }
    else
    {
        display_DonorsWarning = viewDonor.map( (item) => {
            var frequency='';
        if (item.frequency==0){
            frequency=<button type="button" class="btn btn-info">1 Tháng</button>;
        }else{
            frequency=<button type="button" class="btn btn-light">1 Lần</button>;
        }
            return (
                <tr key={item.id}>

                    <td scope="row">1</td>
                    <td>{item.name}</td>
                    <td>{item.number_money}</td>
                    <td>{frequency}</td>
                    <td>
                        <Link to={`/admin/edit-donor/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                </tr>
            )
        });

        display_OrderWarning = viewOrder.map( (item) => {
            return (
                <tr key={item.id}>
                    <td>1</td>
                    <td>{item.name}</td>
                    <td> {item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <Link to={`/admin/edit-order/${item.id}`} className="btn btn-warning btn-sm">Edit</Link>
                    </td>

                </tr>
            )
        });
    }

    return (
        
        <div class="container-fluid px-4">
            <br></br>
         <div class="row">
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4">
                <div class="card-body"> 500,000,000 vnđ</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a  >Doanh Thu:</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-warning text-white mb-4">
                <div class="card-body">{countOrderWarning} Đơn</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                           <a  >Đơn Đang Chờ:</a>

                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-success text-white mb-4">
                <div class="card-body">{totalDonate} nghìn vnđ</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a  >Tổng Số tiền Quyên Góp:</a>

                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-black text-white mb-4">
                <div class="card-body">{totalDonor}</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                     <a  >Số nhà quyên góp:</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>

    <div className="card-body">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Đơn hàng đang chờ</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Nhà tài trợ đang chờ</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                        <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">SĐT</th>
                                    <th scope="col">Thời gian</th>

                                    <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                              
                            {display_OrderWarning}
                                </tbody>
                                </table>
                        </div>
                        <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                     
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tên</th>
                                        <th scope="col">Số tiền (nghìn vnđ)</th>
                                        <th scope="col">Tuần suất</th>
                                        <th scope="col">Tùy Chỉnh</th>
                                    </tr>
                                </thead>
                                <tbody>
                        
                                {display_DonorsWarning}
                                </tbody>
                                </table>

                        </div>
                    </div>

            </div>
    </div>
    )
}
export default Dashboard