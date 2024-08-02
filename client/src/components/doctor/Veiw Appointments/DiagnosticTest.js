import React, { useState } from 'react'
import { tests } from './Medicines';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const DiagnosticTest = (props) => {

    const [test, setTest] = useState([]);
    const [val, setVal] = useState("");

    const handleDelete = (index) => {
        const t = [...test];
        t.splice(index, 1);
        setTest(t);
    }

    const changed = (e) => {
        setVal(e.target.value)
    }

    const handleClick = () => {
        var name = document.getElementById('combo-box-demo').value;
        setTest([...test, name]);
    }

    const handlePrescribe = () => {
        props.onPrecriptionAdd({
            rollno: props.rollno,
            doctor: props.doctor,
            appt_slot: props.slot,
            tests: test,
            remark: val
        });
        setTest([]);
        setVal("");
    }
    
    return (
        <div className="col-7 text-center">
            <h2 className="mb-5">Medical Tests</h2>
            <div className="container my-3 d-flex justify-content-center">
                <Autocomplete className='btn-group white_background' disablePortal id="combo-box-demo" options={tests} sx={{ width: "80%" }} renderInput={(params) => <TextField {...params} label="Tests" />} />
            </div>

            <button className="btn btn-dark my-3" onClick={handleClick}>Add Test</button>
            <div className="row my-3">
                <div className="col-6">
                    <h4>Prescribed Tests</h4>
                </div>
                <div className="col-6">
                    <h4 className="justify-content-center">Remarks</h4>
                </div>
                <div className="card col-6" style={{height: "160px", overflow: "auto"}}>
                    {
                        test?.map((element, index) => {
                            return(
                                <div className="row" key={index}>
                                    <div className="text-center col-10">
                                        {element}
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
                        <textarea value={val} onChange={changed}  className="form-control" rows="6" aria-label="With textarea"></textarea>
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

export default DiagnosticTest
