import React, { useState, useEffect } from "react";
import "./register.css";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {auth} = useAuth();
  const userEmailRegex = /^$|^[a-z0-9.]+@[a-z0-9]+\.nitt\.edu$|^[a-z0-9.]+@nitt\.edu$/;

  const userRollRegex = /^$|^[0-9]{5,}|(INT|EXY|K|M|S|Y)[0-9]{4,}$/;
  
  const [registrationStage, setStage] = useState("not yet submitted");
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    rollno: "",
    bg: "",
    identity: "",
    password: "",
    reEnterPassword: "",
  });
  
  const [error, setError] = useState({
  	nameEmpty:false,
  	emailEmpty:false,
  	rollnoEmpty: false,
  	bgEmpty:false,
  	identityEmpty:false,
  	emailInvalid: false,
  	emailUsed: false,
  	rollInvalid: false,
  	passwordEmpty: false,
  	passDoesntMatch: false
  });
  
  useEffect(() => {
//   	console.log("Checking for errors...");
//   	console.log(error);
  	setError({
  		...error,
  		emailInvalid:!userEmailRegex.test(user.email),
  		rollInvalid:!userRollRegex.test(user.rollno),
  		passDoesntMatch: !(user.password === user.reEnterPassword)
  	});
  }, [user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setError({...error, [name + "Empty"]: false});
  };
  const ChangeIdentity = (e) => {
    const { value } = e.target;
    setUser({
      ...user,
      identity: value,
    });
    setError({...error, identityEmpty: false});
  };
  const ChangeBG = (e) => {
    const { value } = e.target;
    setUser({
      ...user,
      bg: value,
    });
    setError({...error, bgEmpty: false});
  };

  const register = () => {
    const { name, email, rollno, bg, identity, password, reEnterPassword } = user;
    
    let emptyKeys = {};
    for (const key of Object.keys(user)) {
    	if (user[key] === "") {
//     		console.log(key + "Empty");
//     		console.log(Object.keys(error).indexOf(key+"Empty"));
    		emptyKeys[key+"Empty"] = true;
    	}
    }
//     console.log(error);
    setError({...error, ...emptyKeys});
    if (Object.keys(emptyKeys).length > 0) return;
    
    if (password !== reEnterPassword) {
      return;
    }
    
    for (const key of Object.keys(error)) {
    	if (error[key]) return;
    }
    
    console.log(user);
    if (
      name &&
      email &&
      password &&
      rollno &&
      bg &&
      identity &&
      password === reEnterPassword
    ) {
      setStage("pending");
      axios.post("http://localhost:9002/register", user).then((res) => {
        if (res.data.message === "A user already registerd with same email") {
        	setError({...error, emailUsed:true});
        	setStage("not yet submitted");
        	return;
        } else if (res.data.message === "Successfully Registered, Please login now.") {
        	setStage("completed");
        	setTimeout(() => {navigate("/login");}, 3000);
        }
        
//         navigate("/login");
      });
    } else {
//       alert("invlid input");
    }
    console.log(user);
  };

  const handleEnter = (event) => {
    if(event.keyCode === 13){
      document.getElementById("registerButton").click();
    }
  }

  return (
    <>
        {
            auth?.user
                ? <Navigate to={`/${auth.user.identity}`} state={{from : location}} replace />
                : <div className="register">
      <h1>Register</h1>
      <input
      	className={error.nameEmpty ? "error": ""}
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handleChange}
        onKeyDown={handleEnter}
        autoComplete="off"
        autoFocus
      ></input>
      {error.nameEmpty ? <p className="error">Please enter your name.</p> : ""}
      <input
      	className={error.emailInvalid | error.emailEmpty | error.emailUsed ? "error" : ""}
        type="email"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleChange}
        onKeyDown={handleEnter}
      ></input>
      {error.emailInvalid ? <p className="error">Please enter a valid NITT e-mail ID.</p> : ""}
      {error.emailEmpty ? <p className="error">Please enter your e-mail ID.</p> : ""}
      {error.emailUsed ? <p className="error">Sorry, someone has already registered with that e-mail ID. Please register using a different e-mail ID, or log in.</p> : ""}
      <input
      	className={error.rollInvalid | error.rollnoEmpty ? "error" : ""}
        type="text"
        name="rollno"
        value={user.rollno}
        placeholder="Your Roll No"
        onChange={handleChange}
        onKeyDown={handleEnter}
      ></input>
      {error.rollInvalid ? <p className="error">Please enter a valid roll number.</p> : ""}
      {error.rollnoEmpty ? <p className="error">Please enter your roll number.</p> : ""}
{//       <input
//         type="text"
//         name="bg"
//         value={user.bg}
//         placeholder="Your Blood Group"
//         onChange={handleChange}
//         onKeyDown={handleEnter}
//       ></input>
}
	  <select
	  	className={error.bgEmpty ? "error" : ""} 
	  	placeholder="Blood Group"
	  	onChange={ChangeBG}
	  	onKeyDown={handleEnter}
	  >
	  	<option value="">Please select your blood group</option>
	  	{[].concat(
		  ...["A", "B", "O", "AB"].map((letter) => {
			  return ["+","-"].map((sign) => {
				  return <option value={letter.toLowerCase()+sign}>{letter+sign}</option>
			  })
		  })
		)}
	  </select>
	  {error.bgEmpty ? <p className="error">Please select your blood group.</p> : ""}
      <select className={error.identityEmpty ? "error" : ""} placeholder="Identity" onChange={ChangeIdentity} onKeyDown={handleEnter}>
        <option id="identity" value="">Please Select your Identity</option>
        <option value="student">Student</option>
        <option value="doctor">Doctor</option>
        <option value="receptionist">Receptionist</option>
        <option value="nurse">Nurse</option>
        <option value="pharmacist">Pharmacist</option>
      </select>
      {error.identityEmpty ? <p className="error">Please select your identity group.</p> : ""}
      <input
      	className = {error.passwordEmpty | error.passDoesntMatch ? "error" : ""}
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
        onChange={handleChange}
        onKeyDown={handleEnter}
      ></input>
      {error.passwordEmpty ? <p className="error">Please enter a password.</p> : ""}
      <input
      	className = {error.passDoesntMatch ? "error" : ""}
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
        onKeyDown={handleEnter}
      ></input>
      {error.passDoesntMatch ? <p className="error">The passwords don't match. Please try again.</p> : ""}

      <button 
      	className="button" 
      	id="registerButton" 
      	disabled={registrationStage === "pending"}
      	onClick={register}>
        {registrationStage === "pending" ? "Loading" : "Register"}
      </button>
      {registrationStage === "completed" ? <p style={{color: "#0f0"}}>You have successfully been registered. Please wait while you are redirected to the log-in page.</p> : ""}
      <div>
        <p>
            Already have an account?
            <button
          type="button"
          class="btn btn-link"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        </p>
      </div>
    </div>
        }
    </>
  );
};

export default Register;
