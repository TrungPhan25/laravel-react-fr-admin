import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert2";


function EditDonor(){
    const params = useParams();
    const [selected, setSelected] = useState([]);
    const handleChange = event => {
        setSelected(event.target.value);
      };
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();
    const [donorInput, setDonor] = useState([]);
    const handleInput = (e) => {
        e.persist();
        setDonor({...donorInput, [e.target.name]:e.target.value });
    }
    useEffect(() => {
        const donor_id = params.id;
        axios.get(`/api/edit-donor/${donor_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setDonor(res.data.donor);
                setSelected(res.data.status_donor);
            }
            else if(res.data.status === 404)
            {
                // swal("Error",res.data.message,"error");
                navigate('/admin/view-donor');
            }
            setLoading(false);
        });

    }, [params.id]);

    const updateStatusDonor = (e) => {
        e.preventDefault();
        const donor_id = params.id;
        const formData = new FormData();
        formData.append('status',selected);

        axios.post(`/api/update-donor/${donor_id}`, formData).then(res=>{
            if(res.data.status === 200)
            {
                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Bạn đã cập nhât thành công',
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


var tansuat='';
if(donorInput){
    if(donorInput.frequency==0){
        tansuat='1 tháng'
    }else{
        tansuat='1 lần'
    }
}

    return (
        <div className="container px-4">
        <div className="card mt-4">
            <div className="card-header">
                <h4>Edit Donor 
                    <Link to="/admin/donors" className="btn btn-primary btn-sm float-end">BACK</Link>
                </h4>
            </div>
            <div className="card-body">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Thông tin Nhà Tài trơ</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Thay đổi trang thái </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                           
                            <div className="form-group mb-3">
                                <label>Name</label> 
                                <input type="text" name="name"   onChange={handleInput} value={donorInput.name} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                            <div class="input-group mb-3" >                           
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" class="form-control" onChange={handleInput} value={donorInput.email} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                                </input>
                            </div>
                            </div>
                            <div className="form-group mb-3">
                                <label>Tuần suất</label> 
                                <input type="text" name="" className="form-control" value={tansuat}  />
                            </div>
                           
                            <div className="form-group mb-3">
                                <label>Số tiền (ngìn vnđ):</label> 
                                <input type="text" name="address" onChange={handleInput} value={donorInput.number_money} className="form-control" />
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                          <div className="row">
                            <form  onSubmit={updateStatusDonor} >
                                <label>Trạng thái đơn hàng</label>
                                    <select class="form-select" name="status" value={selected} onChange={handleChange} aria-label="Default select example">
                                        <option selected> select </option>
                                        <option value="0" >Đang chờ</option>
                                        <option value="1" >Đã nhận</option>
                                     
                                    </select>
                                
                                  <button style={{float: "right" }} type="submit" className="btn btn-primary px-4 mt-2">Submit</button>

                            </form>

                          </div>
                         

                        </div>
                    </div>

            </div>
        </div>
    </div>
    )
}

export default EditDonor