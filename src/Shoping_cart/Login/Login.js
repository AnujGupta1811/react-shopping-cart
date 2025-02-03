import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import '../css/login.css';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const submit = (evt) => {
    evt.preventDefault();

    const loginData = { email, password };

    axios.post('https://anuj.freelogomaker.in/api/login', loginData, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setLogin(true);
          localStorage.setItem("token", res.data.token);
        } else {
          Swal.fire({
            title: "Login Failed",
            text: res.data.user,
            icon: "error",
          }).then(() => {
            window.location.href = "/login";
          });
        }
      });
  };


  if (login) {
    navigate("/");
  }

  return (
    <>
      <div className="main_div">
        <div className="title">Login Form</div>
        <form onSubmit={submit}>
          <div className="input_box">
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
              required
            />
            <div className="icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className="input_box">
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
              required
            />
            <div className="icon">
              <i className="fas fa-lock"></i>
            </div>
          </div>
          <div className="option_div">
            <div className="check_box">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div className="forget_div">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div className="input_box button">
            <input type="submit" value="Login" />
          </div>
          <div className="sign_up">
            Not a member? <a href="/register">Signup now</a>
          </div>
        </form>
        <br></br>
        <div className="google-login">
        </div>
        <br></br>
        <div className="facebook-login">
         
        </div>
      </div>
    </>
  );
};

export default Login;
