import React from 'react'

const CompletedPrescription = (props) => {

    const prescriptions = props.prescriptions;
    let idx = 0;

    return (
        <div className="container mt-5">
            <div className="row justify-content-between">
                <div className="col-6">
                    <h2>Completed Prescriptions</h2>
                </div>
                <div className="col-5">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="number" placeholder="Roll/PF Number" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <table className="table table-bordered mt-5">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Prescription ID</th>
                        <th scope="col">Roll/PF Number</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions?.map((element) => {
                        idx++;
                        return(
                        <tr key={idx}>
                            <th scope="row">{idx}</th>
                            <td>{element.prescriptionId}</td>
                            <td>{element.id}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CompletedPrescription
