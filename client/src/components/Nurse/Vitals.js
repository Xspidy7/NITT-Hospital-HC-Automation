import React, { useState} from 'react' 
import { useLocation,useNavigate } from 'react-router-dom';
import './vitals.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Vitals = () => {

    const [oxy, setOxy] = useState('');
    const [temp, setTemp] = useState('');
    const [bp, setBp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const state = location.state;

    const handleClick = () => {
        axiosPrivate.post("/nurse", {roll:state.id,vitals_Oxgen:oxy,vitals_Temperature:temp,vitals_BloodPressure:bp})
        .then( res => {
            navigate("/nurse")
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="container nurse_vitals">
            <div className="row d-flex justify-content-center">
                <div className="text-center"><h2>Roll/PF Number: {state.id}</h2></div>
            </div>
            <div className="input-group input-group-lg my-5">
                <span className="input-group-text heading" id="inputGroup-sizing-lg">Oxygen</span>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={(e) => setOxy(e.target.value)}/>
            </div>
            <div className="input-group input-group-lg my-5 ">
                <span className="input-group-text heading" id="inputGroup-sizing-lg">Temperature</span>
                <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={(e) => setTemp(e.target.value)}/>
            </div>
            <div className="input-group input-group-lg my-5">
                <span className="input-group-text heading" id="inputGroup-sizing-lg">Blood Pressure</span>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={(e) => setBp(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-primary" onClick={handleClick} type="button">Submit</button>
            </div>
        </div>
    );
}

export default Vitals
