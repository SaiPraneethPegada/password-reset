import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="navbar fixed-top navbar-light bg-white shadow rounded">
      {token ? (
        <div className="container-fluid justify-content-end">
          <Button variant="outlined" className=" mx-5" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <h4
          onClick={() => {
            navigate("/login");
          }}
          className="mx-5 px-5"
          style={{ cursor: "pointer" }}
        >
          Password Reset
        </h4>
      )}
    </nav>
  );
}
