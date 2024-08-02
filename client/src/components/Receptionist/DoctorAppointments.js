import React, {useState, useEffect} from 'react';
import styles from "./DoctorAppointments.module.css";
import axios from "axios";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';


// const DoctorAppointments = () => {
//     return (
//         <div className="container">
//             <h2 className="text-center my-5">Current Appointment Status</h2>
//             <div className="row justify-content-between">
//                 <div className="col-4">
//                     <form className="d-flex" role="search">
//                         <input className="form-control me-2" type="number" placeholder="Doctor Name" aria-label="Search"/>
//                         <button className="btn btn-outline-success" type="submit">
//                             Search
//                         </button>
//                     </form>
//                     <ul class="list-group my-5">
//                         <li class="list-group-item">Dr. A</li>
//                         <li class="list-group-item">Dr. B</li>
//                         <li class="list-group-item">Dr. C</li>
//                         <li class="list-group-item">Dr. D</li>
//                         <li class="list-group-item">Dr. E</li>
//                     </ul>
//                 </div>
//                 <div className="col-7 text-center">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-6">Current Patient</div>
//                             <div className="col-6">Mr. ABCD - 123456</div>
//                         </div>
//                         <div className="row text-center my-5">
//                             <div>Patients in Queue</div>
//                         </div>
//                         <div class="list-group">
//                             <button type="button" class="list-group-item list-group-item-action" aria-current="true">Patient 1 - 210001</button>
//                             <button type="button" class="list-group-item list-group-item-action">Patient 2 - 210002</button>
//                             <button type="button" class="list-group-item list-group-item-action">Patient 3 - 210003</button>
//                             <button type="button" class="list-group-item list-group-item-action">Patient 4 - 210004</button>
//                             <button type="button" class="list-group-item list-group-item-action active">Add New Patient</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

const DoctorAppointments = () => {
	const [editing, setEditing] = useState(false);
	const [current_schedule, setCurrSched] = useState({});
	const [edited_schedule, setEdSched] = useState({});
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
    const location = useLocation();

	//get list of doctors
	// eslint-disable-next-line
	const doctors = ["Dr. A", "Dr. B", "Dr. C"];
	//get current schedule, if any
	const get_schedule = () => {
		axiosPrivate.get("/docschedule").then((response) => {
		// console.log(response)
		setCurrSched(response.data);
		setEdSched(response.data);
	}).catch((error) => (console.log(error)))}
	useEffect(() => { //on mount: get schedule
		get_schedule();
        // eslint-disable-next-line
	},[]);
	
	const saveAssn = () => {
		setEditing(false);
		axios.post("http://localhost:9002/docschedule", edited_schedule)
		.then((response) => {
			if (response.data === "Updated") setCurrSched(edited_schedule);
			else console.log("Error - unrecognised response to post request to http://localhost:9002/docschedule, please check")
		})
		.catch((err) => {
			console.log(err)
			navigate("/login", {state : {from : location}, replace : true});
		});
	}
	
	const cancelAssn = () => {
		setEditing(false);
		setEdSched(current_schedule);
	}
	
	const handleChange = (doctor, value) => { //makes a function that handles the change for the option
		return (() => {
			setEdSched({...edited_schedule, [doctor]:value});
		})
	}
	
	
	return (<>
	{editing
	? (<div>
		<h1>Editing tommorrow's doctor assignment</h1>
		<div className={styles.container}>
			{Object.keys(edited_schedule).map((doctor) => {
				return(<>
					<div key={`${doctor}-editing`}>{doctor /*this is a key of the object -> is the doctor's name*/}</div>
					<div key={`${doctor}-edit-opts-morn`}>
						<label>
						<input type="radio" id="morning" name={`shift_${doctor}`} value="morning" checked={"morning" === edited_schedule[doctor]} onChange={handleChange(doctor,"morning")}/>
						Morning</label>
					</div>
					<div key={`${doctor}-edit-opts-even`}>
						<label>
						<input type="radio" id="evening" name={`shift_${doctor}`} value="evening" checked={"evening" === edited_schedule[doctor]} onChange={handleChange(doctor,"evening")}/>
						Evening</label>
					</div>
					<div key={`${doctor}-edit-opts-both`}>
						<label>
						<input type="radio" id="both" name={`shift_${doctor}`} value="both" checked={"both" === edited_schedule[doctor]} onChange={handleChange(doctor,"both")}/>
						Both</label>
					</div>
				</>)
			})}
		</div>
		<button onClick={saveAssn}><h3>Save and submit assignment</h3></button><button onClick={cancelAssn}><h3>Cancel</h3></button>
	</div>)
	: (<div>
		{//display current schedule
		}
		<h1>Tomorrow's Doctor Assignment</h1>
		<div className={styles.container}>
			{Object.keys(current_schedule).map((doctor) => {
				return(<>
					<div key={`${doctor}-current`}>{doctor /*this is a key of the object -> is the doctor's name*/}</div>
					<div key={`${doctor}-curr-opts-morn`}>
						<label>
						<input type="radio" id="morning" name={`shift_${doctor}`} value="morning" checked={"morning" === current_schedule[doctor]} readOnly/>
						Morning</label>
					</div>
					<div key={`${doctor}-curr-opts-even`}>
						<label>
						<input type="radio" id="evening" name={`shift_${doctor}`} value="evening" checked={"evening" === current_schedule[doctor]} readOnly/>
						Evening</label>
					</div>
					<div key={`${doctor}-curr-opts-both`}>
						<label>
						<input type="radio" id="both" name={`shift_${doctor}`} value="both" checked={"both" === current_schedule[doctor]} readOnly/>
						Both</label>
					</div>
				</>)
			})}
		</div>
		<button onClick={() => {setEditing(true);}}><h3>Change</h3></button>
	</div>)}
	{/*calendar of doctor availability*/}
	<div></div>
	</>);
}

export default DoctorAppointments
