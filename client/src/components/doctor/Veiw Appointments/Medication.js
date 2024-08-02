import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { medicines } from './Medicines';
import "./Medication.css"

const Conduct_appointment = (props) => {

    const [medicine, setMedicine] = useState([]);
    const [val, setVal] = useState("");
    const { onPrecriptionAdd, doctor, slot, rollno } = props;

    const handleMinus = () => {
        var input = document.getElementById('days');
        if(input.value > 0) input.value = parseInt(input.value) - 1;
    }

    const handlePlus = () => {
        var input = document.getElementById('days');
        input.value = parseInt(input.value) + 1;
    }

    const changed = (e) => {
        setVal(e.target.value)
    }

    const handlePrescribe = () => {
        onPrecriptionAdd({
            rollno: rollno,
            doctor: doctor,
            appt_slot: slot,
            medication: medicine,
            remark: val,
            symptoms: props.symptoms
        });
        setVal("");
        setMedicine([]);
    }
    
    const handleClick = () => {
        var days;
        var name;
        var dose;
        days = document.getElementById('days').value;
        name = document.getElementById('combo-box-demo').value;
        var dosage = document.getElementsByName('btnradio');
        for(var i = 0; i < dosage.length; i++)
        {
            if(dosage[i].checked)
            {
                dose = dosage[i].value;
                dosage[i].checked = false;
                break;
            }
        }
        if(days !== "0" && dose !== undefined && name !== "")
        {
            setMedicine([...medicine, {name_of_medicine: name, dosage: dose, days: days}]);
            document.getElementById('days').value = 0;
        }
    }

    const handleDelete = (index) => {
        const med = [...medicine];
        med.splice(index, 1);
        setMedicine(med);
    }

    return (
        <div className="col-7 text-center">
            <h2 className="mb-5">Medication</h2>
            <div className="container my-3 d-flex justify-content-center">
                <Autocomplete className='btn-group white_background' disablePortal id="combo-box-demo" options={medicines} sx={{ width: "80%" }} renderInput={(params) => <TextField {...params} label="Medicines" />} />
            </div>
            <div className="btn-group my-3 white_background" role="group" aria-label="Basic radio toggle button group">  
                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" value="qD"/>
                <label className="btn btn-outline-primary" htmlFor="btnradio1">qD</label>

                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" value="BID"/>
                <label className="btn btn-outline-primary" htmlFor="btnradio2">BID</label>

                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" value="TID"/>
                <label className="btn btn-outline-primary" htmlFor="btnradio3">TID</label>

                <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" value="BBF"/>
                <label className="btn btn-outline-primary" htmlFor="btnradio4">BBF</label>

                <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" value="BD"/>
                <label className="btn btn-outline-primary" htmlFor="btnradio5">BD</label>
            </div>

            <div className="row my-3">
                <div className="col-5 mt-2" >
                    Days:
                </div>
                <div className="col-5">
                    <div className="input-group mb-3">
                        <button onClick={handleMinus} className="btn btn-dark" type="button" id="button-addon2">-</button>
                        <input id="days" style={{textAlign: "center"}} type="number" className="form-control" placeholder="0" aria-label="Number of Days" aria-describedby="button-addon2" value={0} readOnly/>
                        <button onClick={handlePlus} className="btn btn-dark" type="button" id="button-addon2">+</button>
                    </div>
                </div>
            </div>

            <button className="btn btn-dark my-3" onClick={handleClick}>Add Medicine</button>
            <div className="row my-3">
                <div className="col-6">
                    <h4>Prescribed Medicines</h4>
                </div>
                <div className="col-6">
                    <h4 className="justify-content-center">Remarks</h4>
                </div>
                <div className="card col-6" style={{height: "160px", overflow: "auto"}}>
                    {
                        medicine?.map((element, index) => {
                            return(
                                <div className="row" key={index}>
                                    <div className="text-center col-10">
                                        {element.name_of_medicine} {element.dosage}-{element.days}
                                    </div>
                                    <div className="col-2 text-center">
                                        <button type="button" class="btn-close" aria-label="Close" onClick={()=>handleDelete(index)}/>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="col-6">
                    <div className="input-group">
                        <textarea value={val} onChange={changed}  className="form-control" rows="6" aria-label="With textarea" id="txt"></textarea>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <button className="btn btn-lg btn-dark" onClick={handlePrescribe}>
                    Prescribe
                </button>
            </div>
        </div>
    );
}

export default Conduct_appointment;