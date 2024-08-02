import './App.css'
import Homepage from "./components/homepage/homepage"
import { Login } from "./components/login/login"
import Register from "./components/register/register"
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Doctor from './components/doctor/Entry_page';
import Schedule from './components/doctor/Schedule';
import Veiwappointments from './components/doctor/Veiw Appointments/veiw_appointments';
import InitialNurse from "./components/Nurse/InitialNurse"
import Vitals from "./components/Nurse/Vitals"
import InitialPharmacy from "./components/Pharmacy/InitialPharmacy"
import Prescription from "./components/Pharmacy/Prescription"
import Navbar from './components/Navbar';
import StudentHome from "./components/Student/Home";
import StudentRequest from "./components/Student/Request";
import StudentUpcoming from "./components/Student/Upcoming";
import StudentHistory from "./components/Student/History";
import StudentDoctors from "./components/Student/Doctors";
import InitialReceptionist from './components/Receptionist/InitialReceptionist';
import AppointmentsRequests from './components/Receptionist/AppointmentsRequests';
import DoctorAllotment from './components/Receptionist/DoctorAllotment';
import Notfound from './Notfound';
import Conductappointment from './components/doctor/Veiw Appointments/Conduct_appointment';

import DoctorAppointments from './components/Receptionist/Setschedule';

import UploadReports from './components/Receptionist/UploadReports';
import AppointmentStatus from './components/Receptionist/AppointmentStatus';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin'
import AboutUs from './components/AboutUs';

function App() {

  const [ user, setLoginUser ] = useState({identity:"doctor"})

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route exact path="/" element={
              user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            }>
        </Route>
        <Route path="/login" element={<Login setLoginUser={setLoginUser}/>}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={["student", "doctor", "nurse", "pharmacist", "receptionist"]}/>}>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        </Route>
          <Route element={<RequireAuth allowedRoles={["doctor"]}/>}>
            <Route exact path="/doctor" element={<Doctor/>}></Route>
            <Route exact path="/doctor/schedule" element={<Schedule/>}></Route>
            <Route exact path="/doctor/view_appointment" element={<Veiwappointments/>}></Route>
            <Route exact path="/doctor/conduct_appointment" element={ <Conductappointment/> }></Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={["nurse"]}/>}>
            <Route exact path="/nurse/" element={<InitialNurse name="abcd" id={420}/>}></Route>
            <Route exact path="/nurse/vitals" element={<Vitals/>}></Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={["pharmacist"]}/>}>
            <Route exact path="/pharmacist/" element={<InitialPharmacy />}></Route>
            <Route exact path="/pharmacist/prescription" element={<Prescription/>}></Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={["student"]}/>}>
            <Route exact path="/student" element={ <StudentHome />}></Route>
            <Route exact path="/student/request" element={<StudentRequest />}></Route>
            <Route exact path="/student/upcoming" element={<StudentUpcoming />}></Route>
            <Route exact path="/student/history" element={<StudentHistory />}></Route>
            <Route exact path="/student/doctors" element={<StudentDoctors />}></Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={["receptionist"]}/>}>
            <Route exact path="/receptionist/" element={<InitialReceptionist/>}></Route>
            <Route exact path="/receptionist/appointments" element={<AppointmentsRequests/>}></Route>
            <Route exact path="/receptionist/appointmentstatus" element={<AppointmentStatus/>}></Route>
            <Route exact path="/receptionist/doctorallotment" element={<DoctorAllotment/>}></Route>
            <Route exact path="/receptionist/setschedule" element={<DoctorAppointments/>}></Route>
            <Route exact path="/receptionist/uploadreports" element={<UploadReports/>}></Route>
          </Route>
          <Route path='*' element={<Notfound/>} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
