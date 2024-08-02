import React from "react";
import { useNavigate } from "react-router-dom";

const Appointment = (props) => {
    const navigate = useNavigate();
    let prescription = props.prescription;

    const handleClick = () => {
        navigate("/doctor/conduct_appointment",{
            state: {
                name: prescription.name,
                id: prescription.id,
                description: prescription.description,
                slot: prescription.slot,
                doctor: prescription.doctor
            }
        });
    };

    return (
        <div className="card my-3" style={{height: "200px"}}>
            <div className="card-header">{prescription.id}</div>
            <div className="card-body">
                <h5 className="card-title">{prescription.name}</h5>
                <p className="card-text">{prescription.description.length <= 37 ? prescription.description : prescription.description.substring(0, 37) + "..."}</p>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-dark btn-sm position-absolute bottom-0 mb-3" onClick={handleClick}>
                        Conduct Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Appointment;