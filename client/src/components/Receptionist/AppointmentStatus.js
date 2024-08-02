import React, { useState, useEffect } from "react";
// import axios from "axios";
import ViewAppt from "./ViewAppt";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AppointmentStatus = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const [appointments, setAppts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    //on mount i.e. "on load": get ongoing appointments and display
    const fxn = async () => {
      setAppts((await axiosPrivate.get("/ongoing_appointments")).data);
    };
    fxn();
  }, []);

  return (
    <div>
      <div className="container my-5">
        <div className="row justify-content-between">
          <div className="col-6">
            <h2>Ongoing Appointments</h2>
          </div>
          <div className="col-5">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="text" placeholder="Roll/PF Number" value={query} onChange={(event) => {
                  setQuery(event.target.value);
                }} aria-label="Search" />
            </form>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {appointments.filter(element => element.rollno !== undefined).filter((element) => element.rollno.startsWith(query)).map((element) => {
                console.log(element.rollno);
                return (
                  <div className="col-md-4" key={element._id}>
                    <ViewAppt prescription={element} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStatus;
