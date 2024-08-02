import React, { useState } from 'react';
import Popup from './Popup';
import { useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const MedHistory = (props) => {

    const axiosPrivate = useAxiosPrivate();
    const [showModal, setShowModal] = useState(false);
    const [popup, setPopup] = useState(false);
    const{ rollno } = props;
    const [hist,setHist]=useState([]);
    const [PDFs, setPDFs] = useState([]);

    useEffect(() => {
        getHistory();
        getPDFs();
    },[]);
    
    const getPDFs = () => {
		axiosPrivate.get("/report" + rollno).then((res) => {
			setPDFs(res.data);
		}).catch((err) => {
			console.log(err);
			alert("Sorry, there was an error. Please show the team this message: " + err);
		})
	}

    const getHistory = () => {
        axiosPrivate.get("/student_history"+rollno).then((res) => {
            console.log(res.data.request);
            setHist(res.data.request);

        }).catch((err) => {
            console.log(err);
        })
    }
    
    return (
    	<div style={{width: "60%", display:"flex", justifyContent:"space-between", marginLeft:"auto"}}>
        <div className="col-7 mx-1" style={{ maxHeight: '600px'}}>
        	<h1>Appointment History</h1>
        	<div style={{height:"500px", overflowY:"auto"}}>
            {hist?.map((element) => (
                <div key={element.index}>
                    <div className="card my-3 mx-3 btn btn-light" key={element.index} onClick={() => {
                        setPopup(element);
                        setShowModal(true);
                    }}>
                        <div className="card-header text-center">{(new Date(element.date)).toDateString() + " " + /[0-9]{2}\:[0-9]{2}\:[0-9]{2}/.exec((new Date(element.date)).toTimeString())[0]}</div>
                        <div className="card-body">
                            <h5 className="card-title">{element.symptoms}</h5>
                        </div>
                        <Popup open={showModal} details={popup}/>
                    </div>
                </div>
            ))}
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
                    	axiosPrivate.get("/report/" + rollno + "/" + element.pdfname).then((res) => {
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
                            </div>
                        </div>
                    </div>
                );}
            })}
            </div>
        </div>
        </div>
    );
}

export default MedHistory;