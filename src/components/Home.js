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

  return <div>Welcome!!</div>;
}
