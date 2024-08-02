import React from "react";
import { useNavigate } from "react-router-dom";

const Patient = (props) => {
    const navigate = useNavigate();
    let prescription = props.prescription;
    console.log(prescription.doctor)
    const handleClick = () => {
        navigate("/pharmacist/prescription",{
            state: {
                name: prescription.name,
                id: prescription.rollno,
                medicines: prescription.medication,
                doctor: prescription.doctor,
                uid: prescription.UID
            }
        });
    };

    return (
        <div className="my-3">
            <div className="card my-3">
                <div className="card-header">{prescription.rollno}</div>
                <div className="card-body">
                    <h5 className="card-title">{prescription.name}</h5>
                    <div className="container">
                        {prescription.symptom}
                    </div>
                    <div className="text-center">
                        <button className="btn btn-dark btn-sm" onClick={handleClick}>
                            View Prescription
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patient;