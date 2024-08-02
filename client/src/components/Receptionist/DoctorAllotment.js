import React,{useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const DoctorAllotment = () => {

    const location = useLocation();
    const state = location.state;
    const [doctors, setDoctors] = useState([]);
    const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
	  document.onload = setTimeout(rrr, 1000);
	}, []);
	
	const rrr=()=>{
		axiosPrivate.get('/doc_on_schedule').then((res) => {
			let doctor=[];
			let arr=[];
            arr = res.data;
			let arr_length=arr.length;
			for(let i=0;i<arr_length;i++){
				doctor.push(arr[i].name_of_medicine);
			}
			setDoctors(doctor);
		})
	}

    const navigate = useNavigate();

    const submited = (e) => {
        const doc = (document.getElementById('combo-box-demo').value);
        const arr=[state.name,state.id,state.description,state.slot,doc,state.preferredDoctor];
        if( doc !== ''){
            axiosPrivate.post("/submitted", arr)
            .then( res => {
                alert(res.data.message);
                navigate("/receptionist/appointments")
            })
        } else {
            alert("Invalid Input");
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-4"><h3>Name: {state.name}</h3></div>
                <div className="col-7 text-center"><h3>Roll/PF Number:{state.id}</h3></div>
            </div>
            <div className="row text-center my-5">
                <h2>Description</h2>
            </div>
            <span className="d-block p-2 bg-white text-center">{state.description}</span>
            <div className="row justify-content-between my-5">
                <div className="col-4">Preferred Doctor: {state.preferredDoctor}</div>
                <div className="col-4">Preferred Slot: {state.slot}</div>
            </div>
            <div className="row justify-content-between">
                <div className="col-6">
                    <div id="appt_doctor text-center">
                        <Autocomplete className='btn-group white_background' disablePortal id="combo-box-demo" options={doctors} sx={{ width: "80%" }} renderInput={(params) => <TextField {...params} label="Doctors"/>} maxHeight={200} />
			        </div>
                </div>
                <div className="col-6 text-center">
                    <button type="button" className="btn btn-secondary btn-lg col-md-8" onClick={submited}>Approve Appointment Request</button>
                </div>
            </div>
        </div>
    );
}

export default DoctorAllotment
