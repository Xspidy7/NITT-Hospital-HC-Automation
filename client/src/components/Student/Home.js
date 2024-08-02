import "./Home.css"
import React from "react";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import HealingIcon from '@mui/icons-material/Healing';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import xray from '../x-ray.jpg';

export default function Home(props) {

	const { auth } = useAuth();

	return (
		<div className="container row justify-content-center align-items-center">
			<div className="col-8 mx-1">
				<div className="card-title">
					<h1>Welcome, {auth.user.name}</h1>
				</div>
				<div className="card-body my-4">
					The Health Centre is committed to promoting the health and wellness of the campus community by providing high-quality prevention, education, and treatment services. The medical, counseling, and health promotion services are designed to help you stay healthy or get better so that you can minimize disruptions caused by injury and illness. The Health Centre aims to enhance the healthcare experience of the NITT campus community by providing healthcare with respect, consideration and confidentiality. Please review this website or reach out to the Heath Centre staff for details of healthcare resources, prevention methods, health education and general healthcare guidance.
				</div>
				<hr/>
				<div className="card-title">
					<h1>Our services</h1>
					<div className="row">
						<div className="col-4 my-3">
							<div className="text-center">
								<MonitorHeartIcon sx={{ fontSize: 100 }}/>
							</div>
							<div className="text-center">ECG</div>
						</div>
						<div className="col-4 my-3">
							<div className="text-center">
								<BloodtypeIcon sx={{ fontSize: 100 }}/>
							</div>
							<div className="text-center">Pathology</div>
						</div>
						<div className="col-4 my-3">
							<div className="text-center">
								<SportsGymnasticsIcon sx={{ fontSize: 100 }}/>
							</div>
							<div className="text-center">Physiotherapy</div>
						</div>
						<div className="col-4 my-3">
							<div className="text-center">
								<HealingIcon sx={{ fontSize: 100 }}/>
							</div>
							<div className="text-center">Dressing</div>
						</div>
						<div className="col-4 my-3">
							<div className="text-center">
								<img src={xray} className="img-fluid" style={{ height: "95px" }} />
							</div>
							<div className="text-center my-1">X-Ray</div>
						</div>
						<div className="col-4 my-3">
							<div className="text-center">
								<PregnantWomanIcon sx={{ fontSize: 100 }}/>
							</div>
							<div className="text-center">Labour Room</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-3 d-flex justify-content-center align-items-center mx-4">
				<div>
					<div className="my-5 mr-5">
						<Link to="request"><button className="btn btn-lg btn-dark" style={{width: "100%", height:"100px"}}>Request Appointment</button></Link>
					</div>
					<div className="my-5 mr-5">
						<Link to="upcoming"><button className="btn btn-lg btn-dark" style={{width: "100%", height:"100px"}}>View Appointments</button></Link>
					</div>
					<div className="my-5 mr-5">
						<Link to="history"><button className="btn btn-lg btn-dark" style={{width: "100%", height:"100px"}}>View Medical History</button></Link>
					</div>
					<div className="my-5 mr-5">
						<Link to="doctors"><button className="btn btn-lg btn-dark" style={{width: "100%", height:"100px"}}>View Doctor Schedules</button></Link>
					</div>
				</div>
			</div>
		</div>
	)
}