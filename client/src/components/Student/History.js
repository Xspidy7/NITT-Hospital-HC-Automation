import "./History.css"
import React from "react";
import { useEffect,useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from 'react-router-dom';
import Popup from "../doctor/Veiw Appointments/Popup";


export default function History(props) {
	const {auth} = useAuth();
	const [history, setHistory] = useState([]);
	const [PDFs, setPDFs] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
    const location = useLocation();
	const [showModal, setShowModal] = useState(false);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
		getHistory();
		getPDFs();
        // eslint-disable-next-line
	}, []);

	const getHistory = () => {
        axiosPrivate.get("/student_history"+auth.user.rollno).then((res) => {
// 			console.log(res.data.request);
			setHistory(res.data.request);
		}).catch((err) => {
			console.log(err);
			alert("Sorry, there was an error. Please show the team this message: " + err);
			navigate("/login", {state : {from : location}, replace : true});
		})
	}
	
	const getPDFs = () => {
		axiosPrivate.get("/report" + auth.user.rollno).then((res) => {
			setPDFs(res.data);
		}).catch((err) => {
			console.log(err);
			alert("Sorry, there was an error. Please show the team this message: " + err);
			navigate("/login", {state : {from : location}, replace : true});
		})
	}
	
	return (
		<div style={{width: "90%", display:"flex", justifyContent:"space-between"}}>
        <div className="col-7 mx-1" style={{ maxHeight: '600px', width:"45%" }}>
        	<h1>Appointment History</h1>
        	<div style={{height: "500px", overflowY:"auto"}}>
            {history?.map(function (element) {
                if(element.symptoms != '') {
                return(
                    <div key={element.index}>
                        <div className="card my-3 mx-3 btn btn-light" key={element.index} onClick={() => {
                            setPopup(element);
                            setShowModal(true);
                        }}>
                            <div className="card-header text-center">{(new Date(element.date)).toDateString() + " " + /[0-9]{2}\:[0-9]{2}\:[0-9]{2}/.exec((new Date(element.date)).toTimeString())[0]}</div>
                            <div className="card-body">
                                <h5 className="card-title">{element.doctor}</h5>
                                <h5 className="card-title">{element.remark}</h5>
                            </div>
                            <Popup open={showModal} details={popup}/>
                        </div>
                    </div>
                );}
            }).reverse()}
            </div>
        </div>
        <div style={{width: "45%"}}>
        	<h1>Uploaded Documents</h1>
        	<div style={{height: "500px", overflowY:"auto"}}>
            {PDFs?.map(function (element) {
                if(element.symptoms != '') {
                return(
                    <div key={element.index} onClick={() => {
                    	// console.log("download this pdf: " + element.pdfname)
                    	axiosPrivate.get("/report/" + auth.user.rollno + "/" + element.pdfname).then((res) => {
                    		// console.log(res.data);
                    		/*steps to download:
                    		1. take file and make a blob
                    		2. download the blob lmao i guess
                    		*/
                    		let toDownload = new Blob([new Uint8Array(res.data[0].pdf.data.data)], {type: "application/pdf"});
                    		let downloadURL = URL.createObjectURL(toDownload)
                    		const tempLink = document.createElement("a");
                    		tempLink.href = downloadURL;
                    		tempLink.download = element.pdfname;
                    		tempLink.click();
                    		tempLink.remove(); //cleanup
                    	}).catch((err) => {
                    		alert("Sorry, there was an error in downloading that PDF. Please show this error to the team: " + err);
                    	}) 
                    }}>
                        <div className="card my-3 mx-3 btn btn-light" key={element.index} >
                            <div className="card-header text-center">{(new Date(element.date)).toDateString() + " " + /[0-9]{2}\:[0-9]{2}\:[0-9]{2}/.exec((new Date(element.date)).toTimeString())[0]}</div>
                            <div className="card-body">
                                <h5 className="card-title" style={{color: "#00f", textDecoration: "underline"}}>{element.pdfname} [click to download]</h5>
                                {// <button className="btn" onClick={() => {
//                                 	
//                                 }}>Delete this report
}
                            </div>
                        </div>
                    </div>
                );}
            }).reverse()}
            </div>
        </div>
        </div>
    );
}