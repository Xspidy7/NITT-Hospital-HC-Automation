import styles from "./prescriptions.module.css";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Prescription = () => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { state } = useLocation();
    let idx = 0;

    const handleClick = () => {
        axiosPrivate.post('/dispense',{
            rollno: state.id,
            UID: state.uid
        }).then( res => {
            navigate("/pharmacist")
        }).catch(err => {
            console.log(err);
        })
    };

    const handlePrint = () => {
        const buttons = document.getElementsByTagName("button");

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "none";
        }
        window.print();
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "";
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-between">
                <div className="col-6">
                    <h1>Prescription</h1>
                </div>
            </div>
            <div className="text-center my-5 mb-3">
                <div className="row">
                    <h4 className="col">Name: {state.name}</h4>
                    <h4 className="col">Roll/PF Number: {state.id}</h4>
                </div>
            </div>
            <table className="table table-bordered mt-5">
                 <thead className="table-dark">
                     <tr>
                         <th scope="col" className="text-center">#</th>
                         <th scope="col" className="text-center">Medicine ID</th>
                         <th scope="col" className="text-center">Medicine Name</th>
                         <th scope="col" className="text-center">Dosage</th>
                         <th scope="col" className="text-center">Status</th>
                     </tr>
                 </thead>
                 <tbody>
                     {state.medicines?.map((element) => {
                         idx++;
                         return (
                             <tr>
                                 <th scope="row" className="text-center">{idx}</th>
                                 <td className="text-center">{element._id}</td>
                                 <td className="text-center">{element.name_of_medicine}</td>
                                 <td className="text-center">{element.dosage}</td>
                                 <td style={{ justifyContent: "center", display: "flex" }}>
                                     <div className="form-check">
                                         <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                     </div>
                                 </td>
                             </tr>
                         );
                     })}
                 </tbody>
             </table>
			{/* <div className={`container ${styles.table}`}>
				<div className="row">
					<div className="col">#</div>
					<div className="col">Medicine ID</div>
					<div className="col">Medicine Name</div>
					<div className="col">Dosage</div>
					<div className="col">Status</div>
				</div>
				{state.medicines.map((element) => {
						idx++;
						return (
							<div className="row">
								<div className="col">{idx}</div>
								<div className="col">{element.id}</div>
								<div className="col">{element.name}</div>
								<div className="col">{element.dose}</div>
								<div className="col"><div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div></div>
							</div>
						);
					})
				}
			</div>	 */}
            <button type="button" className="btn btn-dark btn-lg mt-5" onClick={handleClick}>
                Dispense
            </button>
            <div className="container text-center">
                <button type="button" className="btn btn-dark btn-lg mt-5" onClick={handlePrint}>
                    Print Receipt
                </button>
            </div>
        </div>
    );
};

export default Prescription;
