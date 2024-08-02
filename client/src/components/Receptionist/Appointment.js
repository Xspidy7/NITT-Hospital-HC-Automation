import React from "react";
import { useNavigate } from "react-router-dom";

const Appointment = (props) => {
    
    const navigate = useNavigate();
    let prescription = props.prescription;

    const handleClick = () => {
        navigate("/receptionist/doctorallotment",{
            state: {
                name: prescription.name,
                id: prescription.id,
                description: prescription.description,
                preferredDoctor: prescription.preferredDoctor,
                slot: prescription.slot,
            }
        });
    };

    return (
        <div className="my-3">
            <div className="card my-3 hc_card" style={{height: "180px"}}>
                <div className="card-header hc_card_header">{prescription.id}</div>
                <div className="card-body hc_card_body">
                    <h5 className="card-title hc_card_title">{prescription.name}</h5>
                    <p className="card-text hc_card_text"><span className="appointment_description">{prescription.description}</span></p>
                    <button className="btn btn-dark btn hc_card_button mb-3" onClick={handleClick}>
                        Allot Doctor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Appointment;