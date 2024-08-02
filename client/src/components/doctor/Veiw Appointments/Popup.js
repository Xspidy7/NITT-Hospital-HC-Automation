import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const CenteredBox = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const Popup = (props) => {
	console.log(props);
    const [open, setOpen] = useState(props.open);

    const handleOpen = () => {
        setOpen(true);
        console.log(props.details)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className="btn btn-dark" onClick={handleOpen}>
                View Details
            </button>
            <Modal open={open} onClose={handleClose} aria-labelledby="popup-title" aria-describedby="popup-description" >
                <CenteredBox>
                    <div className="card text-bg-light mb-3" style={{maxWidth: "18rem"}}>
                        <div className="card-header d-flex row">
                            <div class="text-center col-9">{
                            (new Date(props.details.date)).toDateString()
                             + " "
                             + (/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/.exec((new Date(props.details.date)).toTimeString()) ? /[0-9]{2}\:[0-9]{2}\:[0-9]{2}/.exec((new Date(props.details.date)).toTimeString())[0] : "")}</div>
                            <div class="text-center col-3">
                                <button type="button" className="btn-close text-end" aria-label="Close" onClick={handleClose}></button>
                            </div>
                        </div>
                        <div className="card-body">
                        	<h5 className="card-title">Symptoms:</h5>
                        	<div className="container">
                        		{props.details.symptoms}
                        	</div>
                            <h5 className="card-title">Medication:</h5>
                            <div className="container">
                                {
                                    props.details.medication?.map((med) => (
                                        <div key={med.index}>
                                            <div>{`${med.name_of_medicine} \t \t ${med.dosage} - ${med.days} days`}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <h5 className="card-title">Tests:</h5>
                            <div className="container">
                                {
                                    props.details.tests?.map((med) => (
                                        <div key={med.index}>
                                            <div>{med}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <h5 className="card-title">Vitals:</h5>
                            <div className="container">
                                Oxygen: {props.details.vitals_Oxygen}
                            </div>
                            <div className="container">
                                Temperature: {props.details.vitals_temperature}
                            </div>
                            <div className="container">
                                Blood Pressure: {props.details.vitals_Blood_pressure}
                            </div>
                        </div>
                    </div>
                </CenteredBox>
            </Modal>
        </div>
    );
}

export default Popup;