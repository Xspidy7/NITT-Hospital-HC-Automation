import styles from "./Doctors.module.css"
import React,{useEffect,useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function Doctors() {
    const [doctor_list,set_doctor_list] = useState([]);
	const [query, setQuery] = useState("")
	const axiosPrivate = useAxiosPrivate();
	var idx = 0;
	
	const rrr = () => {
		axiosPrivate.get('/schedule').then((res)=>{
			set_doctor_list(res.data);
		})
	}

	useEffect(() => {
		document.onload = rrr();
		// eslint-disable-next-line
	},[]);

	return (
		<div className="container mt-5">
            <div className="row justify-content-between">
                <div className="col-6">
                    <h2>Doctors Schedule</h2>
                </div>
                <div className="col-5">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="text" placeholder="Roll/PF Number" onChange={event => setQuery(event.target.value)} aria-label="Search"/>
                    </form>
                </div>
            </div>
			<div className={`container ${styles.doctors}`}>
				<div className="row">
					<div className="col">#</div>
					<div className="col">Doctor Name</div>
					<div className="col">Slot</div>
					<div className="col">Specialization</div>
					<div className="col">Room No.</div>
				</div>
				{doctor_list.map((element) => {
						idx++;
						return (
							<div className="row">
								<div className="col">{idx}</div>
								<div className="col">{element.name_of_medicine}</div>
								<div className="col">{element.dosage}</div>
								<div className="col">{element.specialization}</div>
								<div className="col">{element.Room_no}</div>
							</div>
						);
					})
				}
			</div>	
        </div>
	);
}