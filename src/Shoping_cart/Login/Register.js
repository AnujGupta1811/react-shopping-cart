import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "jquery/dist/jquery.min.js";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", register: false };
    this.submit = this.submit.bind(this);
  }

  submit(evt) {
    evt.preventDefault();
  
    let fd = new FormData();
    fd.append("name", this.state.name);
    fd.append("email", this.state.email);
    fd.append("password", this.state.password);
    fd.append("cpassword", this.state.password);
  
    axios
      .post("https://anuj.freelogomaker.in/api/register", fd)
      .then((res) => {
        // Check if the response contains the token
        if (res.data.token) {
          // Store the token and user_id in localStorage
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user_id); // Store user_id instead of res.data.id
  
          // Display success message
          Swal.fire({
            title: "Success",
            text: res.data.message,
            icon: "success",
          }).then(() => {
            this.setState({ register: true });
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Registration failed. Please try again.",
          icon: "error",
        });
      });
  }
  

  render() {
    if (this.state.register) {
      return <Navigate to="/" />;
    }

    return (
      <>
        <div className="main_div">
          <div className="title">Register Form</div>
          <form onSubmit={this.submit}>
            <div className="input_box">
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.setState({ name: e.target.value })}
                id="name"
                placeholder="Enter your full name"
                required
              />
              <div className="icon">
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="input_box">
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => this.setState({ email: e.target.value })}
                placeholder="Enter your email"
                required
              />
              <div className="icon">
                <i className="fas fa-envelope"></i>
              </div>
            </div>
            <div className="input_box">
              <input
                type="password"
                className="form-control"
                onChange={(e) => this.setState({ password: e.target.value })}
                id="password"
                placeholder="Enter your password"
                required
              />
              <div className="icon">
                <i className="fas fa-lock"></i>
              </div>
            </div>
            <div className="input_box button">
              <input type="submit" value="Register" />
            </div>
            <div className="sign_up">
              Already have an account? <a href="/login">Login now</a>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Register;
