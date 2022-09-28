import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Activate() {
    const navigate = useNavigate();
    const { activation_token } = useParams();

    const styling = {
        container: {
            margin: "0 10vw",
            padding: "20vw",
            paddingTop: "300px",
            textAlign: "center",
        },
    };

    function user_activation() {
        if (activation_token) {
            const activateUser = async () => {
                try {
                    const res = await axios.post(`${url}/auth/activate`, {
                        activation_token,
                    });
                    if (res.data.statusCode === 200) {
                        toast.success(res.data.message);
                        console.log(res.data.message);
                    } else {
                        alert(res.data.message);
                        navigate("/signup");
                        console.log("msg", res.data.message);
                    }
                } catch (err) {
                    alert(err.response.data.message);
                    navigate("/signup");
                    console.log("Msg", err);
                }
            };
            activateUser();
        }
    }

    useEffect(
        () => user_activation,
        // eslint-disable-next-line
        [activation_token]
    );

    return (
        <>
            <ToastContainer />
            <div className="Activate">
                <h2 style={styling.container}>
                    Ready to login?{" "}
                    <span
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={() => navigate("/login")}>
                        Click Here
                    </span>
                </h2>
            </div>
        </>
    );
}
