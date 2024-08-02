import "./Upcoming.css";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export default function Upcoming() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [app_t_arr, setAppts] = useState([]);
    const [req_appt, setReq] = useState([]);

    useEffect(() => {
        document.onload = rrr1();
        // eslint-disable-next-line
    }, []);
    const rrr1 = () => {
        axiosPrivate
        .get("/new" + auth.user.rollno)
        .then((res) => {
            setAppts(res.data.request);
        })
        .catch((err) => {
            console.log(err);
            navigate("/login", {state : {from : location}, replace : true});
        });
        
        axiosPrivate.get("/upcoming_student/" + auth.user.rollno).then((res) => {
        	console.log(res.data);
        	setReq(res.data.data);
        }).catch((err) => {
        	alert("Something went wrong. Please show this error to the team: ", err);
        })
    };
    return (
        <div className="container" >
        	<div>
        	<h1>Alloted appointments</h1>
            <div className="row" style={{height: "400px", overflowY:"auto"}}>
            {app_t_arr.length > 0 ? app_t_arr?.map((el) => {
                return (
                    <div className="my-3 col-6">
                        <div className="card my-3 hc_card">
                            <div className="card-header hc_card_header">
                                <h4>{el.rollno}</h4>
                            </div>
                            <div className="card-body hc_card_body">
                                <h5 className="card-title hc_card_title">
                                {el.name}
                                </h5>
                                <p className="card-text hc_card_text"><span className="description">{el.symptoms}</span></p>
                                <p>Appointed Doctor: {el.Doctor}</p>
                            </div>
                        </div>
                    </div>
                );
            })
            : <h2>No alloted appointments</h2>}
            </div>
            </div>
            <div>
            <h1>Requested appointments</h1>
            <div className="row" style={{height: "400px", overflowY:"auto"}}>
            {req_appt.length > 0 ? req_appt?.map((el) => {
            	return (
            		<div className="my-3 col-6">
                        <div className="card my-3 hc_card">
                            <div className="card-header hc_card_header">
                                <h4>{el.rollno}</h4>
                            </div>
                            <div className="card-body hc_card_body">
                                <h5 className="card-title hc_card_title">
                                {el.name}
                                </h5>
                                <p className="card-text hc_card_text"><span className="description">{el.symptoms}</span></p>
                                <p>Requested Doctor: {el.Doctor}</p>
                            </div>
                        </div>
                    </div>
            	);
            })
            : <h2>No requested appointments</h2>}
            </div>
            </div>
        </div>
    );
}
