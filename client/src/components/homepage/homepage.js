import React from "react"
import "./homepage.css"
import { useNavigate } from "react-router-dom";
const Homepage = ({setLoginUser}) => {
    const navigate=useNavigate();
    return (
        <>
        <div className="homepage">
            <h1>Hello Homepage</h1> 
            if(1===1){
                navigate('/nurse')
            }
        </div>
        </>
    )
}

export default Homepage