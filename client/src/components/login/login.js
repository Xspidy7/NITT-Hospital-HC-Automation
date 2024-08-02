import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = ({ setLoginUser }) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userEmailRegex = /^$|^[a-z0-9.]+@[a-z0-9]+\.nitt\.edu$|^[a-z0-9.]+@nitt\.edu$/;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState({
  	userEmpty: false,
  	passEmpty: false,
  	passWrong: false,
  	userInvalid: false,
  	goRegister:false
  })

	useEffect(() => {
		setError({
			...error,
			userInvalid: !(userEmailRegex.test(user.email)),
			userEmpty:false,
			goRegister:false
		})
	},[user])

  const handleChange = (e) => {
  	if (e.target.name == "password") setError({...error, passEmpty: false, passWrong: false});
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const login = () => {
  	if (error.userInvalid) {
  		//if email is not valid, return early and do nothing
  		return;
  	}
  	if (user.email === "") {
  		//if email is empty, set error and then go forth and do nothing
  		setError({...error, userEmpty: true});
  		return;
  	}
  	if (user.password.length == 0) {
  		//if no password entered, set error.passEmpty and then do nothing
  		setError({...error, passEmpty:true});
  		return;
  	}
    axios
      .post("http://localhost:9002/login", user, { withCredentials: true })
      .then((res) => {
        // alert(res.data.message);
        console.log(res.data);
        if (res.data.message === "Login Successfull") {
          delete res.data.user.password;
          console.log(res.data.user);
          setAuth({
            user: res.data.user,
            identity: res.data.user.identity,
            accessToken: res.data.accessToken,
          });
          if (from === "/") navigate("/" + res.data.user.identity);
          else navigate(from, { replace: true });
        } else if (res.data.message === "User not registered") {
          	setError({...error, goRegister:true});
        } else if (res.data.message === "Password didn't match") {
        	setError({...error, passWrong:true});
        }
      })
      .catch((err) => {
      	alert("Something went wrong. Please try again later.");
      });
  };
  const handleEnter = (event) => {
    if(event.keyCode === 13){
      document.getElementById("loginButton").click();
    }
  };

  return (
    <>
    { auth?.user
        ? <Navigate to={`/${auth.user.identity}`} state={{from : location}} replace />
        : <div className="login">
      <h1>Login</h1>
      <input
      	className={`${error.userInvalid | error.goRegister | error.userEmpty ? "error" : ""}`}
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        onKeyDown={handleEnter}
        placeholder="Enter your Email"
        autoComplete="off"
        autoFocus
      ></input>
      {error.userInvalid
      ? <p className="error">Please enter a valid NITT e-mail ID.</p>
      : ""}
      {error.userEmpty ? <p className="error">Please enter an e-mail ID.</p> : ""}
      {error.goRegister
      ? <p className="error">No user with that email found. Please register using the button below if you are a new user.</p>
      : ""}
      <input
      	className={`${error.passEmpty | error.passWrong ? "error": ""}`}
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        onKeyDown={handleEnter}
        placeholder="Enter your Password"
      ></input>
      {error.passEmpty ? <p className="error">Please enter your password.</p> : ""}
      {error.passWrong ? <p className="error">Incorrect password. Please try again.</p> : ""}
      <div className="button" id="loginButton" onClick={login}>
        Login
      </div>
      <div>
        <p>Don't have an account?
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        </p>
      </div>
    </div>
      }
    </>
    
  );
};

export { Login };
