import React,{ useState, useEffect } from 'react'
import Appointment from './Appointment'
import useAuth from "../../../hooks/useAuth"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from 'react-router-dom';


const Veiw_appointments = () => {

    const [app_t_arr, setAppts] = useState([]);
    const [query, setQuery] = useState("")
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.onload = abcd();
    }, [])

    const abcd=()=>{
        axiosPrivate.get("/doctor"+auth.user.name).then((res) => {
            setAppts(res.data.request);
            console.log(res.data.request);
        }).catch((err) => {
            console.log(err);
            navigate("/login", {state : {from : location}, replace : true});
        });
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-between">
                <div className="col-6">
                    <h2>Appointment Requests</h2>
                </div>
                <div className="col-5">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="text" placeholder="Roll/PF Number" onChange={event => setQuery(event.target.value)} aria-label="Search" autoFocus/>
                    </form>
                </div>
            </div>
            <div className="container"> 
                <div className="row">
                    {app_t_arr.filter(element => element.rollno !== undefined).filter(element => element.rollno.startsWith(query)).map((el) =>  {
                        return(
                            <div className="col-md-4" key={app_t_arr.indexOf(el)}> 
                                <Appointment prescription={{ name :el.name , id :el.rollno, description :el.symptoms, doctor: el.Doctor, slot: el.appt_slot }} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Veiw_appointments