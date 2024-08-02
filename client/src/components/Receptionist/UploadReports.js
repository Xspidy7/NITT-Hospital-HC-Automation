import React,{useState} from 'react'
import axios from "axios"
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const UploadReports = () => {

    const axiosPrivate = useAxiosPrivate();
    const [pdfs, setPdfs] = useState([]);
    const [files, setFiles] = useState([]);
    const [rollno, setRollno] = useState("");
	
	const handleRoll = (event) => {
		setRollno(event.target.value);
	}
	
    const changeInput = (event) => {
        let f = event.target.files;
        setFiles([...files, f]);
        console.log(f);
    } 

    const handleUpload = () => {
        const name = document.getElementById("inputGroupFile02").value.split("\\").pop();;
        if(name !== '') setPdfs([...pdfs, name]);
        document.getElementById("inputGroupFile02").value = '';
    }

    const handleSubmit = async(event) => {
    	if (rollno === "") {
    		return;
    	}
    	event.preventDefault();
    	console.log(files);
    	console.log(pdfs);
    	let formData = new FormData();
    	for (let i = 0; i < files.length; i++) {
    		console.log(`file ${i}`);
    		formData.append(`file_0`, files[i][0]);
    		formData.append("rollno", rollno);
    		console.log(`sending file ${i}`);
			console.log(formData);
// 			let test = formData.entries()
// 			console.log(typeof(test.next().value[1]))
// 			console.log(test.next().value)
		
	//         axios.post("http://localhost:9002/report_upload", "lol").catch((err) => (console.log("sadge")));
			axiosPrivate({
				method: "POST",
				url: "/report_upload",
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}).then((res) => {
				console.log("sent file: ", files[i][0].name);
// 				console.log(files[i][0]);
				setPdfs(pdfs.filter(pdfname => pdfname !== files[i][0].name))
			}).catch((err) => {
				console.log("problem");
				console.log(err.message);
			});
    	}
        
//         formData.append("fuck you", uploadedFiles);
//         formData.append("name", "Name");
        // const res = await fetch('http://localhost:9002/report_upload', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     }
        // })

    }

    const handleSub = () => {
        var formData = new FormData();
        
    }

    return (
        <div className="container">
            <h1 className="text-center my-5">Upload Medical Reports</h1>
            <form className="row justify-content-center">
                <div className="col-5 my-2">
                    <input type="number" className="form-control" id="inputRollNo" placeholder="Enter Roll/PF Number" value={rollno} onChange={handleRoll} style={{borderColor:`${rollno === "" ? "#f00" : "#000"}`}}/>
                    {rollno === "" ? <p style={{color:"#f00"}}>Please enter a roll number.</p> : ""}
                </div>
            </form>
            <form onSubmit={handleSub}>
                <div className="row justify-content-center align-items-center">
                    <div className="col-8">
                        <div className="input-group my-5">
                            <input type="file" className="form-control" id="inputGroupFile02" multiple onChange={(e) => changeInput(e)}/>
                        </div>
                    </div>
                    <div className="col-4 text-center">
                        <label className="btn btn-dark" onClick={handleUpload}>Upload</label>
                    </div>
                </div>
                <div className="container mt-2 mb-5">
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Report Name</th>
                                <th scope="col">Report Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pdfs?.map((item) => {
                                    return(
                                        <tr>
                                            <th scope="row">{pdfs.indexOf(item) + 1}</th>
                                            <td>{item}</td>
                                            <td>
                                                <input type="date" id="start" name="trip-start" min="1900-01-01" max="2040-12-31" required/>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <div className="text-center my-5">
                        <button className="btn btn-lg btn-dark" type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UploadReports
