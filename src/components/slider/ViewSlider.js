import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ViewSlider(){
    const [viewSlider, setSlider] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let isMounted = true;
        document.title = "View Product";

        axios.get(`/api/view-slider`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setSlider(res.data.sliders);
                    console.log(res.data.sliders);
                    setLoading(false);                   
                }
            }
        });
    }, []);
    var display_Sliderdata = "";
    if(loading)
    {
        return <h4>View Products Loading...</h4>
    }
    else
    {
        display_Sliderdata = viewSlider.map( (item) => {
            
            return (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.color}</td>
                    <td>{item.path}</td>
            
                    <td><img src={`http://localhost/laravel-react-backend/public/${item.img}`} width="50px" alt={item.title} /></td>
                
                    <td>
                        <Link to={`/admin/edit-slider/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>{item.status === 0 ? 'Visible':'Hidden'}</td>
                </tr>
            )
        });
    }

    return (
        <div className="container px-4 mt-3">
        <div className="card">
            <div className="card-header">
                <h4>View slider 
                    <Link to="/admin/add-slider" className="btn btn-primary btn-sm float-end">Add Slider</Link>
                </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>color</th>
                                <th>path</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display_Sliderdata}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ViewSlider