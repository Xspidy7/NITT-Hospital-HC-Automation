import React,{useState,useEffect} from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./request.css"
import useAuth from "../../hooks/useAuth";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function Request(props) {
	const [isLoading, setIsLoading] = useState(true);
	const axiosPrivate = useAxiosPrivate();
	
	useEffect(() => {
	  document.onload = setTimeout(rrr, 1000);
	  // eslint-disable-next-line
	}, []);
	
    const [doctors, setDoctors] = useState([]);
	
	const rrr=()=>{
		axiosPrivate.get('/doc_on_schedule').then((res) => {
			let doctor=['None'];
			console.log(res.data);
			let arr=[];
            arr = res.data;
			let arr_length=arr.length;
			for(let i=0;i<arr_length;i++){
				doctor.push(arr[i].name_of_medicine);
			}
			setDoctors(doctor);
			setIsLoading(false);
		})
	}

	const navigate = useNavigate()
	const [appy_type,setAppyType]=useState("");
    const [appt_slot,setApptSlot]=useState("");
    const [doc,setDoc]=useState("")
	const {auth} = useAuth();

    const [symptoms,updateSymptoms] = useState("")
	let name=auth.user.name;
	let roll=auth.user.rollno;
	const Request=[name,roll,appy_type,appt_slot,symptoms,doc];
    let role=auth.user.identity;
	if(role!=="student"){
		navigate("/login")
	}

    const handleRequest = () => {
		const [name,roll,type,slot,description,doctor] = Request;
		console.log({name,roll,type,slot,description,doctor});
        if(name !== '' && roll !== '' && type !== '' && slot !== '' && description !== '' && doctor !== ''){
			console.log(name);
			axiosPrivate.post("/request_student", Request)
			.then( res => {
				alert(res.data.message)
				navigate("/student")
			})
		}
		else{
			alert("Please fill all the fields");
		}
	}
	
	const handleChange = (event) => {
		setDoc(event.target.value);
	};

	const handleRadio1 = (event) => {
		setAppyType(event.target.value);
	}

	const handleRadio2 = (event) => {
		setApptSlot(event.target.value);
	}

	return (
		<>
		<div className="student_request col-6">
			<h2><center>Request an appointment</center></h2>
			<div className="card mx-auto my-4" style={{maxWidth: "18rem"}}>
				<div className="card-header">Appointment Type</div>
				<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
					<input type="radio" className="btn-check" name="btnradio1" id="opd" autoComplete="off" checked={appy_type === 'opd'} value="opd" onChange={handleRadio1}/>
					<label className="btn btn-outline-primary" htmlFor="opd" value='opd'>OPD</label>

					<input type="radio" className="btn-check" name="btnradio1" id="specialist" autoComplete="off" checked={appy_type === 'specialist'} value={"specialist"} onChange={handleRadio1}/>
					<label className="btn btn-outline-primary" htmlFor="specialist" value='specialist'>Specialist</label>
				</div> 
			</div>
			<div className="card mx-auto my-4" style={{maxWidth: "18rem"}}>
				<div className="card-header">Preferred Slot</div>
				<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
					<input type="radio" className="btn-check" name="btnradio2" id="morning" autoComplete="off" checked={appt_slot === 'morning'} value='morning' onChange={handleRadio2}/>
					<label className="btn btn-outline-primary" htmlFor="morning" value='morning'>Morning</label>

					<input type="radio" className="btn-check" name="btnradio2" id="evening" autoComplete="off" value='evening' checked={appt_slot === 'evening'} onChange={handleRadio2}/>
					<label className="btn btn-outline-primary" htmlFor="evening" value='evening'>Evening</label>
				</div> 
			</div>
			<div className="text-center">
				<FormControl sx={{ m: 3, minWidth: 200 }}>
					<InputLabel id="demo-simple-select-autowidth-label">Preferred Doctor</InputLabel>
					<Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth-label" value={doc} label="Doctor" onChange={handleChange}>
						{isLoading ? "Loading" : doctors?.map((item, index) => {
							return(<MenuItem value={item} key={index}>{item}</MenuItem>);
						})}
					</Select>
				</FormControl>
			</div>
			<center>
				<div className="text-center" id="patient_symptoms">
					<textarea rows="3" input type="text" id="symptoms" name="symptoms" value={symptoms} onChange={e => {updateSymptoms(e.target.value)}} placeholder="Symptoms"/>
				</div>
			</center>
			<div className="text-center">
				<button className="btn btn-primary my-4" onClick={handleRequest}>Request</button>
			</div>
		</div>
		</>
	);
}