import React from 'react'
import { useNavigate } from 'react-router-dom'

const InitialReceptionist = () => {

  const navigate = useNavigate();

  const handleViewReq = () => {
    navigate('/receptionist/appointments');
  }
  const handleViewStat = () => {
    navigate('/receptionist/appointmentstatus');
  }
  const handleReports = () => {
    navigate('/receptionist/uploadreports');
  }
  const handleSchedule = () => {
    navigate('/receptionist/setschedule');
  }

  return (
    <>
    <div>
        <div className="row">
            <button type="button" onClick={handleViewReq} className="btn btn-secondary btn-lg col-lg-4 my-3 mx-3">View Appointment Requests</button>
            <button type="button" onClick={handleViewStat} className="btn btn-secondary btn-lg col-lg-4 my-3 mx-3">View Appointment Status</button>
        </div>
        <div className="row">
            <button type="button" onClick={handleReports} className="btn btn-secondary btn-lg col-lg-4 my-3 mx-3">Upload Medical Reports</button>
            <button type="button" onClick={handleSchedule} className="btn btn-secondary btn-lg col-lg-4 my-3 mx-3">Set Doctors Schedule</button>
        </div>
    </div>
    </>
  )
}

export default InitialReceptionist
