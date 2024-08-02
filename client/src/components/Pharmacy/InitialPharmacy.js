import React, { useState,useEffect } from "react";
import Patient from "./Patient";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const InitialPharmacy = () => {

    const axiosPrivate = useAxiosPrivate();
    const [pending, setPending] = useState([]);
    const [query, setQuery] = useState("")
    
    const rrr = () =>{
        axiosPrivate.get('/pharmacist') 
        .then(res => {
            setPending(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        document.onload = rrr();
    },[]);
    
    return (
        <div className="container my-5">
            <div className="row justify-content-between">
                <div className="col-6">
                    <h2>Pending Prescriptions</h2>
                </div>
                <div className="col-5">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="text" placeholder="Roll/PF Number" onChange={event => setQuery(event.target.value)} aria-label="Search" autoFocus/>
                    </form>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {pending?.filter(element => element.rollno !== undefined).filter(element => element.rollno.startsWith(query)).map((element) => {
                        return (
                            <div className="col-md-4" key={element.id}>
                                <Patient prescription={element}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InitialPharmacy;
