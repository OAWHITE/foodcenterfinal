import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../../Styles/Form.css";
import Background from "../Decoration/Background";
import TopLeft from "../Decoration/top-left";
import TopRight from "../Decoration/top-right";
import BottomLeft from "../Decoration/bottom-left";
import BottomRight from "../Decoration/bottom-right";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', `${event.target.Nom.value} ${event.target.Prenom.value}`);
    formData.append('email', event.target.email.value);
    formData.append('password', event.target.password.value);
    formData.append('password_confirmation', event.target.password_confirmation.value);
    formData.append('role', 'user'); // Ensure role is included
    // formData.append('profile_image', event.target.profile_image.files[0]);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Signup successful", response.data);
      navigate('/login');
    } catch (error) {
      console.error("Signup error", error);
      if (error.response && error.response.data) {
        console.error("Detailed error", error.response.data);
        alert("Signup failed: " + JSON.stringify(error.response.data));
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <>
      <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[25%] h-[30%]" fill="#00BFFF"/>
      <TopRight className="absolute z-[-1] top-[0] right-[0] w-[25%] h-[30%]" fill="#00BFFF"/>
      <Background />
      <BottomLeft className="absolute z-[-1] bottom-[0%] left-[0%] w-[10%] h-[40%]" fill="#00BFFF"/>
      <BottomRight className="absolute z-[-1] bottom-[0%] right-[0%] w-[20%] h-[20%]" fill="#00BFFF"/>
      <main className="main-container">
        <section className="content-section">
          <div className="content-wrapper">
            <div className="text-content">
              <h1 className="title">Create a free Account!</h1>
              <p className="description"> You can sign up into Food center for Free </p>
            </div>
          </div>
        </section>
      </main>
      <div>
        <form className="signup-form bg-white bg-opacity-75" onSubmit={handleSubmit}>
          <div className="name-fields">
            <div className="name-field">
              <label htmlFor="Nom" className="signup-form-label">Nom</label>
              <input id="Nom" name="Nom" className="signup-form-input" placeholder="Kaamouchi"/>
            </div>
            <div className="name-field">
              <label htmlFor="Prenom" className="signup-form-label">Prenom</label>
              <input id="Prenom" name="Prenom" className="signup-form-input" placeholder="Fadi" />
            </div>
          </div>
          <div className="signup-form-body">
            <label className="signup-form-label"> E-mail </label>
            <input className="signup-form-input" type="email" id="email" name="email" placeholder="E-mail" />
            <label className="signup-form-label"> Password </label>
            <input className="signup-form-input" type="password" id="password" name="password" placeholder="Password"/>
            <label className="signup-form-label"> Confirm Password </label>
            <input className="signup-form-input" type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm Password"/>
            {/* <label className="signup-form-label"> Profile Image </label>
            <input className="signup-form-input" type="file" id="profile_image" name="profile_image"/> */}
          </div>
          <button className="submit-button" type="submit"> Sign up </button>
          <section className="signin-section">
            <p className="signin-text">Already have an Account? <Link className="login-signup-link" to="/login">Sign in here</Link></p>
          </section>
        </form>
      </div>
    </>
  );
}
