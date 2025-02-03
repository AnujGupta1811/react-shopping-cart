import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verify, setVerify] = useState(false);

  const navigate = useNavigate();

  const submit = async (evt) => {
    evt.preventDefault();
    const token = localStorage.getItem('token');
    const loginData = { email,verificationCode,token };
    console.log(verificationCode,email)
    axios.post('http://localhost:8000/api/verify-email', loginData,{
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
    },
    })
    .then((res) => {
        if (res.data.success) {
            setVerify(true);
        } else {
          Swal.fire({
            title: "Verification Failed",
            text: res.data.user,
            icon: "error",
          }).then(() => {
            window.location.href = "/verification";
          });
        }
      });
}
if (verify) {
    navigate("/");
  }

  return (
    <>
      <div className="main_div">
        <div className="title">Verification Form</div>
        <form onSubmit={submit}>
          <div className="input_box">
            <input
              type="email"
              id="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input_box">
            <input
              type="text"
              id="verificationCode"
              className="form-control"
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter your Code"
              required
            />
          </div>
          <div className="input_box button">
            <input type="submit" value="Verify" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
