import React from 'react'
import { useNavigate } from 'react-router-dom'
import './nurse.css'
const InitialNurse = () => {

    // const { name, id } = useSelector((state) => state.appt);
    const navigate = useNavigate();
    var inputId;

    const handleClick = () => {
        // navigate({
        //     pathname: '/nurse/vitals',
        //     state: {
        //         name: name,
        //         id: id
        //     },
        // });
        navigate('/nurse/vitals',
            {state: {
                id: inputId
            }
        });
    }

    const handleChange = (event) => {
        inputId = event.target.value;
    }
    return (
        <div className='nurse'>
            <div className="container text-center my-5">
                <h1>Add Vital Information</h1>
                <div className="input-group input-group-lg my-5">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Roll/PF Number</span>
                    <input type="text" onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button onClick={handleClick} className="btn btn-primary" type="button">Enter</button>
                </div>
            </div>
        </div>
    );
}

export default InitialNurse
