import "./Navbar.css";
import React from "react";
import logo from "./logo_bg.png";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav class="navbar navbar-expand fixed-top Navbar">
      <div class="container-fluid">
        <a className="navbar-brand ms-5" href="/">
          <img src={logo} alt="E-Vaidya" className="d-inline-block" />
        </a>
        {console.log(auth.user)}
        {auth?.user && (
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href={`/${auth.user.identity}`}>
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/aboutUs">
                  About Us
                </a>
              </li>
            </ul>
            <form class="d-flex mx-5" role="search">
              <button
                class="btn btn-dark"
                type="submit"
                onClick={handleSignOut}
              >
                Logout
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
