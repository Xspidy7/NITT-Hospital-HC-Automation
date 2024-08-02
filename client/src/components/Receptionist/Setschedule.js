import React,{ useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./Setschedule.css"
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const DoctorAppointment = (props) => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [medicine, setMedicine] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        document.onload = setTimeout(rrr, 1000);
    }, []);
      
    const rrr = () => {
        axiosPrivate.get('/all_doctors').then((res) => {
            let doctor=[];
            let arr=[];
            arr = res.data;
            let arr_length=arr.length;
            for(let i=0;i<arr_length;i++) {
                doctor.push(arr[i].name);
            }
            setDoctors(doctor);
            console.log(doctor);
        })
    }
    
	const handlePrescribe=()=>{
		axiosPrivate.post("/doctor_schedule", medicine)
        .then( res => {
            alert(res.data.message)
            navigate("/receptionist")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    const handleClick = () => {
        var name = document.getElementById('combo-box-demo').value;
        var dosage = document.getElementsByName('btnradio');
		var specialization=document.getElementById('specialization').value;
		var room=document.getElementById('room').value;
        var dose;
		for(var i = 0; i < dosage.length; i++)
        {
            if(dosage[i].checked)
            {
                dose = dosage[i].value;
                dosage[i].checked = false;
                break;
            }
        }
        if(name != '' && dosage != '' && specialization != '' && room != '') {
            setMedicine([...medicine, {name_of_medicine: name, dosage: dose , specialization:specialization,Room_no:room}]);
        }
        else {
            alert('Please fill in all the fields');
        }
        document.getElementById('combo-box-demo').value = "";
		document.getElementById('specialization').value = "";
		document.getElementById('room').value = "";
    }

    return (
        <div className="col-7 text-center">
            <h2 className="mb-5">Doctor Allotment for the day</h2>
            <div className="container my-3">
                <div className="input-group mb-3">
                    <Autocomplete className='btn-group white_background' disablePortal id="combo-box-demo" options={doctors} sx={{ width: "80%" }} renderInput={(params) => <TextField {...params} label="Doctors"/>} maxHeight={200} />
                </div>
            </div>
            <div className="btn-group my-3 white_background" role="group" aria-label="Basic radio toggle button group">  
                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" value="Morning"/>
                <label className="btn btn-outline-primary" htmlFor="btnradio1">Morning</label>

                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" value="Evening"/>
                <label className="btn btn-outline-primary" htmlFor="btnradio2">Evening</label>

                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" value="Both"/>
                <label className="btn btn-outline-primary" htmlFor="btnradio3">Both</label>
            </div>
			<div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Doctor specialization</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="specialization"/>
                </div>

				<div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Room No.</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="room"/>
                </div>	

		     <div className='container'>

                <button className="btn btn-dark my-3" onClick={handleClick}>Add Doctor</button>
			  </div>
            <div className="row my-3">
                <div className="col-6">
                    <h4>Current Doctors</h4>
                </div>
                <div className="col-6">
                    {
                        medicine?.map((element) => {
                            return(
                                <div className="row mx-3">
                                    {element.name_of_medicine}: Slot {element.dosage}
                                </div>
                            );
                        })
                    }
                </div>
            </div>


            <div className="container mt-5">
                <button className="btn btn-lg btn-dark" onClick={handlePrescribe}>
                    Add doctors for the day
                </button>
            </div>
        </div>
    );
}

export default DoctorAppointment;
