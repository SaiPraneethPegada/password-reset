import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
      <h1 className="container d-flex text-center align-items-center justify-content-center my-5 py-4">
        Welcome to Home Page!!
      </h1>
    </>
  );
}
