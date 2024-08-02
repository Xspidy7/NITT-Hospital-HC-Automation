import React from 'react'

const ViewAppt = (props) => {

    const prescription = props.prescription;

    return (
        <div className="my-3">
            <div className="card my-3">
                <div className="card-header">{prescription.rollno}</div>
                <div className="card-body">
                    <h5 className="card-title">{prescription.name}</h5>
                    <p className="card-text"><span className="appointment_description">{prescription.symptoms}</span></p>
                    {/* <button className="btn btn-dark btn-sm">
                        View Appointment Details
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default ViewAppt
